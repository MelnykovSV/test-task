function processMatrix(arr) {
  const min = arr.flat().reduce((acc, item) => (item < acc ? item : acc));

  const result = arr.map((innerArray) =>
    innerArray.map((number) => (number % 2 ? number * min : number))
  );

  return result;
}
