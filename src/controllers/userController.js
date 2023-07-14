const User = require('../models/user');
const bcrypt = require('bcrypt');

exports.getUserList = (req, res) => {
    User.find()
        .then(users => {
            res.render('users/index',{users});
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Une erreur s'est produite"
            })
        });
};

exports.createUserForm = (req, res) => {
    res.render('users/new', {
        errorMessage:''
    });
};

exports.createUser = (req, res) => {
    const username = req.body.username;
    const pass = req.body.password;
    const rpass = req.body.repeated_password;

    User.findOne({ username: username })
            .then((user) => {
                if(user) {
                    res.render('users/new', {
                        errorMessage:'Le nom d\'utilisateur existe déjà'
                    });
                }
                else if(pass != rpass) {
                    res.render('users/new', {
                        errorMessage:'Les deux mot de passe doit être identique'
                    });
                } else {
                    const user = {
                        username: username,
                        password: bcrypt.hashSync(pass, 10),
                        role: 'USER'
                    };
                    User.collection.insertOne(user);

                    res.redirect('/users');
                }
            })

};

exports.getUserDetails = (req, res) => {
    User.findById(req.params.id)
        .then((user) => {
            res.render('users/userDetails', { user });
        })
        .catch((error) => {
            return res.status(500).send(err);
        });
};

exports.updateUserForm = (req, res) => {
    User.findById(req.params.id)
        .then((user) => {
            res.render('users/edit', { user });
        })
        .catch((error) => {
            return res.status(400).send(err);
        });
};

exports.updateUser = async(req, res) => {
    try {
        const { id } = req.params.id;
        const { username, password, role} = req.body;

        const saltRounds = 10;
        const hashedPassword = hash(password, saltRounds);

        const updaterUser = User.findByIdAndUpdate(id, { username, password: hashedPassword, role } , {
            new: true,
            runValidators: true
        })
        res.redirect(`/users/${updatedUser._id}`);

            // .then((user) => {
            // })
    } catch(error) {
        return res.status(400).send(err);
    };
};
    
exports.deleteUser = (req, res) => {
    User.findByIdAndRemove(req.params.id)
        .then((user) => {
            res.redirect('/users');
        })
        .catch((error) => {
            return res.status(500).send(err);
        });
};

