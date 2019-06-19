export default class Pagination {
  pageNumber = 0;

  pageSize = 20;

  latestPage;

  constructor(pagination) {
    if (pagination) {
      this.pageNumber = pagination.pageNumber;
      this.pageSize = pagination.pageSize;
      this.latestPage = pagination.latestPage;
    }
  }

  reset() {
    this.pageNumber = 0;
    this.pageSize = 20;
    this.latestPage = undefined;
  }

  hasNext() {
    return (
      (this.latestPage && this.pageNumber < this.latestPage) || !this.latestPage
    );
  }

  next() {
    if (
      (this.latestPage && this.pageNumber < this.latestPage) ||
      !this.latestPage
    ) {
      this.pageNumber += 1;
    }
    return this;
  }
}
