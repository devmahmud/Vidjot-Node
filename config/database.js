if (process.env.NODE_ENV === "production") {
  module.exports = {
    mongoURI:
      "mongodb+srv://mahmud:mahmud12345@cluster0-9zx2s.mongodb.net/test?retryWrites=true&w=majority"
  };
} else {
  module.exports = { mongoURI: "mongodb://localhost/vidjot-dev" };
}
