function nodeChildCount(element, depth) {
  let count = element.childElementCount;
  if (depth === 0) {
    return 0;
  }

  for (const child of element.children) {
    count += nodeChildCount(child, depth === undefined ? undefined : depth - 1);
  }

  return count;
}

const div = document.createElement("div");
const p = document.createElement("p");
const span = document.createElement("span");
p.appendChild(span);
div.appendChild(p);

nodeChildCount(div); // 2
nodeChildCount(div, 1); // 1
nodeChildCount(div, 2); // 2
