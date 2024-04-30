function chunkArray(arr, length) {
  const arrayCopy = [...arr];
  return {
    next: () => {
      const chunk = arrayCopy.splice(0, length);

      return {
        value: chunk.length ? chunk : undefined,
        done: chunk.length ? true : false,
      };
    },
  };
}

const iterator = chunkArray([1, 2, 3, 4, 5, 6, 7, 8], 3);
console.log(iterator.next()); // { value: [1,2,3], done: false }
console.log(iterator.next()); // { value: [4,5,6], done: false }
console.log(iterator.next()); // { value: [7,8], done: false }
console.log(iterator.next()); // { value: undefined, done: true }
