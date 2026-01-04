import { defineStore } from "pinia";
import type { treeNode } from "../types"
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

    setPan(offsetX: number, offsetY: number) {
      this.offsetX = offsetX;
      this.offsetY = offsetY;
    },
  },
});