const express = require("express");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");

const app = express();

// middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(expressLayouts);

// view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.set("layout", "layout"); // this means layout.ejs is the default wrapper

let inventory = [
  { id: 1, name: "Gaming Laptop", category: "Electronics", quantity: 10, price: 1200 },
  { id: 2, name: "Office Chair", category: "Furniture", quantity: 5, price: 250 },
  { id: 3, name: "Wireless Headphones", category: "Audio", quantity: 15, price: 180 },
];

app.get("/", (req, res) => {
  res.render("index", { title: "Inventory Dashboard", items: inventory, msg: null });
});

app.get("/new", (req, res) => {
  res.render("new", { title: "Add New Item" });
});

app.post("/add", (req, res) => {
  const { name, category, quantity, price } = req.body;
  const id = inventory.length ? inventory[inventory.length - 1].id + 1 : 1;
  inventory.push({ id, name, category, quantity: parseInt(quantity), price: parseFloat(price) });
  res.redirect("/");
});

app.delete("/delete/:id", (req, res) => {
  const id = parseInt(req.params.id);
  inventory = inventory.filter((item) => item.id !== id);
  res.redirect("/");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ NeoInventory running: http://localhost:${PORT}`));
