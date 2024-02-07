import path from 'path';
import {
  readFileAsynchronously,
  doStuffByTimeout,
  doStuffByInterval,
} from './index';

describe('doStuffByTimeout', () => {
  let timer: number, callback: jest.Mock;

  beforeAll(() => {
    jest.useFakeTimers();
    callback = jest.fn();
    timer = 1000;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.useRealTimers();
  });
  test('should set timeout with provided callback and timeout', () => {
    expect.assertions(2);
    jest.spyOn(global, 'setTimeout');

    doStuffByTimeout(callback, timer);

    jest.runAllTimers();

    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(callback, timer);
  });
  test('should call callback only after timeout', () => {
    expect.assertions(1);
    doStuffByTimeout(callback, timer);

    jest.runAllTimers();

    expect(callback).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  let timer: number, callback: jest.Mock;

  beforeEach(() => {
    callback = jest.fn();
    timer = 1000;
  });

  beforeAll(() => {
    jest.useFakeTimers();
    jest.spyOn(global, 'setInterval');
  });

  afterEach(() => {
    callback.mockClear();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    expect.assertions(2);
    jest.spyOn(global, 'setInterval');

    doStuffByInterval(callback, timer);

    expect(setInterval).toHaveBeenCalledTimes(1);
    expect(setInterval).toHaveBeenLastCalledWith(callback, timer);
  });

  test('should call callback multiple times after multiple intervals', () => {
    expect.assertions(1);
    doStuffByInterval(callback, timer);

    jest.advanceTimersToNextTimer(5);

    expect(callback).toHaveBeenCalledTimes(5);
  });
});

describe('readFileAsynchronously', () => {
  let pathToFile: string;

  beforeAll(() => {
    pathToFile = 'path/to/fileToTest.txt';
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should call join with pathToFile', async () => {
    expect.assertions(2);
    const joinSpy = jest.spyOn(path, 'join');
    await readFileAsynchronously(pathToFile);
    expect(joinSpy).toHaveBeenCalledWith(__dirname, pathToFile);
    expect(joinSpy).toHaveBeenCalledTimes(1);
  });

  test('should return null if file does not exist', async () => {
    expect.assertions(1);
    const readFileAsynchronously = jest.fn().mockResolvedValue(null);
    const result = await readFileAsynchronously('');
    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    expect.assertions(1);
    const mockFileContent = 'content';
    const readFileAsynchronously = jest.fn().mockResolvedValue(mockFileContent);
    const result = await readFileAsynchronously(mockFileContent);
    expect(result).toStrictEqual(mockFileContent);
  });
});
