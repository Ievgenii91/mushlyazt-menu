const MongoClient = require('mongodb').MongoClient;
const requestIp = require('request-ip');
const { MONGODB_ATLAS_CLUSTER_URI, CLIENT_ID, DB_NAME } = process.env;
let atlas_connection_uri;
let cachedDb = null;
const dbName = DB_NAME || 'BN';

export default async function handler(req, res) {
	var uri = MONGODB_ATLAS_CLUSTER_URI;
	const { zone } = req.query;
	if (!atlas_connection_uri) {
		atlas_connection_uri = uri;
	}
	return new Promise((resolve, reject) => {
		processEvent(
			{
				agent: req.headers['user-agent'],
				ip: requestIp.getClientIp(req),
				zone,
			},
			(err) => {
				if (err) {
					res.status(200).end();
					reject();
				}
				res.status(200).json({ ok: new Date().toISOString() });
				resolve();
			}
		);
	});
}

function processEvent(data, callback) {
	try {
		if (cachedDb == null) {
			console.log('=> connecting to database');
			MongoClient.connect(
				atlas_connection_uri,
				{ useUnifiedTopology: true },
				function (err, client) {
					if (err) {
						console.error(err);
						return callback(err);
					}
					cachedDb = client.db(dbName);
					return createDoc(cachedDb, data, callback);
				}
			);
		} else {
			createDoc(cachedDb, data, callback);
		}
	} catch (err) {
		console.error('an error occurred', err);
		return callback(err);
	}
}

function createDoc(db, metadata, callback) {
	db.collection('visits').insertOne(
		{
			clientId: CLIENT_ID,
			...metadata,
			date: new Date().toISOString(),
		},
		function (err) {
			if (err) {
				console.error('an error occurred in createDoc', err);
				callback(err, JSON.stringify(err));
			} else {
				console.log(`Successful QR scan for client ${CLIENT_ID}`);
				callback(null, 'SUCCESS');
			}
		}
	);
}
