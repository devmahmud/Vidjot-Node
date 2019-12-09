if (process.env.NODE_ENV === "production") {
  module.exports = {
    mongoURI: "your connection string"
  };
} else {
  module.exports = { mongoURI: "mongodb://localhost/vidjot-dev" };
}
