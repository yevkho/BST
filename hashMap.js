import createNode from "./node2.js";
import createLinkedList from "./linkedList.js";

export default class HashMap {
  constructor(capacity = 16, loadFactor = 0.75) {
    this.hashMap = new Array(capacity);
    this.capacity = capacity;
    this.loadFactor = loadFactor;
  }

  //0. grow function
  checkForGrow() {
    const loadFactor = this.capacity * this.loadFactor;
    const currentLengthMap = this.length();

    if (currentLengthMap > loadFactor) {
      const newCapacity = this.capacity * 2;
      const oldEntries = this.entries();
      this.capacity = newCapacity;
      this.clear();

      oldEntries.forEach((entry) => {
        this.set(entry[0], entry[1]);
      });
    }
  }

  //1. produces a hash code
  hash(key) {
    let hashCode = 0;
    const primeNumber = 31;

    if (typeof key === "number") {
      //to process array of numbers
      hashCode = key;
    } else {
      for (let i = 0; i < key.length; i++) {
        hashCode = hashCode * primeNumber + key.charCodeAt(i);
      }
    }
    const hashIndex = hashCode % this.capacity;
    return hashIndex;
  }

  //2. add an element to hashMap
  set(key, value) {
    const hashIndex = this.hash(key);
    //A. if bucket is not empty
    if (this.hashMap[hashIndex]) {
      //reference to the empty bucket or linked-list
      //a. check for key-match in linked list and override value
      const matchingNodeIndex = this.hashMap[hashIndex].findKey(key); //null or matching-key index
      if (matchingNodeIndex === 0 || matchingNodeIndex) {
        const matchingNode =
          this.hashMap[hashIndex].returnAt(matchingNodeIndex);
        matchingNode.value = value;
        return;
      }
      //b. create new node and add to the tail of linked-list
      this.hashMap[hashIndex].appendNode(key, value);
      const newHead = this.hashMap[hashIndex].getHead(); //update head from linkedList to hashMap
      this.hashMap[hashIndex].head = newHead;
      this.checkForGrow();
      return;
    }
    //B. if bucket is empty, create and head and linkedList at index
    const headNode = createNode(key, value); //{key, value, next: null)}
    this.hashMap[hashIndex] = createLinkedList(headNode);
    this.checkForGrow();
    return;
  }

  //3. takes one argument as a key and returns the value that is assigned to this key.
  get(key) {
    const hashIndex = this.hash(key);
    if (this.hashMap[hashIndex]) {
      //if bucket is not empty
      const matchingNodeIndex = this.hashMap[hashIndex].findKey(key); //null or matching-key index
      if (matchingNodeIndex === 0 || matchingNodeIndex) {
        const matchingNode =
          this.hashMap[hashIndex].returnAt(matchingNodeIndex);
        return matchingNode.value;
      }
    }
    return null; //if bucket is empty
  }

  //4. takes a key as an argument and returns true or false based on whether or not the key is in the hash map.
  has(key) {
    const hashIndex = this.hash(key);
    if (this.hashMap[hashIndex]) {
      //if bucket is not empty
      const matchingNodeIndex = this.hashMap[hashIndex].findKey(key); //null or matching-key index
      if (matchingNodeIndex === 0 || matchingNodeIndex) {
        return true;
      }
    }
    return false; //if bucket is empty
  }

  //5. remove(key) takes a key as an argument. If the given key is in the hash map, it should remove the entry with that key and return true.
  remove(key) {
    const hashIndex = this.hash(key);
    if (this.hashMap[hashIndex]) {
      //if bucket is not empty
      const matchingNodeIndex = this.hashMap[hashIndex].findKey(key); //null or matching-key index
      if (matchingNodeIndex === 0 || matchingNodeIndex) {
        this.hashMap[hashIndex].removeAt(matchingNodeIndex);
        const newHead = this.hashMap[hashIndex].getHead(); //update head from linkedList to hashMap
        this.hashMap[hashIndex].head = newHead;
        return true;
      }
    }
    return false; //if bucket is empty
  }

  //6. returns the number of stored keys in the hash map.
  length() {
    let count = 0;
    this.hashMap.forEach((bucket) => {
      if (bucket) {
        let bucketCount = bucket.getSize();
        count += bucketCount;
      }
    });
    return count;
  }

  //7. removes all entries in the hash map.
  clear() {
    this.hashMap = new Array(this.capacity);
  }

  //8. returns an array containing all the keys inside the hash map.
  keys() {
    const keysArray = [];
    this.hashMap.forEach((bucket) => {
      if (bucket) {
        const head = bucket.getHead();
        let currentNode = head;
        while (currentNode) {
          keysArray.push(currentNode.key);
          currentNode = currentNode.next;
        }
      }
    });
    return keysArray;

    // let arrayMap = this.hashMap.filter(
    //   (element) => typeof element === "object"
    // );
    // console.log(arrayMap);
    // return arrayMap.map((item) => item.head.key);
  }

  //9. returns an array containing all the values.
  values() {
    const valuesArray = [];
    this.hashMap.forEach((bucket) => {
      if (bucket) {
        const head = bucket.getHead();
        let currentNode = head;
        while (currentNode) {
          valuesArray.push(currentNode.value);
          currentNode = currentNode.next;
        }
      }
    });
    return valuesArray;
  }

  //10. returns an array that contains each key, value pair.
  entries() {
    const pairsArray = [];
    this.hashMap.forEach((bucket) => {
      if (bucket) {
        const head = bucket.getHead();
        let currentNode = head;
        while (currentNode) {
          const bucketArray = [currentNode.key, currentNode.value];
          pairsArray.push(bucketArray);
          currentNode = currentNode.next;
        }
      }
    });
    return pairsArray;
  }
}
