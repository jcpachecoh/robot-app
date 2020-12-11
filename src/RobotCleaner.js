import { createArray } from "./utils";

const configuration = {
  space: [-1000, 1000]
};
class RobotCleaner {
  constructor({numberCommands, initialPosition, commandList}) {
    this.commands = numberCommands;
    this.currentPosition = initialPosition;
    this.commandList = commandList;
    this.roomMatrix = createArray(configuration.space[1]);
  }

  handleError (error) {
    return 'error' + error
  }

  updateCurrentPosition(position) {
    const { x, y } = position;
    this.currentPosition = { x, y }
  }

  getCurrentPosition() {
    return this.currentPosition;
  }

  updateMatrix(position) {
    const { x, y } = position;
    const xPosition = x < 0 ? x + configuration.space[1] : x;
    const yPosition = y < 0 ? y + configuration.space[1] : y;
    this.roomMatrix[xPosition][yPosition] = 1;
  }

  getPlaceState(position) {
    const { x, y } = position;
    const xPosition = x < 0 ? x + configuration.space[1] : x;
    const yPosition = y < 0 ? y + configuration.space[1] : y;
    return this.roomMatrix[xPosition][yPosition];
  }

  getRoomMatrix() {
    return this.roomMatrix;
  }

  canRobotMove(direction) {
    const { x, y } = this.getCurrentPosition();
    switch (direction) {
      case 'N':
        return y < configuration.space[1] - 1;
      case 'S':
        return y > configuration.space[0] + 1;
      case 'W':
        return x > configuration.space[0] + 1;
      case 'E':
        return x < configuration.space[1] - 1;
    }
  }

  moveRobot(direction) {
    const { x, y } = this.getCurrentPosition();
    switch (direction) {
      case 'N':
        this.updateCurrentPosition({ x, y: y + 1 });
        this.updateMatrix({ x, y: y + 1 });
        break;
      case 'S':
        this.updateCurrentPosition({ x, y: y - 1 });
        this.updateMatrix({ x, y: y - 1 })
        break;
      case 'W':
        this.updateCurrentPosition({ x: x - 1, y });
        this.updateMatrix({ x: x - 1, y })
        break;
      case 'E':
        this.updateCurrentPosition({ x: x + 1, y });
        this.updateMatrix({ x: x + 1, y })
        break;
    }
    const newPosition = this.getCurrentPosition();
    this.updateMatrix(newPosition);
  }

  changeDirection(direction) {
    if (direction === 'N') {
      return 'S'
    } else if (direction === 'S') {
      return 'N'
    } else if (direction === 'W') {
      return 'E'
    } else {
      return 'W'
    }
  }

  startCleaning() {
    this.updateMatrix(this.currentPosition)
    this.commandList.forEach(element => {
      const commands = element && element.commands;
      for (let index = 0; index < commands; index++) {
        if (this.canRobotMove(element.direction)) {
          this.moveRobot(element.direction)
        } else {
          const newDirection = this.changeDirection(element.direction)
          this.moveRobot(newDirection);
        }

      }
    });
  }

  getStepsNumber() {
    let steps = 0;
    for (let i = 0; i < configuration.space[1] - 1; i++) {
      for (let j = 0; j < configuration.space[1] -1 ; j++) {
        if (this.getPlaceState({ x:i, y: j }) === 1) {
          steps++
        }
      }
    }
    return steps;
  }
}

export default RobotCleaner;
