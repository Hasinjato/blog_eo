const Article = require('../models/article');
const User = require('../models/user');

exports.getIndex = (req, res) => {
    if (req.session.isAuthenticated) {
        connected = true
        res.locals._nom = req.session.user.username;
        res.locals._role = req.session.user.role;
    } else {
        connected = false;
    }
    console.log(connected);
    // req.session.user = user;
    // res.render('index', { connected });

    Article.find()
        // .populate('author','_id')
        .sort({ createdAt: -1 })
        .then(articles => {
            articles.forEach((article) => {
                article.content = article.content.slice(0, 150);
                article.formattedCreatedAt = article.createdAt.toLocaleString('fr-FR');
            });


            res.render('index',{ articles, connected });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Une erreur s'est produite"
            })
        });
};

exports.getArticleList = (req, res) => {
};