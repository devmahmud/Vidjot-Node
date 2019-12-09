const express = require("express");
const exphbs = require("express-handlebars");
const session = require("express-session");
const path = require("path");
const passport = require("passport");
const mongoose = require("mongoose");
const flash = require("connect-flash");

const methodOverride = require("method-override");

const app = express();

// Load Routes
const ideas = require("./routes/ideas");
const users = require("./routes/users");

// Database Config
const db = require("./config/database");

// Passport Config
require("./config/passport")(passport);

// Connect to mongoose
mongoose
  .connect(db.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch(err => {
    console.log(err);
  });

// Handlebars Middleware
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Body Parser Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Static folder
app.use(express.static(path.join(__dirname, "public")));

// Method Override Middleware
app.use(methodOverride("_method"));

// Express Session Middleware
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
  })
);
// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect Flash middleware
app.use(flash());

// Global variable
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  res.locals.user = req.user || null;
  next();
});

// Home route
app.get("/", (req, res) => {
  res.render("index");
});

// About route
app.get("/about", (req, res) => {
  res.render("about");
});

// Use Routes
app.use("/ideas", ideas);
app.use("/users", users);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});
