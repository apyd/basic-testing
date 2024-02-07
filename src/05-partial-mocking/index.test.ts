jest.mock('./index', () => {
  const originalModule =
    jest.requireActual<typeof import('./index')>('./index');

  return {
    __esModule: true,
    ...originalModule,
    mockOne: jest.fn(),
    mockTwo: jest.fn(),
    mockThree: jest.fn(),
  };
});

describe('partial mocking', () => {
  let log: jest.SpyInstance;

  beforeEach(() => {
    log = jest.spyOn(console, 'log').mockImplementation(() => '');
  });

  afterEach(() => {
    log.mockRestore();
    log.mockClear();
  });

  afterAll(() => {
    jest.unmock('./index');
  });

  test('mockOne, mockTwo, mockThree should not log into console', async () => {
    expect.assertions(4);
    const module = await import('./index');
    const mockOne = module.mockOne;
    const mockTwo = module.mockTwo;
    const mockThree = module.mockThree;

    mockOne();
    mockTwo();
    mockThree();

    expect(mockOne).toHaveBeenCalled();
    expect(mockTwo).toHaveBeenCalled();
    expect(mockThree).toHaveBeenCalled();
    expect(log).not.toHaveBeenCalled();
  });

  test('unmockedFunction should log into console', async () => {
    expect.assertions(2);
    const module = await import('./index');
    const unmockedFunction = module.unmockedFunction;

    unmockedFunction();

    expect(log).toHaveBeenCalledWith('I am not mocked');
    expect(log).toHaveBeenCalledTimes(1);
  });
});
