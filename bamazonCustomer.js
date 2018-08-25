var mysql = require("mysql");
var inquirer = require("inquirer");
require('dotenv').config()

// Gives access to the mysql db
var connection = mysql.createConnection({
    host: "localhost",

    port: 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: "bamazon"
});

// Function definition for displaying the DB's information
function displayAll(res) {

    for (let i in res) {
        console.log(
            `ID: ${res[i].id} 
Product: ${res[i].product_name} 
Price: $${res[i].price}
`
        )

    };
};

// Function definition for when a user wants to purchase an item
function buyProduct() {
    inquirer.prompt([
        {
            type: "input",
            message: "Enter the ID of the item you wish to buy",
            name: "id",
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true
                }
                else {
                    return false;
                }
            }
        },
        {
            type: "input",
            message: "How many?",
            name: "quantity",
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true
                }
                else {
                    return false;
                }
            }
        }
    ]).then((answers) => {
        

        console.log(answers);

        connection.query("SELECT * FROM products WHERE id=?", [parseInt(answers.id)], (err, res) => {

            let stock = res[0].stock_quantity;
            let purchase = parseInt(answers.quantity);
            let total = purchase * res[0].price
            // console.log(stock, purchase)
            // console.log(res);

            // Conditional statement to check if there's enough in stock for the purchase
            if (stock > purchase || stock === purchase) {

                let difference = stock - purchase;

                connection.query("UPDATE products SET stock_quantity = ? WHERE id = ?", [difference, answers.id], (err, res, fields) => {
                    if (err)
                        throw err;

                    console.log(`Purchase complete! Your total is ${total}`)

                    // Asks if the user would like to make another purchase
                    inquirer.prompt([
                        {
                            type: "confirm",
                            message: "Do you want to order again?",
                            name: "confirm"
                        }
                    ]).then((answers) => {

                        if (answers.confirm) {
                            selectAll();
                        }
                        else {
                            connection.end();
                        }
                    });
                });



            }
            else {
                console.log("Insufficient Quantity!")

                // Asks if the user would like to make another purchase
                inquirer.prompt([
                    {
                        type: "confirm",
                        message: "Do you want to order again?",
                        name: "confirm"
                    }
                ]).then((answers) => {

                    if (answers.confirm) {
                        selectAll();
                    }
                    else {
                        connection.end();
                    }
                });
            };



        })


    })
}

// Displays the contents
var selectAll = () => {
    connection.query("SELECT id, product_name, price FROM products", (err, res) => {
        if (err) throw err;
        console.log(displayAll(res));

        buyProduct();
    });
};

// What runs when the connection is successful
connection.connect((err) => {
    if (err)
        throw err
    console.log(`connected as id ${connection.threadId}`);

    // Runs a function that displays all of the items in the database for sale
    selectAll();

    // connection.end();
});