import { between, createArray } from "./utils";
import RobotCleaner from './RobotCleaner';


describe("test utils", () => {
  test("number should be in the range", () => {
    const isIntheRannge = between(1, 0, 10);
    expect(isIntheRannge).toBeTruthy();
  });
  test("Array should have all the elements", () => {
    const array = createArray(1000);
    expect(array.length).toBe(4000);
  });
});

describe("test algorithm", () => {
  const mockData = {
    commands: 5,
    initialPosition: { x: 0, y: 0 },
    commandList: [
      { commands: 2, direction: "N" },
      { commands: 2, direction: "E" },
      { commands: 10, direction: "S" },
      { commands: 20, direction: "W" },
      { commands: 2, direction: "S" }
    ]
  };

  test(("should update position"), () => {
    const robotCleaner = new RobotCleaner(mockData)
    robotCleaner.updateCurrentPosition({ x: 10, y: 10 });
    const currentPosition = robotCleaner.getCurrentPosition();
    expect(currentPosition).toStrictEqual({x: 10, y: 10});
  });
  test(("should update matrix with visited place"), () => {
    const robotCleaner = new RobotCleaner(mockData)
    const position = { x: 10, y: 10 };
    robotCleaner.updateMatrix({ x: 10, y: 10 });
    const placeVisited = robotCleaner.getPlaceState(position);
    expect(placeVisited).toBe(1);
  });
  test("Should move the robot based on direction and update value", () => {
    const robotCleaner = new RobotCleaner(mockData)
    robotCleaner.moveRobot('N');
    const currentPosition = robotCleaner.getCurrentPosition();
    expect(currentPosition).toStrictEqual({ ...mockData.initialPosition, y: mockData.initialPosition.y + 1 });
    const { x, y } = currentPosition;
    expect(robotCleaner.roomMatrix[x][y]).toBe(1);
  });
  test("Should Robot validate if can move in that direction", () => {
    const robotCleaner = new RobotCleaner(mockData);
    robotCleaner.updateCurrentPosition({ x: 0, y: 999 });
    expect(robotCleaner.canRobotMove('N')).toBe(false);
    robotCleaner.updateCurrentPosition({ x: 0, y: -999 });
    expect(robotCleaner.canRobotMove('S')).toBe(false);
    robotCleaner.updateCurrentPosition({ x: -999, y: 0 });
    expect(robotCleaner.canRobotMove('W')).toBe(false);
    robotCleaner.updateCurrentPosition({ x: 999, y: 0 });
    expect(robotCleaner.canRobotMove('E')).toBe(false);
  });

  test('should return number steps', () => {
    const robotCleaner = new RobotCleaner(mockData);
    robotCleaner.updateMatrix(mockData.initialPosition);
    const newPosition = { x: 1, y: 0 }
    robotCleaner.updateCurrentPosition(newPosition);
    robotCleaner.updateMatrix(newPosition)
    robotCleaner.updateCurrentPosition({...newPosition, y: 2});
    robotCleaner.updateMatrix({ ...newPosition, y: -2 })
    const stepsNumber = robotCleaner.getStepsNumber();
    expect(stepsNumber).toBe(3);
  })
  test('should change direction if robot hits border', () => {
    const robotCleaner = new RobotCleaner(mockData);
    expect(robotCleaner.changeDirection('N')).toBe('S');
    expect(robotCleaner.changeDirection('S')).toBe('N');
    expect(robotCleaner.changeDirection('W')).toBe('E');
    expect(robotCleaner.changeDirection('E')).toBe('W');
  })

  test('should complete cleaning based on steps set when robot can not move', () => {
    const robotCleaner = new RobotCleaner({...mockData, initialPosition: {x: 998, y: 998}});
    robotCleaner.startCleaning();
    const stepsNumber = robotCleaner.getStepsNumber();
    expect(stepsNumber).toBe(33);
  })
  test('should complete cleaning based on steps set', () => {
    const robotCleaner = new RobotCleaner(mockData);
    robotCleaner.startCleaning();
    const stepsNumber = robotCleaner.getStepsNumber();
    expect(stepsNumber).toBe(35);
  })
});
