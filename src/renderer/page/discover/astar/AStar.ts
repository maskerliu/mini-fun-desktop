import BinaryHeap from "./BinaryHeap";
import Graph, { GridNode } from "./Graph";

export default class AStar {

  public static search(graph: Graph, start: GridNode, dest: GridNode, closest: boolean, heuristics: Function):GridNode[] {
    graph.cleanDirty();
    let openHeap = new BinaryHeap<GridNode>((node: GridNode) => { return node.f; });
    start.h = heuristics(start, dest);
    graph.markDirty(start);
    openHeap.push(start);

    let closestNode = start; // set the start node to be the closest if required

    start.h = heuristics(start, dest);
    graph.markDirty(start);

    openHeap.push(start);

    while (openHeap.size() > 0) {
      // Grab the lowest f(x) to process next.  Heap keeps this sorted for us.
      var currentNode = openHeap.pop();

      // End case -- result has been found, return the traced path.
      if (currentNode.equal(dest)) {
        return AStar.pathTo(currentNode);
      }

      // Normal case -- move currentNode from open to closed, process each of its neighbors.
      currentNode.closed = true;

      // Find all neighbors for the current node.
      var neighbors = graph.neighbors(currentNode);

      for (var i = 0, il = neighbors.length; i < il; ++i) {
        var neighbor = neighbors[i];

        if (neighbor.closed || neighbor.isWall()) {
          // Not a valid node to process, skip to next neighbor.
          continue;
        }

        // The g score is the shortest distance from start to current node.
        // We need to check if the path we have arrived at this neighbor is the shortest one we have seen yet.
        var gScore = currentNode.g + neighbor.getCost(currentNode);
        var beenVisited = neighbor.visited;

        if (!beenVisited || gScore < neighbor.g) {

          // Found an optimal (so far) path to this node.  Take score for node to see how good it is.
          neighbor.visited = true;
          neighbor.parent = currentNode;
          neighbor.h = neighbor.h || heuristics(neighbor, dest);
          neighbor.g = gScore;
          neighbor.f = neighbor.g + neighbor.h;
          graph.markDirty(neighbor);
          if (closest) {
            // If the neighbour is closer than the current closestNode or if it's equally close but has
            // a cheaper path than the current closest node then it becomes the closest node
            if (neighbor.h < closestNode.h || (neighbor.h === closestNode.h && neighbor.g < closestNode.g)) {
              closestNode = neighbor;
            }
          }

          if (!beenVisited) {
            // Pushing to heap will put it in proper place based on the 'f' value.
            openHeap.push(neighbor);
          } else {
            // Already seen the node, but since it has been rescored we need to reorder it in the heap
            openHeap.rescoreElement(neighbor);
          }
        }
      }
    }

    if (closest) {
      return AStar.pathTo(closestNode);
    }

    // No result was found - empty array signifies failure to find path.
    return [];
  }

  private static pathTo(node: GridNode): GridNode[] {
    let cur = node;
    let path: GridNode[] = [];
    while (cur.parent) {
      path.unshift(cur);
      cur = cur.parent;
    }
    return path;
  }
}

export class Heuristics {
  public static manhattan(pos1: GridNode, pos2: GridNode): number {
    return Math.abs(pos2.x - pos1.x) + Math.abs(pos2.y - pos1.y);
  }

  public static diagonal(pos1: GridNode, pos2: GridNode): number {
    var D = 1;
    var D2 = Math.sqrt(2);
    var d1 = Math.abs(pos2.x - pos1.x);
    var d2 = Math.abs(pos2.y - pos1.y);
    return (D * (d1 + d2)) + ((D2 - (2 * D)) * Math.min(d1, d2));
  }
}