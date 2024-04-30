// Recurcive version

function reliableMultiplyRecursive(a, b) {
  try {
    const result = primitiveMultiply(a, b);
    return result;
  } catch (error) {
    if (error instanceof NotificationException) {
      return reliableMultiply(a, b);
    }
    return error;
  }
}

// Cycle version. Better in case of very low probabilies of result and ErrorException, recursive version will exceed call stack in this case

function reliableMultiply(a, b) {
  while (true) {
    try {
      const result = primitiveMultiply(a, b);
      return result;
    } catch (error) {
      if (error instanceof NotificationException) {
        continue;
      }
      return error;
    }
  }
}


function NotificationException() {}
function ErrorException() {}

function primitiveMultiply(a, b) {
  const rand = Math.random();
  if (rand < 0.0000001) {
    return a * b;
  } else if (rand > 0.9999999) {
    throw new ErrorException();
  } else {
    throw new NotificationException();
  }
}

console.log(reliableMultiply(8, 8));
