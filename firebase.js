const admin = require('firebase-admin');

const serviceAccount = require('./esd-restaurant-db-firebase-adminsdk-lza2z-4f1565fe8f.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

module.exports = { db }; 