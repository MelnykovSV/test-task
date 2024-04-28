function chunkArray(arr, length) {
  return {
    next: () => {
      const chunk = arr.splice(0, length);

      return {
        value: chunk.length ? chunk : undefined,
        done: chunk.length ? true : false,
      };
    },
  };
}

const iterator = chunkArray([1, 2, 3, 4, 5, 6, 7, 8], 3);
iterator.next(); // { value: [1,2,3], done: false }
iterator.next(); // { value: [4,5,6], done: false }
iterator.next(); // { value: [7,8], done: false }
iterator.next(); // { value: undefined, done: true }
