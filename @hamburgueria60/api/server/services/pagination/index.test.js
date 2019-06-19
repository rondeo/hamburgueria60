const { getParams } = require(".");

describe("pagination service", () => {
  describe("getPage", () => {
    describe("sanity check", () => {
      it("should throw error if args are not present", () => {
        expect(getParams().filter).toEqual({ limit: 20, skip: 0 });
        expect(getParams({}).filter).toEqual({ limit: 20, skip: 0 });
      });

      it("should throw error pageNumber is 0", () => {
        expect(() => {
          getParams({ pageNumber: 0, total: 153 });
        }).toThrow();
      });

      it("should throw error pageSize is 0", () => {
        expect(() => {
          getParams({ pageSize: 0, total: 153 });
        }).toThrow();
      });

      it("should throw error page is larger than max", () => {
        expect(() => {
          getParams({ pageNumber: 9, pageSize: 20, total: 153 });
        }).toThrow();
      });
    });

    describe("logic check", () => {
      it("should 20 as limit and skip as 0 for page #1", () => {
        const { limit, skip } = getParams({
          pageNumber: 1,
          pageSize: 20,
          total: 153
        }).filter;
        expect(limit).toBe(20);
        expect(skip).toBe(0);
      });

      it("should 40 as limit and skip as 20 for page #2", () => {
        const { limit, skip } = getParams({
          pageNumber: 2,
          pageSize: 20,
          total: 153
        }).filter;
        expect(limit).toBe(20);
        expect(skip).toBe(20);
      });

      it("should 60 as limit and skip as 40 for page #3", () => {
        const { limit, skip } = getParams({
          pageNumber: 3,
          pageSize: 20,
          total: 153
        }).filter;
        expect(limit).toBe(20);
        expect(skip).toBe(40);
      });
    });
  });
});
