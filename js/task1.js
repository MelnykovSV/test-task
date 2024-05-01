function nodeChildCount(element, depth) {
  if (depth === 0) {
    return 0;
  }

  let count = element.childElementCount;

  for (const child of element.children) {
    count += nodeChildCount(child, depth === undefined ? undefined : depth - 1);
  }

  return count;
}

//================================================================================

const div = document.createElement("div");
const p = document.createElement("p");
const span = document.createElement("span");
p.appendChild(span);
div.appendChild(p);

console.log(nodeChildCount(div)); // 2
console.log(nodeChildCount(div, 1)); // 1
console.log(nodeChildCount(div, 2)); // 2
