import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 4, b: 2, action: Action.Subtract, expected: 2 },
  { a: 10, b: 5, action: Action.Subtract, expected: 5 },
  { a: 5, b: 10, action: Action.Subtract, expected: -5 },
  { a: 4, b: 2, action: Action.Divide, expected: 2 },
  { a: 2, b: 2, action: Action.Divide, expected: 1 },
  { a: 3, b: 2, action: Action.Divide, expected: 1.5 },
  { a: 1, b: 2, action: Action.Multiply, expected: 2 },
  { a: 2, b: 2, action: Action.Multiply, expected: 4 },
  { a: 3, b: 2, action: Action.Multiply, expected: 6 },
  { a: 2, b: 3, action: Action.Exponentiate, expected: 8 },
  { a: 3, b: 2, action: Action.Exponentiate, expected: 9 },
  { a: 4, b: 2, action: Action.Exponentiate, expected: 16 },
];

const falsyCases = [
  { a: undefined, b: 2, action: Action.Add, expected: null },
  { a: 4, b: undefined, action: Action.Divide, expected: null },
  { a: 1, b: 2, action: undefined, expected: null },
  { a: '3', b: '2', action: Action.Add, expected: null },
  { a: undefined, b: undefined, action: undefined, expected: null },
];

describe('simpleCalculator', () => {
  it.each(testCases)(
    'When doing action: %p using a: %p b: %p expected result is %p',
    ({ action, a, b, expected }) => {
      expect(simpleCalculator({ a, b, action })).toEqual(expected);
    },
  );
  it.each(falsyCases)(
    'When doing action: %p using a: %p b: %p expected result is %p',
    ({ action, a, b, expected }) => {
      expect(simpleCalculator({ a, b, action })).toEqual(expected);
    },
  );
});
