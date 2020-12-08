export function between(x, min, max) {
  return x >= min && x <= max;
}

export function createArray(length) {
  return Array.from(Array(length), () => new Array(length));
}

const configuration = {
  space: [-10, 10]
};

export function getStepsNumber(data) {
  const { commands, initialCoordinates, steps } = data;
  const visited = {};
  const roomMatrix = createArray(100000);
  const isInvalidNumberSteps = commands !== steps.length;
  const isInvalidRange =
    between(
      initialCoordinates.x,
      configuration.space[0],
      configuration.space[1]
    ) ||
    between(
      initialCoordinates.y,
      configuration.space[0],
      configuration.space[1]
    );
  if (isInvalidNumberSteps) {
    return "invalid input commands and steps are different";
  }
  if (isInvalidRange) {
    return "invalid input initial coordinates";
  }
  log
  for (let i = configuration.space[0]; i < configuration.space[1]; i++) {
    console.log("juan", i);
    // const element = i[index];
    // for (let j = 0; j < roomMatrix.length; j++) {
    //   const element = array[index];
    // }
  }

  return data.commands;
}
