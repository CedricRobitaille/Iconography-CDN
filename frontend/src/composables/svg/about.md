# SVG Node Tree & Style Registry Architecture

## Overview

This system converts raw **SVG markup** into a structured **Node Tree** while separating visual styling into a centralized **Style Registry**.

The goal is to provide a normalized internal representation of SVG graphics that supports:

* deterministic structure
* reusable styles
* efficient rendering
* easy editing and transformation

Instead of storing style information directly on every node, styles are **deduplicated and referenced by ID**. This approach mirrors how many modern design tools and rendering engines manage vector graphics internally.

---

# Core Pipeline

The full processing pipeline follows this flow:

```
SVG Markup
   ↓
SceneNode Parsing
   ↓
Node Tree Conversion
   ↓
Style Extraction
   ↓
Style Registry Deduplication
```

Result:

```
NodeTree
  ├─ node
  │   ├─ properties
  │   ├─ styleId
  │   └─ children
  │
  └─ node
       ├─ properties
       ├─ styleId
       └─ children

StyleRegistry
  ├─ styleId → styleDefinition
  ├─ styleId → styleDefinition
  └─ ...
```

---

# SceneNode

`SceneNode` represents the **direct output of the SVG parser**.

It mirrors the SVG document structure with minimal transformation.

Example:

```ts
{
  tag: "circle",
  attributes: {
    cx: "50",
    cy: "50",
    r: "20",
    fill: "red"
  },
  children: []
}
```

Responsibilities:

* preserve SVG hierarchy
* expose element attributes
* remain close to the original markup

---

# Node Tree

The **Node Tree** is the normalized internal representation used by the application.

Each node describes:

* its type
* properties specific to that type
* visibility state
* children
* a reference to a style

Example:

```ts
{
  id: "node_1",
  type: "circle",
  name: "circle",
  styleId: "style_3",
  properties: {
    cx: 50,
    cy: 50,
    r: 20
  },
  children: []
}
```

Responsibilities:

* represent geometry and structure
* support editing and transformation
* remain independent from styling details

---

# Style Extraction

During node conversion, style attributes are extracted from the SVG element.

This includes attributes such as:

* fill
* fill-opacity
* stroke
* stroke-width
* stroke-opacity
* stroke-linecap
* stroke-linejoin
* stroke-dasharray
* stroke-dashoffset

Missing values are resolved using **SVG specification defaults**.

Example style object:

```ts
{
  fill: {
    fill: "black",
    fillOpacity: 1
  },
  stroke: {
    stroke: "none",
    strokeWidth: 1,
    strokeOpacity: 1,
    strokeLinecap: "butt",
    strokeLinejoin: "miter"
  }
}
```

---

# Style Registry

The **Style Registry** stores unique style definitions and assigns them a stable identifier.

Nodes reference styles by `styleId` instead of embedding style data.

Example registry:

```ts
{
  "style_1": { fill: { fill: "black", fillOpacity: 1 }, stroke: {...} },
  "style_2": { fill: { fill: "red", fillOpacity: 1 }, stroke: {...} }
}
```

Responsibilities:

* deduplicate identical styles
* provide stable references
* enable efficient updates

If multiple nodes share identical styles, they will reference the **same `styleId`**.

---

# Advantages of This Architecture

## Style Deduplication

Many SVG documents repeat identical styles across multiple elements.

A registry prevents unnecessary duplication and reduces memory usage.

---

## Faster Rendering

Renderers can resolve styles once and reuse them across nodes.

---

## Easier Editing

Updating a style in the registry automatically updates every node that references it.

---

## Clean Separation of Concerns

The system clearly separates:

```
Structure   -> Node Tree
Styling     -> Style Registry
Source Data -> SVG / SceneNode
```

This makes the architecture easier to maintain and extend.

---

# Example Transformation

### Input SVG

```xml
<svg>
  <circle cx="50" cy="50" r="20" fill="red"/>
  <circle cx="100" cy="50" r="20" fill="red"/>
</svg>
```

### Resulting Node Tree

```
circle (style_1)
circle (style_1)
```

### Style Registry

```
style_1 -> { fill: red }
```

Both nodes share the same style.

---

# Design Philosophy

This system follows a principle common in modern design software:

> **Geometry and styling should be decoupled.**

Nodes describe **what the shape is**.

Styles describe **how the shape looks**.

This separation allows the engine to remain flexible, efficient, and scalable.

---

# Future Improvements

Potential enhancements include:

* CSS style parsing
* style inheritance resolution
* `currentColor` support
* gradient and pattern support
* transform normalization
* optimized renderer integration

