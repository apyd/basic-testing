import {
  BankAccount,
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from './index';

import * as lodash from 'lodash';

jest.mock('lodash');
const mockLodash = lodash as jest.Mocked<typeof lodash>;
const { random: mockRandom } = mockLodash;

describe('BankAccount', () => {
  let bankAccount: BankAccount;
  let balance: number;
  beforeEach(() => {
    balance = 10000;
    bankAccount = getBankAccount(balance);
  });

  test('should create account with initial balance', () => {
    expect.assertions(1);
    expect(bankAccount.getBalance()).toBe(10000);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect.assertions(1);
    expect(() => bankAccount.withdraw(20000)).toThrow(
      new InsufficientFundsError(balance),
    );
  });

  test('should throw error when transferring more than balance', () => {
    expect.assertions(1);
    const secondBankAccount = getBankAccount(balance);
    expect(() => bankAccount.transfer(20000, secondBankAccount)).toThrow(
      new InsufficientFundsError(balance),
    );
  });

  test('should throw error when transferring to the same account', () => {
    expect.assertions(1);
    expect(() => bankAccount.transfer(20000, bankAccount)).toThrow(
      new TransferFailedError(),
    );
  });

  test('should deposit money', () => {
    expect.assertions(1);
    bankAccount.deposit(balance);
    expect(bankAccount.getBalance()).toBe(balance * 2);
  });

  test('should withdraw money', () => {
    expect.assertions(1);
    bankAccount.withdraw(balance);
    expect(bankAccount.getBalance()).toBe(0);
  });

  test('should transfer money', () => {
    expect.assertions(2);
    const secondBankAccount = getBankAccount(balance);
    bankAccount.transfer(balance, secondBankAccount);
    expect(bankAccount.getBalance()).toBe(0);
    expect(secondBankAccount.getBalance()).toBe(balance * 2);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    expect.assertions(2);

    mockRandom.mockReturnValueOnce(0.5);
    const result = await bankAccount.fetchBalance();

    expect(result).not.toBeNull();
    expect(typeof result).toBe('number');
  });

  test('should set new balance if fetchBalance returned number', async () => {
    expect.assertions(2);

    mockRandom.mockReturnValueOnce(100).mockReturnValueOnce(1);

    await bankAccount.synchronizeBalance();
    const newBalance = await bankAccount.getBalance();

    expect(typeof newBalance).toBe('number');
    expect(newBalance).toEqual(100);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    expect.assertions(1);

    mockRandom.mockReturnValueOnce(100).mockReturnValueOnce(0);

    expect(bankAccount.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
