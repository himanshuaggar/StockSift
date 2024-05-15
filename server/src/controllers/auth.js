const User = require('../models/User')
const { BadRequestError } = require('../errors')

const register = async ( req, res ) => {

    const { name } = req.body;

    if(!name){
        throw new BadRequestError("Please provide name");
    }
    
    const user = await User.create({...req.body});
    res.json({user: { name : user.name } });
}


module.exports = {
    register,
}