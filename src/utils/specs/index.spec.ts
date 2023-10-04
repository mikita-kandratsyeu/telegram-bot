import { logger } from '@bot/services';
import {
  capitalize,
  fetchCachedData,
  generateUniqueId,
  getKeyByValue,
  getTimezoneString,
  isEmptyObject,
  memoryCache,
  parseTimestampUTC,
  removeValueFromMemoryCache,
  setValueToMemoryCache,
  uniqBy,
} from '@bot/utils';
import { Logger } from 'winston';

jest.spyOn(logger, 'error').mockReturnValue({} as unknown as Logger);

describe('memory cache utils', () => {
  const key = 'testKey';
  const value = 'testValue';

  beforeEach(() => {
    jest.resetModules();
    memoryCache.del(key);
  });

  it('sets a key-value pair in the memory cache', () => {
    const expires = 3600; // 1 hour expiry

    setValueToMemoryCache(key, value, expires);

    const result = memoryCache.get(key);

    expect(result).toEqual(value);
  });

  it('sets a key-value pair in the memory cache with default expiry time', () => {
    setValueToMemoryCache(key, value);

    const result = memoryCache.get(key);

    expect(result).toEqual(value);
  });

  it('returns cached data if it exists', async () => {
    const data = { foo: 'bar' };
    const callback = jest.fn(() => JSON.stringify(data));

    const result = await fetchCachedData(key, callback);

    expect(result).toEqual(JSON.stringify(data));
  });

  it('calls callback and stores result in cache if no cached data exists', async () => {
    const data = { bar: 'baz' };
    const callback = jest.fn(() => Promise.resolve(data));

    const result = await fetchCachedData(key, callback);

    expect(result).toEqual(data);
  });

  it('remove a key-value pair in the memory cache', () => {
    setValueToMemoryCache(key, value);

    const result = removeValueFromMemoryCache(key);

    expect(result).toEqual(1);
  });
});

describe('isEmptyObject util', () => {
  it('should return true for empty object', () => {
    const emptyObject = {};
    expect(isEmptyObject(emptyObject)).toBe(true);
  });

  it('should return false for non-empty object', () => {
    const nonEmptyObject = { a: 1 };
    expect(isEmptyObject(nonEmptyObject)).toBe(false);
  });
});

describe('getKeyByValue util', () => {
  const object = { x: '1', y: '2', z: '3' };

  it('returns "x" when the value is 1', () => {
    expect(getKeyByValue(object, '1')).toBe('x');
  });

  it('returns "z" when the value is 3', () => {
    expect(getKeyByValue(object, '3')).toBe('z');
  });

  it('returns undefined when the value does not exist in the object', () => {
    expect(getKeyByValue(object, '4')).toBeUndefined();
  });
});

describe('uniqBy util', () => {
  it('should return an array with unique objects based on the given key', () => {
    const arr = [
      { id: 1, name: 'Jack' },
      { id: 2, name: 'Jane' },
      { id: 1, name: 'Jack' },
      { id: 3, name: 'Mary' },
    ];

    expect(uniqBy(arr, 'id')).toEqual([
      { id: 1, name: 'Jack' },
      { id: 2, name: 'Jane' },
      { id: 3, name: 'Mary' },
    ]);
  });

  it('should return an empty array when provided an empty array', () => {
    expect(uniqBy([], 'id')).toEqual([]);
  });
});

describe('parseTimestampUTC util', () => {
  it('should return a string in UTC format', () => {
    const input = new Date('2021-08-31T13:45:00Z');
    const expectedOutput = 'Tue, 31 Aug 2021 13:45:00 GMT';

    const output = parseTimestampUTC(input);

    expect(output).toBe(expectedOutput);
  });

  it('should return a string in UTC format when passed a timestamp as string', () => {
    const input = '2021-08-31T13:45:00Z';
    const expectedOutput = 'Tue, 31 Aug 2021 13:45:00 GMT';

    const output = parseTimestampUTC(input);

    expect(output).toBe(expectedOutput);
  });

  it('should return a string in UTC format when passed a timestamp as number', () => {
    const input = 1630433100000; // Equals to '2021-08-31T13:45:00Z'
    const expectedOutput = 'Tue, 31 Aug 2021 18:05:00 GMT';

    const output = parseTimestampUTC(input);

    expect(output).toBe(expectedOutput);
  });
});

describe('getTimezoneString util', () => {
  it('returns the correctly formatted timezone string for a positive offset', () => {
    expect(getTimezoneString(90)).toEqual('UTC -01:30');
    expect(getTimezoneString(240)).toEqual('UTC -04:00');
    expect(getTimezoneString(300)).toEqual('UTC -05:00');
  });

  it('returns the correctly formatted timezone string for a negative offset', () => {
    expect(getTimezoneString(-90)).toEqual('UTC +01:30');
    expect(getTimezoneString(-240)).toEqual('UTC +04:00');
    expect(getTimezoneString(-300)).toEqual('UTC +05:00');
  });

  it('returns the correctly formatted timezone string for a zero offset', () => {
    expect(getTimezoneString(0)).toEqual('UTC +00:00');
  });
});

describe('capitalize util', () => {
  it('should capitalize the first character', () => {
    const result = capitalize('hello');
    expect(result.charAt(0)).toEqual('H');
  });

  it('should make the rest of the characters lowercase', () => {
    const result = capitalize('HeLLo');
    expect(result).toEqual('Hello');
  });
});

describe('generateUniqueId util', () => {
  it('generates a unique ID', () => {
    const id1 = generateUniqueId();
    const id2 = generateUniqueId();

    expect(typeof id1).toBe('string');
    expect(typeof id2).toBe('string');
    expect(id1).not.toBe(id2);
  });
});
