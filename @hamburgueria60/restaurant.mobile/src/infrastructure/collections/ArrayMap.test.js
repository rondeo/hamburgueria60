import ArrayMap from './ArrayMap';

describe('ArrayMap collection', () => {
  let arrayMap;

  beforeEach(() => {
    arrayMap = new ArrayMap();
  });

  describe('length', () => {
    it('should return an empty length', () => {
      expect(arrayMap.length).toEqual(0);
    });
  });

  describe('get', () => {
    it('should return a value using a single key', () => {
      const value = arrayMap.get('key');
      expect(value).toBeFalsy();
    });
    it('should return the default value when there is not value for a key', () => {
      arrayMap = new ArrayMap(() => []);
      const value = arrayMap.get('key');
      expect(value).toEqual([]);
    });
  });

  describe('getIn', () => {
    it('should return a value using multiple keys', () => {
      const value = arrayMap.getIn(['key1', 'key2']);
      expect(value).toBeFalsy();
    });
    it('should throw a error when a falsy key is provided', () => {
      expect(() => {
        arrayMap.getIn(['key1', false, null, undefined]);
      }).toThrow();
    });
  });

  describe('set', () => {
    it('should set a value using a single key', () => {
      arrayMap.set('key', 'value');
      const value = arrayMap.get('key');
      expect(value).toEqual('value');
      expect(arrayMap.length).toEqual(1);
    });
  });

  describe('delete', () => {
    it('should delete a value from a single key', () => {
      arrayMap.delete('key');
      const value = arrayMap.get('key');
      expect(value).toBeFalsy();
    });
  });

  describe('forEach', () => {
    it('should iterate when it has no data', () => {
      const fn = jest.fn();
      arrayMap.forEach(fn);
      expect(fn).not.toHaveBeenCalled();
    });
    it('should iterate when it has data', () => {
      arrayMap.set('key', 'value');
      const fn = jest.fn();
      arrayMap.forEach(fn);
      expect(fn).toHaveBeenCalledWith('value', 'key');
    });
  });

  describe('map', () => {
    it('should iterate when it has no data', () => {
      const fn = jest.fn();
      arrayMap.map(fn);
      expect(fn).not.toHaveBeenCalled();
    });
    it('should iterate when it has data', () => {
      arrayMap.set('key', 'value');
      const fn = e => e;
      const result = arrayMap.map(fn);
      expect(result).toEqual(['value']);
    });
  });

  describe('reduce', () => {
    it('should iterate when it has no data', () => {
      const fn = jest.fn();
      arrayMap.reduce(fn);
      expect(fn).not.toHaveBeenCalled();
    });
    it('should iterate when it has data', () => {
      arrayMap.set('key', 'value');
      const fn = n => n + 1;
      const result = arrayMap.reduce(fn, 0);
      expect(result).toEqual(1);
    });
  });
});
