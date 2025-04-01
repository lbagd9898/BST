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
    //removes duplicates in array
    array = [...new Set(array)];
    //sorts array
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
    if (start > end) {
      return null;
    }

    let mid = start + Math.floor((end - start) / 2);

    let root = new Node(array[mid]);

    root.left = this.buildTreeRecursive(array, start, mid - 1);

    root.right = this.buildTreeRecursive(array, mid + 1, end);

    this.root = root;

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

  insert(value) {
    let currNode = this.root;
    this.insertRecursive(value, currNode);
  }

  insertRecursive(value, currNode) {
    if (currNode === null) {
      return new Node(value);
    }

    if (currNode.data === value) {
      return currNode;
    }

    if (value < currNode.data) {
      currNode.left = this.insertRecursive(value, currNode.left);
    } else if (value > currNode.data) {
      currNode.right = this.insertRecursive(value, currNode.right);
    }
  }

  getSuccessor(node) {
    node = node.right;
    while (node !== null && node.left !== null) {
      node = node.left;
    }
    return node;
  }

  delete(root, value) {
    if (root === null) {
      return root;
    }

    if (root.data > value) {
      root.left = this.delete(root.left, value);
    } else if (root.data < value) {
      root.right = this.delete(root.right, value);
    } else {
      // if root.data equals value
      if (root.left === null) {
        return root.right;
      }

      if (root.right === null) {
        return root.left;
      }

      let succ = this.getSuccessor(root);
      root.data = succ.data;
      root.right = this.delete(root.right, succ.data);
    }
    return root;
  }

  // returns node with a given data value
  find(root, value) {
    if (root.data > value) {
      return this.find(root.left, value);
    } else if (root.data < value) {
      return this.find(root.right, value);
    } else {
      return root;
    }
  }

  levelOrder(callback, root, queue = [root]) {
    if (typeof callback !== "function") {
      throw new Error("Callback function is required");
    }
    if (queue.length === 0) {
      return;
    }
    if (root.left != null) {
      queue.push(root.left);
    }
    if (root.right != null) {
      queue.push(root.right);
    }
    queue.shift();
    console.log(callback(root));
    return this.levelOrder(callback, queue[0], queue);
  }

  preOrder(callback, root) {
    if (typeof callback !== "function") {
      throw new Error("Callback function is required");
    }
    if (root === null) {
      return;
    }
    console.log(callback(root));
    if (root.left != null) {
      this.preOrder(callback, root.left);
    }
    if (root.right != null) {
      this.preOrder(callback, root.right);
    }
  }

  inOrder(callback, root) {
    if (typeof callback !== "function") {
      throw new Error("Callback function is required");
    }
    if (root === null) {
      return;
    }
    this.inOrder(callback, root.left);
    console.log(callback(root));
    this.inOrder(callback, root.right);
  }

  postOrder(callback, root) {
    if (typeof callback !== "function") {
      throw new Error("Callback function is required");
    }
    if (root === null) {
      return;
    }
    this.postOrder(callback, root.left);
    this.postOrder(callback, root.right);
    console.log(callback(root));
  }

  height(node) {
    if (node === null) {
      return 0;
    }

    let left = this.height(node.left);
    let right = this.height(node.right);

    return 1 + Math.max(left, right);
  }

  depth(node) {}
}

function test(node) {
  return node.data;
}

const newTree = new Tree();
let root = newTree.buildTree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9]);
console.log(newTree.height(root));
