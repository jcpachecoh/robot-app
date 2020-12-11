export function between(x, min, max) {
    return x >= min && x <= max;
  }

  function getItemsNumber(space) {
    return space * 4;
  }

export function createArray(space) {
    const items = getItemsNumber(space);
    const matrixData = Array(items).fill(null).map(() => Array(items));
    for (let i = 0; i < matrixData.length; i++) {
        for (let j = 0; j < matrixData.length; j++) {
          matrixData[i][j] = 0;
        }
    }
return matrixData;
}
