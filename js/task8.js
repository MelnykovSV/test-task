String.prototype.removeDuplicate = function () {
  return [...new Set(this.split(" "))].join(" ");
};

//================================================================================

let x =
  "Int32 Int32 Int32 Int32 Int32 Int32 Int32 Int32 Int32 Double Double Double";

console.log(x.removeDuplicate());
