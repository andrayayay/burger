// Import MySQL connection.
var connection = require("../config/connection.js");

//  These are the methods needed in order to retrieve and store data in your database
    // selectAll()
    // insertOne()
    // updateOne()

// Create the ORM (Object Relational Mapping)
// Pass in query parameters for all 3 methods, including callbacks, to receive the data from the model
var orm = {
	selectAll: function(tableInput, cb) {
		var queryString = "SELECT * from ??";
		connection.query(queryString, [tableInput], function(err, res) {
			if (err) {
				throw err;
			}
			cb(res);
		});
	},
	insertOne: function(tableInput, columnName, burgerName, cb) {
		var queryString = "INSERT INTO ?? (??) VALUES (?)";
		connection.query(queryString, [tableInput, columnName, burgerName], function(err, res) {
			if (err) {
				throw err;
			}
			cb(res);
		});
	},
	updateOne: function(tableInput, updateColumnName, updateRowVal, searchColumnName, searchRowVal, cb) {
		var queryString = "UPDATE ?? SET ?? = ? WHERE ?? = ?";
		connection.query(queryString, [tableInput, updateColumnName, updateRowVal, searchColumnName, searchRowVal], function(err, res) {
			if (err) {
				throw err;
			}
			cb(res);
		});
	}
};


// Export the orm object for the model
module.exports = orm;