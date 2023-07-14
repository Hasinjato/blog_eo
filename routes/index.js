const express = require('express');
const router = express.Router();
const session = require('express-session');

const indexController = require('../src/controllers/indexController');

const authController = require('../src/controllers/authController');
const dashController = require('../src/controllers/dashboardController');
const userController = require('../src/controllers/userController');
const articleController = require('../src/controllers/articleController');


function requireAuth(req, res, next) {
    if(!req.session.isAuthenticated){
        return res.redirect('/login');
    }
    else {
        res.locals._nom = req.session.user.username;
        res.locals._role = req.session.user.role;
        next();
    }
}

// router.get('/login', (req, res) => {
//     res.redirect('/login');
// });


router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);

router.get('/logout', authController.getLogout);

router.get('/dashboard', requireAuth, dashController.getDashboard);


router.get('/users', requireAuth, userController.getUserList);

router.get('/users/create', userController.createUserForm);
router.post('/users/create', userController.createUser);

router.get('/users/:id', requireAuth, userController.getUserDetails);

router.get('/users/:id/edit', requireAuth, userController.updateUserForm);
router.put('/users/:id', requireAuth, userController.updateUser);

router.delete('/users/:id', requireAuth, userController.deleteUser);


router.get('/articles', articleController.getArticleList);


router.get('/articles/create', articleController.createArticleForm);
router.post('/articles/create', articleController.createArticle);

router.get('/articles/:id', articleController.getArticleDetails);

router.get('/articles/:id/edit', articleController.updateArticleForm);
router.put('/articles/:id', articleController.updateArticle);

router.delete('/articles/:id', requireAuth, articleController.deleteArticle);





router.delete('/:id', indexController.deletePost);
router.get('/', indexController.getIndex);
router.get('/', indexController.getArticleList);

module.exports = router;