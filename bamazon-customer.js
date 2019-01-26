const mysql = require("mysql");
const inquirer = require("inquirer");
const cliTable = require("cli-table");

let conn = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Demandred1",
    database: "bamazon"
});

function displayDB() {
    conn.query('SELECT * FROM products', function (err, res) {
        if (err) { console.log(err) };
        let dispTable = new cliTable({
            head: ["Item_ID", "Product", "Department", "Price", "Quantity"],
            colWidths: [12, 30, 15, 8, 12]
        });
        for (i = 0; i < res.length; i++) {
            dispTable.push(
                [res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]
            );
        }
        console.log(dispTable.toString());
        inquireCustomer();
    });
};
function inquireCustomer() {
    inquirer.prompt([

        {
            name: "id",
            type: "input",
            message: "Item number of desired item?"
        }, {
            name: 'quantity',
            type: 'input',
            message: "Quantity required?"
        },

    ]).then(function (answers) {
        let quantDesired = answers.quantity;
        let idDesired = answers.id;
        purchaseItems(idDesired, quantDesired);
    });
};
function purchaseItems(id, quantNeeded) {
    conn.query("SELECT * FROM products WHERE item_id = " + id, function (err, res) {
        if (err) { console.log(err) };
        if (quantNeeded <= res[0].stock_quantity) {
            let costTotal = res[0].price * quantNeeded;
            console.log("Order filled.");
            console.log("Total cost for " + quantNeeded + " " + res[0].product_name + " is $" + costTotal);
            // conn.query("UPDATE products SET stock_quantity = stock_quantity - " + quantNeeded + "WHERE item_id = " + id);
            let newQty = res[0].stock_quantity - quantNeeded
            conn.query("UPDATE products SET ? WHERE ?", [{
                stock_quantity: newQty
            }, {
                product_name: res[0].product_name
            }], function (err, res) { });

        }
        else {
            console.log("Not enough " + res[0].product_name + " on hand to fill your order.");
        };
        displayDB();

    });

};
displayDB();


