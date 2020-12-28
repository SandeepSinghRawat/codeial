module.exports.home = function(req, res){
    console.log(req.cookies);
    res.cookie('user_id', 22);
    res.render('home', {
        title: 'Home-page'
    });
};