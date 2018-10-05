
const {MongoClient, ObjectID} 	= require('mongodb');
const yargs						= require('yargs');
const crud 						= require('./mongo-crud');

const url 		= 'mongodb://localhost:27017';
const dbname 	= 'todoapi';


args 			= yargs.options({
					e:{
						//demand: true,
						alias:'event',
						describe:'to-do event'
					},
					s:{
						//demand: true,
						alias:'status',
						describe:'event status'
					}
				  })
					 .help()
					 .alias('help', 'h')
					 .argv;


const command 	= args._[0];


if(command == "add"){
	crud.insertData(args.event, args.status, (data) => {
		var data = data[0];
		console.log('');
		console.log('Name : ', data.name);
		console.log('Completed : ', data.completed);
		console.log('ID : ', data._id);
	});
}

if(command == "get"){

	crud.getData((data) => {

		console.log(JSON.stringify(data, undefined, 2));

	});
}

if(command == "countall"){

	crud.countall((data) => {

		console.log('Total Record : ', data);

	});

}

	//db.close();