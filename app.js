const express = require("express");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
// const config = require("config");

const appController = require("./controllers/appController");
const isAuth = require("./middleware/is-auth");
const connectDB = require("./apakek/db");
// const mongoURI = config.get("mongoURI");
const path = require('path');

const app = express();
connectDB();

const store = new MongoDBStore({
  uri: "mongodb+srv://agung:agung@cluster-fcc.d7pa9ef.mongodb.net/punyaorg?retryWrites=true&w=majority",
  collection: "mySessions",
});

app.set('views', path.join(__dirname, 'views'));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

//=================== Routes
// Landing Page
app.get("/", appController.landing_page);

// Login Page
app.get("/login", appController.login_get);
app.post("/login", appController.login_post);

// Register Page
app.get("/register", appController.register_get);
app.post("/register", appController.register_post);

// Dashboard Page
app.get("/dashboard", isAuth, appController.dashboard_get);

app.post("/logout", appController.logout_post);

app.listen(5000, console.log("App Running on http://localhost:5000"));
