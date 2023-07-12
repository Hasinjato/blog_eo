const fs = require('fs');
// const path = require('path');

// //  COnfiguration
// const viewsPath = path.join(__dirname,'..','views');

exports.getDashboard = (req, res) => {
    // const _nom = req.session.user.username;
    // const _role = req.session.user.role;
    // res.render('dash', {_nom, _role});
    // res.locals._nom = req.session.user.username;
    // res.locals._role = req.session.user.role;
    res.render('dash');
};
