const bulkRun = async (functions) => {
  const promises = [];
  for (const [func, args] of functions) {
    const promise = new Promise((resolve) => {
      func(...args, resolve);
    });
    promises.push(promise);
  }
  return Promise.all(promises);
};

const f1 = (cb) => {
  cb(1);
};
const f2 = (a, cb) => {
  cb(a);
};
const f3 = (a, b, cb) => {
  setTimeout(() => cb([a, b]), 1000);
};

const f4 = (a, b, c, d, cb) => {
  setTimeout(() => cb([a, b, c, d]), 1000);
};

const f5 = (a, b, c, d, e, f, cb) => {
  setTimeout(() => cb([a, b, c, d, e, f]), 1000);
};

bulkRun([
  [f1, []],
  [f2, [2]],
  [f3, [3, 4]],
  [f4, [3, 4, 5, 6]],
  [f5, [3, 4, 5, 6, 8, 9]],
]).then(console.log);
