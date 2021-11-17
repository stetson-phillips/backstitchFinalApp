const express = require("express");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
require("./app/config/passport")(passport);
const routes = require("./app/routes/index");

const path = __dirname + "/app/views/";

const app = express();
app.use(express.static(path));
app.set("views", "./app/views");
app.set("view engine", "hbs");

const db = require("./app/models");
db.sequelize.sync();
app.use(cors());
// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/", routes);

// set port, listen for requests
const PORT = process.env.PORT || 5432;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
