const jwt = require('jsonwebtoken');

const requireAuth =  (req,res,next) => {
    const token = req.cookies.jwt;
}

if(token) {
    jwt.verify(token, 'top secret', (err, decodedToken) => {
        if(err) {
            console.log(err.message);
            res.redirect('/login');
        } else { 
            console.log(decodedToken)
            let user = await User.findById(decodedToken.id)
            res.locals.user = user;
            next();

        
        }
    })
    }  
        else {
        res.locals.user = null
              next()
}



module.exports = { requireAuth, checkUser };