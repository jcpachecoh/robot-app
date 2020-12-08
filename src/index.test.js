import React from "react";
import { getStepsNumber, between, createArray } from "./utils";
test("This a test", () => {
  expect(2 + 2).toBe(4);
});

describe("test utils", () => {
  test("number should be in the range", () => {
    const isIntheRannge = between(1, 0, 10);
    expect(isIntheRannge).toBeTruthy();
  });
  test("number should be in the range", () => {
    const array = createArray(5);
    expect(array.length).toBe(5);
  });
});

describe("test algorithm", () => {
  const mockData = {
    commands: 5,
    initialCoordinates: { x: 0, y: 0 },
    steps: [
      { step: 2, orientation: "N" },
      { step: 2, orientation: "S" },
      { step: 2, orientation: "W" },
      { step: 2, orientation: "N" },
      { step: 2, orientation: "E" }
    ]
  };
  // beforeEach(() => {

  // })

  test("is a valid input steps different commands", () => {
    const stepsNumber = getStepsNumber({ ...mockData, steps: [] });
    expect(stepsNumber).toBe("invalid input commands and steps are different");
  });

  test("is a valid input steps different commands", () => {
    const stepsNumber = getStepsNumber({ ...mockData, steps: [] });
    expect(stepsNumber).toBe("invalid input commands and steps are different");
  });

  test("Should trown error if the initial coordinates are invalid", () => {
    const stepsNumber = getStepsNumber({
      ...mockData,
      initialCoordinates: { x: -2000000, y: 0 }
    });
    expect(stepsNumber).toBe("invalid input initial coordinates");
  });
  test("Should return the number of steps ", () => {
    const stepsNumber = getStepsNumber(mockData);
    expect(stepsNumber).toBe(5);
  });
});
