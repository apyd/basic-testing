import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    expect.assertions(1);
    const values = [1, 2, 3, 4];
    const expectedResult = {
      value: 1,
      next: {
        value: 2,
        next: {
          value: 3,
          next: {
            value: 4,
            next: {
              value: null,
              next: null,
            },
          },
        },
      },
    };
    const linkedList = generateLinkedList(values);
    expect(linkedList).toStrictEqual(expectedResult);
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    expect.assertions(1);
    const values = [2, 3, 4];
    const linkedList = generateLinkedList(values);
    expect(linkedList).toMatchSnapshot();
  });
});
