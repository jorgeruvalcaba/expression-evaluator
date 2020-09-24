import aritmetic from '../src/aritmetic';

describe("Aritmetic script", () => {
  test("it should return a float", () => {
    const input = {
      "expression": "value/(99**2)+1",
      "save": "result",
      "transitions": {
        "next": 1,
        "error": 2
      },
      "context": {
        "value": 180
      }
    };

    const output = {
      "result": "1.0183654729109275",
      "transition": 1
    };

    expect(aritmetic(input)).toBeDefined();
    expect(aritmetic(input)).toEqual(output);
  });

  test("it should return a NaN", () => {
    const input = {
      "expression": "(str/2)",
      "save": "result",
      "transitions": {
        "next": 101,
        "error": 102
      },
      "context": {
        "str": "string-value"
      }
    };

    const output = {
      "result": "NaN",
	    "transition": 102
    };

    expect(aritmetic(input)).toBeDefined();
    expect(aritmetic(input)).toEqual(output);
  });

  test("it should return a number", () => {
    const input = {
      "expression": "(10/2)-1",
      "save": "result",
      "transitions": {
        "next": 25,
        "error": 50
      },
      "context": {}
    };

    const output = {
      "result": "4",
	    "transition": 25
    };

    expect(aritmetic(input)).toBeDefined();
    expect(aritmetic(input)).toEqual(output);
  });
});