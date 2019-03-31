// Import MySQL connection.
var connection = require("../config/connection.js");

//  These are the methods needed in order to retrieve and store data in your database
    // selectAll()
    // insertOne()
    // updateOne()

// Helper functions to build queries
function printQuestionMarks(num) {
	var arr = [];
	for (var i = 0; i < num; i++) {
		arr.push('?');
	}
	return arr.toString();
}

function objToSql(ob) {
	var arr = [];
	for (var key in ob) {
		if (ob.hasOwnProperty(key)) {
			arr.push(key + '=' + ob[key]);
		}
	}
	return arr.toString();
}


// Create the ORM
var orm = {
	selectAll: function(tableInput, cb) {
		//building our queryString
		var queryString = 'SELECT * FROM ' + tableInput + ';';
		//connect and run query
		connection.query(queryString, function(err, result) {
			if (err) throw err;
			cb(result);
		});
	},

    insertOne: function(table, cols, vals, cb) {
		//build query  
		var queryString = 'INSERT INTO ' + table;
			queryString += ' (';
			queryString += cols.toString();
			queryString += ') ';
			queryString += 'VALUES (';
			queryString += printQuestionMarks(vals.length);
			queryString += ') ';

			console.log(queryString);
			console.log(vals);

		//connect and run query
		connection.query(queryString, vals, function(err, result) {
			if (err) throw err;
			cb(result);
		});
	},

	updateOne: function(table, objColVals, condition, cb) {
		//build query 
		var queryString = 'UPDATE ' + table;
			queryString += ' SET ';
			queryString += objToSql(objColVals);
			queryString += ' WHERE ';
			queryString += condition;

			console.log(queryString);

		//connect and run query
		connection.query(queryString, function(err, result) {
			if (err) throw err;
			cb(result);
		});
	}
};


// Export the orm object for the model
module.exports = orm;