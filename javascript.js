class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(root) {
    this.root = root;
  }

  sortArray(array) {
    array.sort((a, b) => a - b);
    return array;
  }

  buildTree(array) {
    let sortedArray = this.sortArray(array);
    let start = 0;
    let end = sortedArray.length - 1;
    return this.buildTreeRecursive(sortedArray, start, end);
  }

  buildTreeRecursive(array, start, end) {
    console.log(array);
    console.log(start);
    console.log(end);
    if (start > end) {
      return null;
    }

    let mid = start + Math.floor((end - start) / 2);

    let root = new Node(array[mid]);

    root.left = this.buildTreeRecursive(array, start, mid - 1);

    root.right = this.buildTreeRecursive(array, mid + 1, end);

    return root;
  }

  prettyPrint(node, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }

  insert(value) {}
}

const newTree = new Tree();
let root = newTree.buildTree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
newTree.prettyPrint(root);
