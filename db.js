const {MongoClient, ObjectId } = require('mongodb');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const User = require('./src/models/user');
const Article = require('./src/models/article');

// async function connectToDb () {
//     // Db Connection
//     mongoose.connect(process.env.DATABASE, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true
//     }).then(() => {
//         console.log('BD Connected!');
//     }).catch((err) => {
//         console.log("unable to connect on DB",err);
//     });
// }

//     const uri = 'mongodb://127.0.0.1:27017';
//     const client = new MongoClient(uri);
// async function createUserCollection() {
//     try {
//         await client.connect();
//         const database = client.db('blogDb');
//         const collection = database.collection('users');
//         const collections = await database.listCollections().toArray();
//         const collectionNames = collections.map((col) => col.name);
//         if(!collectionNames.includes('users')) {
//             // const schema = {
//             //     bsonType: 'object',
//             //     required: ['id','username','password'],
//             //     properties: {
//             //         id: {
//             //             bsonType: 'objectId',
//             //             description: 'required objectId',
//             //         },
//             //         username: {
//             //             bsonType: 'string',
//             //             description: 'required string',
//             //         },
//             //         password: {
//             //             bsonType: 'string',
//             //             description: 'required',
//             //             pattern: '^[a-f0-9]{64}$',
//             //         },
//             //     },
//             // };
//             // const validationOptions = {
//             //     validator: {
//             //         $jsonSchema: schema,
//             //     },
//             // };
//             // database.createCollection('users',validationOptions);
//             // database.createCollection('users');
//             const password = 'admin';
//             const hashedPassword = await bcrypt.hashSync(password, 10);
//             const user = {
//                 id: new ObjectId(),
//                 username: 'admin',
//                 password: hashedPassword,
//                 role: 'ADMIN'
//             };
//             try {
//                 await collection.insertOne(user);
//             } catch (error) {
//                 console.error('Failed to insert user: ',error.message);
//             }
//         }
//         else {
//             console.log("Collection users already exists");
//         }
//     } finally {
//         await client.close();
//     }
// }
// async function createArticleCollection () {
//     try {
//         await client.connect();
//         const database = client.db('blogDb');
//         const collections = await database.listCollections().toArray();
//         const collectionNames = collections.map((col) => col.name);
//         if(!collectionNames.includes('article')) {
//             database.createCollection('article');
//         }
//         else {
//             console.log("Collection article already exists");
//         }
//     } finally {
//         await client.close();
//     }
// }

function createAllForDb() {
    // Db Connection
    mongoose.connect('mongodb+srv://hasinjato:726681@blogdb.etj5goh.mongodb.net/', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log('BD Connected!');
    
        if (!mongoose.connection.collections.users) {
            mongoose.connection.createCollection('users');
        }
        
        if (!mongoose.connection.collections.articles) {
            mongoose.connection.createCollection('articles');
        }

        User.findOne({ username: 'admin' })
            .then((user) => {
                if(!user) {
                    const password = 'admin';
                    const hashedPassword = bcrypt.hashSync(password, 10);
                    const user = {
                        id: new ObjectId(),
                        username: 'admin',
                        password: hashedPassword,
                        role: 'ADMIN'
                    };
                    try {
                        collection.insertOne(user);
                    } catch (error) {
                        console.error('Failed to insert user: ',error.message);
                    }
                }
            })
    .catch((err) => {
        console.log("unable to connect on DB", err);
    })

    });
}



module.exports = { createAllForDb };