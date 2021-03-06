function quickSort(arr, left, right) {
  if (left < right) {
    let position = partition(arr, left, right);
    quickSort(arr, left, position - 1);
    quickSort(arr, position + 1, right);
  }

  return arr;

}

function partition(arr, left, right) {

  let pivot = arr[right].difficulty;
  let low = left - 1;

  for (let i = left; i < right; i++) {
    if (arr[i].difficulty <= pivot) {
      low++;
      swap(arr, i, low);
    }
  }
  swap(arr, right, low + 1);
  return low + 1;
}

function swap(arr, i, low) {
  let temp = arr[i].difficulty;
  arr[i].difficulty = arr[low].difficulty;
  arr[low].difficulty = temp;
}

module.exports = quickSort;
