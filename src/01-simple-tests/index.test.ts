// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect.assertions(1);
    expect(simpleCalculator({ a: 1, b: 2, action: Action.Add })).toBe(3);
  });

  test('should subtract two numbers', () => {
    expect.assertions(1);
    expect(simpleCalculator({ a: 2, b: 1, action: Action.Subtract })).toBe(1);
  });

  test('should multiply two numbers', () => {
    expect.assertions(1);
    expect(simpleCalculator({ a: 4, b: 3, action: Action.Multiply })).toBe(12);
  });

  test('should divide two numbers', () => {
    expect.assertions(1);
    expect(simpleCalculator({ a: 10, b: 2, action: Action.Divide })).toBe(5);
  });

  test('should exponentiate two numbers', () => {
    expect.assertions(1);
    expect(simpleCalculator({ a: 2, b: 3, action: Action.Exponentiate })).toBe(
      8,
    );
  });

  test('should return null for invalid action', () => {
    expect.assertions(1);
    expect(simpleCalculator({ a: 1, b: 2, action: undefined })).toBe(null);
  });

  test('should return null for invalid arguments', () => {
    expect.assertions(1);
    expect(simpleCalculator({ a: '2', b: '4', action: Action.Add })).toBe(null);
  });
});
