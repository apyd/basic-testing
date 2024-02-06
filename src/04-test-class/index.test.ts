import {
  BankAccount,
  getBankAccount,
  InsufficientFundsError,
  TransferFailedError,
} from './index';

import * as lodash from 'lodash';

jest.mock('lodash');

describe('BankAccount', () => {
  let bankAccount: BankAccount;
  let balance: number;
  (lodash.random as jest.Mock).mockReturnValueOnce(0);
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

    (lodash.random as jest.Mock).mockReturnValueOnce(0.5);
    const result = await bankAccount.fetchBalance();

    expect(result).not.toBeNull();
    expect(typeof result).toBe('number');
  });

  test('should set new balance if fetchBalance returned number', async () => {
    expect.assertions(2);

    (lodash.random as jest.Mock).mockReturnValueOnce(0.5);
    const result = await bankAccount.fetchBalance();

    expect(typeof result).toBe('number');
    expect(result).toBe(0.5);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    (lodash.random as jest.Mock).mockReturnValueOnce(0);
    const result = await bankAccount.fetchBalance();
    expect(result).toBeNull;
  });
});
