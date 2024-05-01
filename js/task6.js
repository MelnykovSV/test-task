function processMatrix(arr) {
  const min = Math.min(...[...arr].flat());

  const result = arr.map((innerArray) =>
    innerArray.map((number) => (number % 2 ? number * min : number))
  );

  return result;
}

//================================================================================

const matrix = [
  [5, 3, 6],
  [7, 11, 2],
  [15, 9, 4],
];

console.log(processMatrix(matrix));
