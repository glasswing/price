
/*
 * GET home page.
 */

var mongo = require("mongodb");

var Server = mongo.Server;
	Db = mongo.Db;
	BSON = mongo.BSONPure;

var server = new Server("localhost", 27017, {auto_reconnect: true});
	db = new Db("pricedb", server, {w:1});

db.open(function(err, db) {
	if(!err)
		console.log("Connected to mongoDB");
});

exports.list = function(req, res){
	db.collection("stores", function(err, collection) {
		collection.find().toArray(function(err, items) {
			if(err) { console.log("Error:", err); }
			console.log("items:", JSON.stringify(items));
			res.render('stores', { stores: items });
		});
	});
};

exports.add_json = function(req, res) {
	var store = req.body;
	db.collection("stores", function(err, collection) {
		collection.insert(store, {safe: true}, function(err, result) {
			if(err) {
				console.log("Error:", error);
			} else {
				console.log("Success:", JSON.stringify(result[0]));
				res.send(result[0]);
			}
		});
	});
}