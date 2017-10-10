// Dependencies
let express = require("express");

// Initialisation & Settings
let app = express();
app.set("views", "views");
app.set("view engine", "jade");

// Static files
app.use(express.static("public"));
app.use(express.static("node_modules/jquery/dist"));
app.use(express.static("node_modules/bootstrap/dist"));
app.use(express.static("node_modules/popper.js/dist"));
app.use(express.static("node_modules/font-awesome"));

// Routes
app.get('/', function (req, res) {
    res.render("index");
});

// Run
app.listen(process.env.PORT, function () {
    console.log("Server listening on port " + process.env.PORT + "...");
});
