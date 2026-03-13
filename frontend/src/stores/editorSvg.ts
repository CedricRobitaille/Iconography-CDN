import { defineStore } from "pinia";
import type { treeNode } from "../types"
import type { SvgCanvasState, SvgStyle } from "../types/ui/svgCanvasState";
import { parseSvgToTreeNode } from "../composables/svg/parseSvgToNodeTree";


type FlatNode = Omit<treeNode, "depth"> & { depth: number };


export const useEditorStore = defineStore("svgCanvas", {
  state: (): SvgCanvasState => ({
    rootNode: null,
    flatNodes: [],
    selectedNodeIds: [] as treeNode[],
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
    /**
     * Select/Deselect the current node.
     * Output: this.selectedNodeIds[] push/splice node
     * @param node: treeNode - Chosen node
     * @param append: boolean - Toggle from arr of selected nodes
     */
    selectNode(node: treeNode, append: boolean = false) {
      if (append) { // When user is holding shift
        if (!this.selectedNodeIds.includes(node)) { // Node doesn't exist on array
          this.selectedNodeIds.push(node); // Add node to arr
        } else { // Node exists on array
          const index = this.selectedNodeIds.indexOf(node) // Find the index of the node
          this.selectedNodeIds.splice(index,1) // Remove the node from array
        }
      } else { // Otherwise, reset the node list
        this.selectedNodeIds = [node];
      }

      // On 1 or more selected node, set the fill stroke / colours
      if (this.selectedNodeIds.length >= 1) {
        const style = {
          fill: {
            fill: this.selectedNodeIds[0]?.style.fill,
            fillOpacity: this.selectedNodeIds[0]?.style,
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
        // ! Check if all the nodes have matching fill/stroke/whatevers

        // ! if matching, set to matching value

        // ! otherwise, set to undefined
      }

      console.log("Select Node List:", this.selectedNodeIds)
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


    setEditFromLibrary (svg:string): boolean {
      this.rootNode = parseSvgToTreeNode(svg)
      return true;
    },



  },
});