const mongoose = require('mongoose');
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const userSchema = new mongoose.Schema({
    id: {
        type: ObjectId
    },
    username: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32
    },
    image: {
        type: String,
        required: false,
    },
    password:  {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    }
});

userSchema.pre('save', async function(next) {
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(this.password, salt);
        this.password = hash;
        next();
    } catch (error) {
        next(error);
    }
});

const User = mongoose.model('User', userSchema);
// };
    // update: function (id, data) {
    //     return new Promise((resolve, reject) => {
    //         MongoClient.connect('mongodb://localhost:27017', {useUnifiedTopology: true})
    //             .then(client => {
    //                 const db = client.db('blogDb');
    //                 const collection = db.collection('users')

    //                 collection.updateOne({_id: new mongodb.ObjectID(id)}, {
    //                     $set: data})
    //                     .then(() => {
    //                         client.close();
    //                         resolve();
    //                     })
    //                     .catch(error => {
    //                         client.close();
    //                         reject(error);
    //                     });
    //             })
    //             .catch(error => reject(error));
    //     });
    // },
    // delete: function (id) {
    //     return new Promise((resolve, reject) => {
    //         MongoClient.connect('mongodb://localhost:27017', {useUnifiedTopology: true})
    //             .then(client => {
    //                 const db = client.db('blogDb');
    //                 const collection = db.collection('users')

    //                 collection.deleteOne({_id: new mongodb.ObjectID(id)})
    //                 .then(() => {
    //                     client.close();
    //                     resolve();
    //                 })
    //                 .catch(error => {
    //                     client.close();
    //                     reject(error);
    //                 });
    //             })
    //             .catch(error => reject(error));
    //     });
    // },
// };

module.exports = User;