import { defineStore } from "pinia";
import type { treeNode } from "../types"
import type { SvgCanvasState, SvgStyle } from "../types/ui/svgCanvasState";
import { useSvgParser } from "../composables/svgTranslator";

type FlatNode = Omit<treeNode, "depth"> & { depth: number };


export const useEditorStore = defineStore("svgCanvas", {
  state: (): SvgCanvasState => ({
    rootNode: null,
    flatNodes: [],
    selectedNodeIds: [] as number[],
    activeTool: "select",
    width: 24,
    height: 24,
    zoom: .5,
    offsetX: 6,
    offsetY: 2.5,
    canvasColor: "#292a2a",
    activeStyle: {
      fill: {
        fill: "#ffffff",
        fillOpacity: 1,
      },
      stroke: {
        stroke: "#000000",
        strokeDasharray: "none",
        strokeDashoffset: 0,
        strokeLinecap: "butt",
        strokeLinejoin: "miter",
        strokeLineposition: "center",
        strokeOpacity: 1,
        strokeWidth: 1,
      }
    }
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
    flattenTree(node: treeNode | treeNode[] = this.rootNode, depth = 0): FlatNode[] {
      // Force the node into an array
      const nodesArray: treeNode[] = Array.isArray(node) ? node : [node];
      let result: FlatNode[] = []; // Initialize the tree

      nodesArray.forEach(node => {
        // Keep the original node, just add depth
        result.push(Object.assign(node, { depth }));

        if (node.type === "folder" && node.expanded && node.children?.length) {
          result = result.concat(this.flattenTree(node.children, depth + 1));
        }
      });

      return result;
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


    // Toggle Visibility of a node
    toggleNodeVisibility(node: treeNode) {
      this.$patch((state) => {
        node.visible = !node.visible;
      });
    },


    // Locks a node
    toggleNodeLock(node: treeNode) {
      this.$patch((state) => {
        node.locked = !node.locked;
      });
    },

    // Sets the active tool
    setTool(tool: typeof this.activeTool) {
      this.activeTool = tool;
    },

    // Sets default styling (stroke and fill)
    setDefaultStyle () {
      this.activeStyle = {
        fill: {
          fill: "#ffffff",
          fillOpacity: 1,
        },
        stroke: {
          stroke: "#ffffff",
          strokeDasharray: "none",
          strokeDashoffset: 0,
          strokeLinecap: "butt",
          strokeLinejoin: "miter",
          strokeOpacity: 1,
          strokeWidth: 1,
        }
      }
    },

    // Set fill properies
    // Receive the KEY + Value
    // Automatically interprit the key, and assigns the value.
    setFill<Key extends keyof SvgStyle["fill"]> (
      prop: Key, 
      value: SvgStyle["fill"][Key] 
    ) {
      this.activeStyle.fill[prop] = value;
    },

    // Set Stroke properties
    // Receive the Key + Value
    // Automatically interprit the key and assign the value.
    setStroke<Key extends keyof SvgStyle["stroke"]> (
      prop: Key,
      value: SvgStyle["stroke"][Key]
    ) {
      this.activeStyle.stroke[prop] = value;
    },


    setEditFromLibrary (svg:string): boolean {
      const { parse } = useSvgParser();
      this.rootNode = parse(svg)

      return true;
    }

  },
});