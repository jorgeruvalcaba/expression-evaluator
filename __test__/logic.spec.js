import logic from '../src/logic';

describe("Logic script", () => {
  test("it should return validAmount: true", () => {
    const input = {
      "expression": "(amount > min) == true",
      "save": "validAmount",
      "transitions": {
        "isTrue": 5,
        "isFalse": 10,
        "isError": 25,
      },
      "context": {
        "amount": 150,
        "min": 45,
      }
    };

    const output = {
      "validAmount": true,
	    "transition": 5
    };

    expect(logic(input)).toBeDefined();
    expect(logic(input)).toEqual(output);
  });

  test("it should return adult: false", () => {
    const input = {
      "expression": "((age) >= 18) == true",
      "save": "adult",
      "transitions": {
        "isTrue": 15,
        "isFalse": 23,
        "isError": 45
      },
      "context": {
        "age": 15,
      }
    };

    const output = {
      "adult": false,
	    "transition": 23
    };

    expect(logic(input)).toBeDefined();
    expect(logic(input)).toEqual(output);
  });

  test("it should return an Error", () => {
    const input = {
      "expression": "((age) >= 18) && green",
      "save": "adult",
      "transitions": {
        "isTrue": 15,
        "isFalse": 23,
        "isError": 45
      },
	    "context": {}
    };

    const output = {
      "adult": "ReferenceError: age is not defined",
	    "transition": 45
    };

    expect(logic(input)).toBeDefined();
    expect(logic(input)).toEqual(output);
  });
});