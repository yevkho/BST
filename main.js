import createNode from "./node.js";
import HashMap from "./hashMap.js";
import mergeSort from "./mergeSort.js";

function createTree(inputArray) {
  //utilities
  const uniqueArray = removeDuplicates(inputArray); //remove duplicates from inputArray
  const sortedArray = mergeSort(uniqueArray); //sort uniqueArray
  let treeRoot = buildTree(sortedArray, 0, sortedArray.length - 1); //build treeRoot

  function getTreeRoot() {
    return treeRoot;
  }

  //1. takes an array of data and builds it into a balanced BST
  function buildTree(sortedArray, start, end) {
    //Base Case
    if (start > end) {
      return null;
    }
    // Recursive case
    let mid = Math.floor((start + end) / 2);
    let rootNode = createNode(sortedArray[mid]);
    // Recursively construct left subtree and make it left child of rootNode
    rootNode.leftChild = buildTree(sortedArray, start, mid - 1);
    // Recursively construct right subtree and make it right child of rootNote
    rootNode.rightChild = buildTree(sortedArray, mid + 1, end);
    return rootNode;
  }

  //2
  function insertItem(newRootValue, root = treeRoot) {
    //base case (end of the line)
    if (root == null) {
      root = createNode(newRootValue);
      return root;
    }

    // recursive case
    if (newRootValue < root.value) {
      root.leftChild = insertItem(newRootValue, root.leftChild);
    } else if (newRootValue > root.value) {
      root.rightChild = insertItem(newRootValue, root.rightChild);
    }
    return root;
  }

  //3
  function deleteItem(deleteRootValue, root = treeRoot) {
    // Base case (target does not exist)
    if (root === null) {
      return root;
    }

    //utility
    function findLowest(node) {
      let lowestNode = node;
      while (lowestNode.leftChild !== null) {
        lowestNode = lowestNode.leftChild;
      }
      return lowestNode;
    }

    //Recursive case
    if (deleteRootValue < root.value) {
      //if target smaller go down left side
      root.leftChild = deleteItem(deleteRootValue, root.leftChild);
    } else if (deleteRootValue > root.value) {
      //if target bigger go down right side
      root.rightChild = deleteItem(deleteRootValue, root.rightChild);
    } else if (deleteRootValue == root.value) {
      //if found matching node
      //a) if no children(leafNode)
      if (root.leftChild == null && root.rightChild == null) {
        return null;
      }
      //b) if only one child
      if (root.leftChild == null) {
        return root.rightChild;
      } else if (root.rightChild == null) {
        return root.leftChild;
      }
      //c) if two children
      //find lowest successor and swipe values
      const inOrderSuccessor = findLowest(root.rightChild);
      root.value = inOrderSuccessor.value;
      //delete that lowest node from the tree
      //                            60                      60
      //                            60                      70
      root.rightChild = deleteItem(inOrderSuccessor.value, root.rightChild);
    }

    return root;
  }

  //4. returns the node with the given value
  function findNode(value) {
    let currentNode = getTreeRoot();
    while (currentNode) {
      if (value == currentNode.value) {
        return currentNode;
      } else if (value < currentNode.value) {
        currentNode = currentNode.leftChild;
      } else {
        currentNode = currentNode.rightChild;
      }
    }
    return null;
  }

  //5. traverse the tree in breadth-first level order and call the callback on each node
  function levelOrderTraverse(callback) {
    if (!callback) {
      throw new Error("Callback function is required"); // Throws a new Error object
    }

    if (treeRoot == null) {
      return;
    }
    const queue = [];
    queue.push(treeRoot);
    while (queue.length !== 0) {
      //run callback on front element
      const frontNode = queue[0];
      callback(frontNode);
      //add children to queue
      if (frontNode.leftChild !== null) {
        queue.push(frontNode.leftChild);
      }
      if (frontNode.rightChild !== null) {
        queue.push(frontNode.rightChild);
      }
      //remove element from front of the queue
      queue.shift();
    }
  }

  //6. traverses BST in sorted order
  function inOrder(callback = console.log, root = treeRoot) {
    if (root == null) {
      return;
    }
    inOrder(callback, root.leftChild);
    callback(root);
    inOrder(callback, root.rightChild);
    return;
  }

  //7. traverse the tree in their respective depth-first order and pass each node to the provided callback
  function preOrder(callback = console.log, root = treeRoot) {
    if (root == null) {
      return;
    }
    callback(root);
    preOrder(callback, root.leftChild);
    preOrder(callback, root.rightChild);
    return;
  }

  //8. traverse the tree in their respective depth-first order and pass each node to the provided callback
  function postOrder(callback = console.log, root = treeRoot) {
    if (root == null) {
      return;
    }
    postOrder(callback, root.leftChild);
    postOrder(callback, root.rightChild);
    callback(root);
    return;
  }

  //9. Height is the number of edges in the longest path from a given node to a leaf node
  function height(root = treeRoot) {
    if (root == null) {
      return -1;
    }
    let leftDepth = height(root.leftChild); // 0
    let rightDepth = height(root.rightChild); // go to rootNode 3 // 1

    if (leftDepth > rightDepth) {
      return leftDepth + 1;
    } else {
      //if right is bigger or if equal (+ 1)
      return rightDepth + 1;
    }
  }

  //10. Depth is the number of edges in the path from a given node to the tree’s root node.
  function depth(root) {
    if (root == null) {
      return null;
    }

    const targetValue = root.value;
    let currentNode = getTreeRoot(); //starting at treeRoot
    let depthCount = 0;

    while (currentNode) {
      if (currentNode.value == targetValue) {
        return depthCount;
      }

      if (targetValue < currentNode.value) {
        depthCount++;
        currentNode = currentNode.leftChild;
      } else {
        depthCount++;
        currentNode = currentNode.rightChild;
      }
    }

    return null; //if node is empty or does not exist
  }

  //11. checks if the tree is balanced
  function isBalanced() {
    function checkBalance(root = treeRoot) {
      if (root == null) {
        return true;
      }

      const leftNode = height(root.leftChild); // 4 (3)  // 1 (0) // null (-1) [1]
      const rightNode = height(root.rightChild); // 67 (2) // (2) // 7 (1) [-1]
      const difference = Math.abs(leftNode - rightNode);

      if (difference > 1) {
        return false;
      }

      return checkBalance(root.leftChild) && checkBalance(root.rightChild);
    }

    if (checkBalance()) {
      console.log("the tree is balanced!");
      return true;
    } else {
      console.log("the tree is not balanced...");
      return false;
    }
  }

  ////
  function preOrder(callback = console.log, root = treeRoot) {
    if (root == null) {
      return;
    }
    callback(root);
    preOrder(callback, root.leftChild);
    preOrder(callback, root.rightChild);
    return;
  }
  ////

  //12. re-balances an unbalanced tree
  function reBalance() {
    const newTreeArray = [];

    function processNodes(node) {
      newTreeArray.push(node.value);
    }

    inOrder(processNodes);

    treeRoot = buildTree(newTreeArray, 0, newTreeArray.length - 1);
    // prettyPrint(tree.getTreeRoot());
    return;
  }

  return {
    treeRoot,
    getTreeRoot,
    insertItem,
    deleteItem,
    findNode,
    levelOrderTraverse,
    preOrder,
    inOrder,
    postOrder,
    height,
    depth,
    isBalanced,
    reBalance,
  };
}

function prettyPrint(node, prefix = "", isLeft = true) {
  if (node === null) {
    return;
  }
  if (node.rightChild !== null) {
    prettyPrint(node.rightChild, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
  if (node.leftChild !== null) {
    prettyPrint(node.leftChild, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
}

function removeDuplicates(array) {
  const map = new HashMap();

  array.forEach((item) => {
    map.set(item);
  });
  return map.keys();
}

function testTree() {
  let treeArray = Array.from({ length: 99 }, () =>
    Math.floor(Math.random() * 100)
  );

  let tree = createTree(treeArray);
  prettyPrint(tree.treeRoot);

  tree.isBalanced();

  tree.insertItem(101);
  tree.insertItem(102);
  tree.insertItem(103);

  prettyPrint(tree.treeRoot);
  tree.isBalanced();

  tree.reBalance();
  console.log(tree.getTreeRoot());
  tree.isBalanced();
  prettyPrint(tree.getTreeRoot());

  tree.inOrder();
}

testTree();
