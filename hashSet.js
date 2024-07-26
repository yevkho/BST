import HashMap from "./hashMap.js";

export default class HashSet {
  constructor(capacity = 16) {
    this.hashSet = new HashMap(capacity);
  }

  add(key) {
    this.hashSet.set(key, true);
  }

  has(key) {
    return this.hashSet.get(key) !== undefined;
  }

  delete(key) {
    this.hashSet.remove(key);
  }
}
