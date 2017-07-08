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

//--Call Function on Load--//

bamazonConfirm();

function bamazonConfirm () {

  inquirer.prompt([
  {
    type:"confirm",
    message:"Would you like to place an order?",
    name:"confirm"
  
  }]).then(function(answers){
    if (answers.confirm) {
          selector();
          bamazonBuy();
    } else {
          console.log("I said good day to you sir!");
          };
  });
};


function bamazonBuy() {
  inquirer.prompt([
  {
      type:"input",
      message:"What is the ID of the product you would like to buy? \n",
      name:"idchoice"
  },
  {
    type:"input",
      message:"How many units of the product would you like to buy? \n",
      name:"quantity"
  }
      ]).then(function(answers){
        console.log(answers.idchoice);
        console.log(answers.quantity);
      });
};


function selector() {
	connection.query("SELECT * FROM products", function(err, res) {
	  for (var i = 0; i < res.length; i++) {
	    console.log("Item ID = " + res[i].item_id + " | " + res[i].product_name + " | " + "Department - " + res[i].department_name + " | " + "Price $ = " + res[i].price);
	  }
	  console.log("-----------------------------------");
	});
};