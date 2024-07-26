import createNode from "./node2.js";

export default function createLinkedList(head = null) {
  //1. adds a new node containing value to the end of the list
  function appendNode(key, value) {
    const newNode = createNode(key, value);
    const lastNode = getTail();
    if (head == null) {
      head = newNode;
    } else {
      lastNode.next = newNode;
    }
  }

  //2. adds a new node containing value to the start of the list
  function prependNode(value) {
    const newNode = createNode(value);
    newNode.next = head;
    head = newNode;
  }

  //3. returns the total number of nodes in the list
  function getSize() {
    let count = 0;
    let currentNode = head;
    while (currentNode) {
      count++;
      currentNode = currentNode.next;
    }
    return count;
  }

  //4. returns the first node in the list
  function getHead() {
    //utility instead of .head property
    return head;
  }

  //5. returns the last node in the list
  function getTail() {
    let lastNode = head;
    if (lastNode) {
      while (lastNode.next) {
        lastNode = lastNode.next;
      }
      return lastNode;
    } else {
      //if empty list
      return null;
    }
  }

  //6. returns the node at the given index
  function returnAt(index) {
    const listSize = getSize();
    if (index > listSize - 1) {
      return "index does not exist";
    }

    let count = 0;
    let currentNode = head;
    while (count < index) {
      count++;
      currentNode = currentNode.next;
    }
    return currentNode;
  }

  //7. removes the last element from the list
  function popLast() {
    let lastNode = head;
    let previousNode;
    if (lastNode) {
      while (lastNode.next) {
        previousNode = lastNode;
        lastNode = lastNode.next;
      }
      previousNode.next = null;
    }
  }

  //8. returns true if the passed in value is in the list and otherwise returns false.
  function containsValue(value) {
    let currentNode = head;
    while (currentNode) {
      if (currentNode.value == value) {
        return true;
      }
      currentNode = currentNode.next;
    }
    return false;
  }

  //9. returns the index of the node containing value, or null if not found.
  //A
  function findValue(value) {
    let count = 0; //or '0' for array-type indexing
    let currentNode = head;
    while (currentNode) {
      if (currentNode.value == value) {
        return count;
      }
      count++;
      currentNode = currentNode.next;
    }
    return null;
  }
  //B
  function findKey(key) {
    let count = 0; //or '0' for array-type indexing
    let currentNode = head;
    while (currentNode) {
      if (currentNode.key == key) {
        return count;
      }
      count++;
      currentNode = currentNode.next;
    }
    return null;
  }

  //10. represents your LinkedList objects as strings, so you can print them out and preview them in the console.
  //The format should be: ( value ) -> ( value ) -> ( value ) -> null.
  function toString() {
    let listString = "";
    let currentNode = head;
    while (currentNode) {
      listString += `( ${currentNode.value} ) -> `;
      currentNode = currentNode.next;
    }
    listString += "null";
    return listString;
  }

  //11. inserts a new node with the provided value at the given index.
  function insertAt(value, index) {
    const listSize = getSize();
    if (index > listSize + 1) {
      return "index does not exist";
    }

    if (index == 0) {
      prependNode(value);
      return;
    }
    if (index == listSize) {
      appendNode(value);
      return;
    }

    const newNode = createNode(value);
    let count = 0; //or '0' for array-type indexing
    let currentNode = head;
    let previousNode;

    while (count < index) {
      count++;
      previousNode = currentNode;
      currentNode = currentNode.next;
    }
    previousNode.next = newNode;
    newNode.next = currentNode;
  }

  //12. removes the node at the given index.
  function removeAt(index) {
    const listSize = getSize();
    if (index >= listSize) {
      return "index does not exist";
    }

    let currentNode = head;

    if (index == 0) {
      head = currentNode.next;
      return;
    }

    let count = 0;
    let previousNode;
    while (count < index) {
      count++;
      previousNode = currentNode;
      currentNode = currentNode.next;
    }
    previousNode.next = currentNode.next;
  }

  return {
    head,
    appendNode,
    prependNode,
    getSize,
    getHead,
    getTail,
    returnAt,
    popLast,
    containsValue,
    findValue,
    findKey,
    toString,
    insertAt,
    removeAt,
  };
}
