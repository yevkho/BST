export default function mergeSort(baseArr) {
  const l = 0;
  const h = baseArr.length - 1;
  return sort(baseArr, l, h);
}

function sort(baseArr, l, h) {
  // baseArr = [0, 1, 2, 3]
  // 1st l = 0; h = 3; m = 1
  if (l == h) return; //base-case

  let m = Math.floor((l + h) / 2); //recursive-case
  sort(baseArr, l, m); //left (0,0)
  sort(baseArr, m + 1, h); //right (1,1)
  merge(baseArr, l, m, h); //(0,0,1)
  return baseArr;
}

function merge(baseArr, l, m, h) {
  // baseArr = [0, 1, 2, 3]
  // 1st l = 0; h = 1; m = 0
  let tempArr = [];
  let i = l; //0
  let j = m + 1; //1
  let k = 0;

  //RL: we need to ensure small to large sequence prior to
  //sequential merging
  while (i <= m && j <= h) {
    if (baseArr[i] < baseArr[j]) {
      tempArr[k++] = baseArr[i++];
    } else {
      tempArr[k++] = baseArr[j++];
    }
  }

  while (i <= m) {
    tempArr[k++] = baseArr[i++];
  }
  while (j <= h) {
    tempArr[k++] = baseArr[j++];
  }

  for (let i = l; i <= h; i++) {
    baseArr[i] = tempArr[i - l];
  }
}

const list = [4, 2, 6, 3, 1, 5, 9, 7, 8, 10];

const lookupTable = {};

// build a lookup table
for (let i = 0; i < list.length; i++) {
  lookupTable[list[i]] = i;
}
