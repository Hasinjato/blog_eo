const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const User = require('../models/user');
const bcrypt = require('bcrypt');

app.use(bodyParser.urlencoded({ extended: true}));


exports.getLogin = (req, res) => {
    // res.sendFile(path.join(viewsPath,'/login.html'));
    req.session.isAuthenticated = false;
    const errorMessage  = req.query.error;
    res.render('login', {
        errorMessage 
    });
};

exports.getLogout = (req, res) => {
    req.session.isAuthenticated = false;
    res.redirect('/');
}

exports.postLogin = (req, res) => {

    const { username, password } = req.body;
    try {
        User.findOne({ username })
            .then(user => {
                if(!user) {
                    // res.send('User non trouvé');
                    res.render('login', {
                        errorMessage:'Nom d \'utilisateur incorrect'
                    });
                } else {
                    // Comparaison mdp
                    bcrypt.compare(password, user.password, function(err, result) {
                        if(err) {
                            console.error(err);
                            res.status(500).send('Erreur serveur');
                        } else if(!result) {
                            // res.status(401).send('mdp incoreecte');
                            res.render('login', {
                                errorMessage:'Mot de passe incorrect'
                            });
                        } else {
                            req.session.isAuthenticated = true;
                            req.session.user = user;
                            if(user.role == "ADMIN") {
                                res.redirect('/dashboard');
                            }
                            if(user.role == "USER") {
                                res.redirect('/');
                            }
                        }
                    });
                }
            })
        } catch(err) {
            console.error(err);
            res.status(500).send('Erreur serveur');

        }
}