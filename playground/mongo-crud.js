const {MongoClient, ObjectID} 	= require('mongodb');
const yargs						= require('yargs');
const crud 						= require('./mongo-crud');

const url 		= 'mongodb://localhost:27017';
const dbname 	= 'todoapi';
	
	function insertData(name, completed, callback){

		MongoClient.connect(url, (err, client) => {
		const db 		= client.db(dbname);

			db.collection('todos').insertOne({
				name: name,
				completed : completed
			}, (err, res) => {

				if(err){

					return console.log('failed to insert data');

				} 

					callback(res.ops);

			})

		})
	}

	function getData(callback){

		MongoClient.connect(url,  { useNewUrlParser: true },(err, client) => {
		const db 		= client.db(dbname);		

			db.collection('todos').find().toArray().then((docs) => {

				callback(docs);

			}, (err) => {

				callback(undefined, err);

			})

		})

	}

	function countall(callback){

		MongoClient.connect(url,  { useNewUrlParser: true },(err, client) => {
		const db 		= client.db(dbname);		

			db.collection('todos').find().count().then((docs) => {

				callback(docs);

			}, (err) => {

				callback(undefined, err);

			})

		})


	}

module.exports = {
	insertData,
	getData,
	countall
}