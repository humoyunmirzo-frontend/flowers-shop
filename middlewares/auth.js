const protected = (req,res, next)=>{
    if(!req.session.isLogged){
        res.redirect('/auth/login')
    } else next()
}

const guest = (req,res, next)=>{
    if(req.session.isLogged){
        res.redirect('/admin/dashboard')
    } 
     next()
}

module.exports = {
    protected,
    guest
}