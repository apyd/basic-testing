import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');

describe('throttledGetDataFromApi', () => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;

  beforeAll(() => {
    jest.useFakeTimers();
  });

  beforeEach(() => {
    mockedAxios.create.mockReturnThis();
    mockedAxios.get = jest.fn().mockResolvedValue({ data: '' });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should create instance with provided base url', async () => {
    expect.assertions(1);
    const relativePath = '/posts/1';
    await throttledGetDataFromApi(relativePath);
    expect(mockedAxios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    expect.assertions(1);
    const relativePath = '/posts/1';
    const promise = await throttledGetDataFromApi(relativePath);

    jest.runAllTimers();

    await promise;

    expect(mockedAxios.get).toHaveBeenCalledWith(relativePath);
  });

  test('should return response data', async () => {
    expect.assertions(1);

    const relativePath = '/posts/1';
    const mockData = { id: 1, title: 'first post' };

    mockedAxios.get.mockResolvedValue({ data: mockData });

    const promise = await throttledGetDataFromApi(relativePath);

    jest.runAllTimers();

    const data = await promise;
    expect(data).toEqual(mockData);
  });
});
