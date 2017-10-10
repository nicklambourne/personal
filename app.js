// Dependencies
let express = require("express");

// Initialisation & Settings
let app = express();
app.set("views", "views");
app.set("view engine", "jade");

// Static files
app.use(express.static("public"));

// Routes
app.get('/', function (req, res) {
    res.render("index");
});

// Run
app.listen(3000, function () {
    console.log("Server listening on port 3000...");
});
