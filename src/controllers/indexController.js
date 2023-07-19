const Article = require('../models/article');
const User = require('../models/user');

exports.getAbout = (req, res) => {
    res.render('about')
}

exports.getContact = (req, res) => {
    res.render('contact')
}

exports.getIndex = (req, res) => {
    if (req.session.isAuthenticated) {
        connected = true
        res.locals._nom = req.session.user.username;
        res.locals._image = req.session.user.image;
        res.locals._role = req.session.user.role;
    } else {
        connected = false;
    }
    console.log(connected);
    // req.session.user = user;
    // res.render('index', { connected });

    const page = parseInt(req.query.page) || 1;
    const limit = 7;
    const skip = (page - 1) * limit;
    totalArticle = 0;
    Article.find()
    .then(articles => {
        articles.forEach((article, index) => {
            totalArticle ++;
        });
    });
    Article.find()
        // .populate('author','_id')
        .limit(limit)
        .skip(skip)
        .sort({ createdAt: -1 })
        .then(articles => {
            articles.forEach((article, index) => {
                article.content = article.content.slice(0, 150);
                article.formattedCreatedAt = article.createdAt.toLocaleString('fr-FR');
            });
        // const totalArticle = Article.countDocuments();
        const totalPages = Math.ceil(totalArticle / limit);
            res.render('index',{ articles, connected, totalArticle, currentPage: page, totalPages });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Une erreur s'est produite"
            })
        });
};

exports.getArticleList = (req, res) => {
};

exports.deletePost = (req, res) => {
    Article.findByIdAndRemove(req.params.id)
        .then((article) => {
            res.redirect('/');
        })
        .catch((error) => {
            return res.status(500);
        });
};