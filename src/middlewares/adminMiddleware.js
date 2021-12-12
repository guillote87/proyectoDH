function adminMiddleware(req,res,next){

    if (req.session.userLogged && req.session.userLogged.rol == 1){
    
}else{
  
    return res.redirect('/');
}

next()
    }
    module.exports = adminMiddleware