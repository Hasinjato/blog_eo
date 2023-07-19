const Article = require('../models/article');
const User = require('../models/user');

exports.getArticleList = (req, res) => {
    Article.find()
        .then(articles => {
            res.render('index',{articles});
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Une erreur s'est produite"
            })
        });
};

exports.createArticleForm = (req, res) => {
    res.render('articles/new');
};

exports.createArticle = (req, res) => {
    const title = req.body.title;
    const content = req.body.content;
    if(req.file) {
        const img = req.file.filename;
    }
    const img = null;
    const _nom = req.session.user.username;
    const article = {
        title: title,
        content: content,
        image: img,
        author: _nom,
        createdAt: Date.now(),
    }
    Article.collection.insertOne(article);
    res.redirect('/');
};

exports.getArticleDetails = (req, res, err) => {
    if (req.session.isAuthenticated) {
        connected = true
        res.locals._nom = req.session.user.username;
        res.locals._image = req.session.user.image;
        res.locals._role = req.session.user.role;
    } else {
        connected = false;
    }
    Article.findById(req.params.id)
        .then((article) => {
                article.formattedCreatedAt = article.createdAt.toLocaleString('fr-FR');
                res.render('articleDetails', { article, connected });
        })
        .catch((error) => {
            return res.status(500).send(err);
        });
};

exports.updateArticleForm = (req, res) => {
    Article.findById(req.params.id)
        .then((article) => {
            res.render('articles/edit', { article });
        })
        .catch((error) => {
            return res.status(400).send(err);
        });
};

exports.updateArticle = async(req, res) => {
    try {
    } catch(error) {
        return res.status(400).send(err);
    };
};
    
exports.deleteArticle = (req, res) => {
    Article.findByIdAndRemove(req.params.id)
        .then((user) => {
            res.redirect('/articles');
        })
        .catch((error) => {
            return res.status(500).send(err);
        });
};

