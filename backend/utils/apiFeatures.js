class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  // Search by keyword (name field, case-insensitive)
  search() {
    const keyword = this.queryStr.keyword
      ? { name: { $regex: this.queryStr.keyword, $options: "i" } }
      : {};

    this.query = this.query.find({ ...keyword });
    return this;
  }

  // Filter by any field (price[gte], price[lte], category, etc.)
  filter() {
    const queryCopy = { ...this.queryStr };

    // Remove fields that are not for filtering
    const removeFields = ["keyword", "page", "limit", "sort"];
    removeFields.forEach((key) => delete queryCopy[key]);

    // Advanced filtering for gt, gte, lt, lte
    let queryStr = JSON.stringify(queryCopy);
    queryStr = queryStr.replace(
      /\b(gt|gte|lt|lte|in)\b/g,
      (match) => `$${match}`
    );

    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  // Sort results
  sort() {
    if (this.queryStr.sort) {
      const sortBy = this.queryStr.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }
    return this;
  }

  // Paginate results
  paginate() {
    const page = parseInt(this.queryStr.page) || 1;
    const limit = parseInt(this.queryStr.limit) || 12;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);
    this.page = page;
    this.limit = limit;
    return this;
  }
}

module.exports = ApiFeatures;
