//--NPM Packages--//
var inquirer = require("inquirer");

//--Setup NPM SQL Package and Database Connection--//
var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  // Your username
  user: "root",
  // Your password
  password: "Spurs2014$//",
  database: "bamazon"
});

//--Connection Test--//
connection.connect(function(err) {
  if (err) throw err;
  //console.log("connected as id " + connection.threadId);
});

//--Query Test--//
connection.query("SELECT * FROM products", function(err, res) {
	if (err) throw err;
  //console.log(res);
});

//--Application--//

//--Run Welcome Screen with Available Products--//
storeLoad();


//******Function Libaries********//

//--Query from DB for Product Listing--//
function selector() {
  connection.query("SELECT * FROM products", function(err, res) {
    for (var i = 0; i < res.length; i++) {
      console.log("Item ID = " + res[i].item_id + " | " + res[i].product_name + " | " + "Department - " 
        + res[i].department_name + " | " + "Price $ = " + res[i].price);
    }
    console.log("-----------------------------------");
  });
};

//--Welcome Screen Function--//
function storeLoad() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    console.log("Welcome to the store! Below you can see what we have available for purchase!");
      selector();
      setTimeout(bamazonConfirm, 1500);
    });
};

//--Place Order Function--//
function bamazonConfirm() {
  inquirer.prompt([
  {
    type:"confirm",
    message:"Would you like to place an order?",
    name:"confirm"
  
  }]).then(function(answers){
    if (answers.confirm) {
          bamazonBuy();
    } else {
          console.log("Thank you for visiting!!");
          };
  });
};

//-- Buying of Product Function--//
function bamazonBuy() {
  inquirer.prompt([
  {
      type:"input",
      message:"What is the product ID you would like to buy? \n",
      name:"idchoice"
  },
  {
    type:"input",
      message:"How many would you like to purchase? \n",
      name:"quantity"
  }
      ]).then(function(answers){
        var queryItem = "SELECT * FROM products WHERE item_id = ?";
          connection.query(queryItem, [answers.idchoice], function(err, res) {
            if (err) throw err;
            //console.log(res[0].stock_quantity);
              if (parseFloat(answers.quantity) <= parseFloat(res[0].stock_quantity)) {
                console.log("Congrats, We have Stock on Hand for your order!");
              } 
              else {
                console.log("Insufficient quantity!");
              }
          });
      });
};

//--Stock Quantity Update Query Function--//
// function queryUpdateStock() {
//   var queryStock = "UPDATE bamazon SET ? WHERE item_id = ?";
//   connection.query(queryStock, [answers.] function(err, res) {
// }
