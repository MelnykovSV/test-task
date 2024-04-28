const bulkRun = async (functions) => {
  const results = [];
  for (const [func, args] of functions) {
    const result = await new Promise((resolve) => {
      func.apply(null, [...args, resolve]);
    });
    results.push(result);
  }
  return results;
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

bulkRun([[f1, []], [f2, [2]][(f3, [3, 4])]]).then(console.log);
