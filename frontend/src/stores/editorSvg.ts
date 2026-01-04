import { defineStore } from "pinia";
import type { treeNode} from "../types"
import type {
  DragInitialPositions,
  DragPositionXY,
  DragPositionPolygon,
  DragPositionCircle,
  DragPositionEllipse,
  DragPositionLine,
  DragPositionPath
} from "../types"
import type { SvgCanvasState } from "../types/ui/svgCanvasState";



export const useEditorStore = defineStore("svgCanvas", {
  state: (): SvgCanvasState => ({
    rootNode: null,
    flatNodes: [],
    selectedNodeIds: [],
    width: 800,
    height: 600,
    zoom: 1,
    offsetX: 0,
    offsetY: 0,
    isDragging: false,
    dragStartX: 0,
    dragStartY: 0,
    dragInitialPositions: {} as DragInitialPositions,
  }),

  // Functions to retreive... stuff
  getters: {

    // Get selected nodes
    selectedNodes(state) {
      // Filter the flatnodes arr
      // Get all nodes within the tree that are currently selected
      return state.flatNodes.filter(node => state.selectedNodeIds.includes(node.id));
    }
  },

  actions: {

    // Flatten the tree from nested OBJ to flat Arr
    flattenTree(node: treeNode | null = this.rootNode): treeNode[] {
      if (!node) return [];
      let nodes: treeNode[] = [node];
      node.children.forEach(child => {
        //  Recursively flatten children
        nodes = nodes.concat(this.flattenTree(child));
      });
      return nodes;
    },

    // Create the initial root node for the svg
    initRootNode(node: treeNode) {
      this.rootNode = node;
      this.flatNodes = this.flattenTree(node)
    },

    // Add a new node to the parent folder/root
    addNode(node: treeNode, parentId?: number) {
      // Must have a root before adding sub elements
      if (!this.rootNode) return;

      // Set Parent, if no parent provided, set to root.
      const parent = parentId ? this.flatNodes.find(n => n.id === parentId) : this.rootNode;
      if (!parent) return; // MUST HAVE PARENT

      parent.children.push(node);
      // Re-flatten tree since it's been updated
      this.flatNodes = this.flattenTree(this.rootNode);
    },

    // Remove the node and all children from the svg
    removeNode(nodeId: number) {
      // Rootnode is required
      if (!this.rootNode) return 

      // Given the node to scan...
      // Keep saved children, then dig deeper
      const recursiveRemove = (parent: treeNode) => {
        // Keep all children who's IDs aren't the targetNodeId
        parent.children = parent.children.filter(child => child.id !== nodeId);
        // Recursively parse remaining node children
        parent.children.forEach(child => recursiveRemove(child));
      };

      // If the node deleted is the root, then reset canvas
      if (this.rootNode.id == nodeId) {
        this.rootNode = null;
        this.flatNodes = [];
        this.selectedNodeIds = [];
        return;
      }

      recursiveRemove(this.rootNode);
      this.flatNodes = this.flattenTree(this.rootNode)
      this.selectedNodeIds = this.selectedNodeIds.filter(id => id !== nodeId);
    },

    // Selects the current node.
    // Optionally append other selected nodes.
    selectNode(nodeId: number, append: boolean = false) {
      if (append) {
        if (!this.selectedNodeIds.includes(nodeId)) {
          this.selectedNodeIds.push(nodeId);
        }
      } else {
        this.selectedNodeIds = [nodeId];
      }
    },

    // Clears the selectedNode
    clearSelection() {
      this.selectedNodeIds = [];
    },

    // Update node's properties
    // ie: change xPos
    updateNodeProperties(nodeId: number, props: Partial<treeNode['properties']>) {
      const node = this.flatNodes.find(n => n.id === nodeId);
      if (!node) return;
      // Keep previous props, change the selected prop
      node.properties = { ...node.properties, ...props}
    },

    // Zoom on canvas
    setZoom(zoom: number) {
      this.zoom = zoom;
    },

    // Pan Canvas
    setPan(offsetX: number, offsetY: number) {
      this.offsetX = offsetX;
      this.offsetY = offsetY;
    },

    // Initialize the drag, set all the init positions
    startDrag(mouseX: number, mouseY: number) {
      // Set init props
      this.isDragging = true;
      this.dragStartX = mouseX;
      this.dragStartY = mouseY;

      // Save init pos of selected nodes
      this.dragInitialPositions = {};
      this.selectedNodeIds.forEach(id => {

        const node = this.flatNodes.find(n => n.id === id);
        if (!node) return;

        const props = node.properties as any;
        // Use different atts for diff types
        switch (node.type) {
          case "rectangle":
            this.dragInitialPositions[id] = { x: props.x, y: props.y };
            break;
          case "circle":
            this.dragInitialPositions[id] = { cx: props.cx, cy: props.cy };
            break;
          case "ellipse":
            this.dragInitialPositions[id] = { cx: props.cx, cy: props.cy };
            break;
          case "line":
            this.dragInitialPositions[id] = { x1: props.x1, y1: props.y1, x2: props.x2, y2: props.y2 };
            break;
          case "polygon":
          case "polyline":
            this.dragInitialPositions[id] = { points: [...props.points] };
            break;
          case "path":
            this.dragInitialPositions[id] = { d: JSON.parse(JSON.stringify(props.d)) }; // deep copy
            break;
        }
      });
    },

    //
    drag(mouseX: number, mouseY: number) {
      if (!this.isDragging) return;

      // Get mouse change
      const deltaX = (mouseX - this.dragStartX) / this.zoom;
      const deltaY = (mouseY - this.dragStartY) / this.zoom;

      this.selectedNodeIds.forEach(id => {
        const node = this.flatNodes.find(n => n.id === id);
        if (!node) return

        const props = node.properties as any;
        const initial = this.dragInitialPositions[id] as any;

        switch (node.type) {
          case "rectangle":
            props.x = (initial as DragPositionXY).x + deltaX;
            props.y = (initial as DragPositionXY).y + deltaY;
            break;
          case "circle":
            const c = initial as DragPositionCircle;
            props.cx = c.cx + deltaX;
            props.cy = c.cy + deltaY;
            break;
          case "ellipse":
            const e = initial as DragPositionEllipse;
            props.cx = e.cx + deltaX;
            props.cy = e.cy + deltaY;
            break;
          case "line":
            const i = initial as DragPositionLine;
            props.x1 = i.x1 + deltaX;
            props.y1 = i.y1 + deltaY;
            props.x2 = i.x2 + deltaX;
            props.y2 = i.y2 + deltaY;
            break;
          case "polygon":
          case "polyline":
            const poly = initial as DragPositionPolygon;
            props.points = poly.points.map(pt => ({ x: pt.x + deltaX, y: pt.y + deltaY }));
            break;
          case "path":
            const path = initial as DragPositionPath;
            // simple translate: add delta to all coordinates in path
            props.d = path.d.map(action => {
              const newAction = { ...action, d: { ...action.d } };
              // Only translate coordinates if they exist
              if ('x' in newAction.d) newAction.d.x += deltaX;
              if ('y' in newAction.d) newAction.d.y += deltaY;
              if ('x1' in newAction.d) newAction.d.x1 += deltaX;
              if ('y1' in newAction.d) newAction.d.y1 += deltaY;
              if ('x2' in newAction.d) newAction.d.x2 += deltaX;
              if ('y2' in newAction.d) newAction.d.y2 += deltaY;
              return newAction;
            });
            break;
        }
      });
    },


    // End the drag
    endDrag() {
      this.isDragging = false;
      this.dragInitialPositions = {};
    }


  },
});