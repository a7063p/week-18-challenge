const { User } = require('../models');

const userController = {
    
    //get all usernames
    getAllUser(req,res) {
        User.find({})
        .populate({
            path: 'thoughts',
            select: '-__v'
        })      
        .select('-__v')
        .sort({ _id: -1 })
        .then(dbUserData => {
            //  if no users are found, send 404
            if(!dbUserData) {
                res.status(404).json({message: 'no users found!'});
                return;
            }
            res.json(dbUserData)            
        })
        .catch(err => {
            console.log(err);
            res.status(err);
        });
    },

    // get one username
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .then(dbUserData => {

            //  if no users are found, send 404
            if(!dbUserData) {
                res.status(404).json({message: 'no users found with this ID!'});
                return;
            }
            res.json(dbUserData)            
        })
        .catch(err => {
            console.log(err);
            res.status(err);
        });
    },

    // Create Username
    createUser({ body }, res) {
        User.create(body)        
        .then(dbUserData => {
            res.json(dbUserData)
        })
        .catch(err => {
            console.log(err);
            res.status(err);
        })
    },

    // update Username by id
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, {new: true})
        .then(dbUserData => {
            //  if no users are found, send 404
            if(!dbUserData) {
                res.status(404).json({message: 'no users found with this ID!'});
                return;
            }
            res.json(dbUserData)            
        })
        .catch(err => {
            console.log(err);
            res.status(err);
        });
    },

    deleteUser({ params},res){
        User.findOneAndDelete({ _id:params.id })
        .then(dbUserData => {
            //  if no users are found, send 404
            if(!dbUserData) {
                res.status(404).json({message: 'no user found with this ID!'});
                return;
            }
            res.json(dbUserData)            
        })
        .catch(err => {
            console.log(err);
            res.status(err);
        });        
    }    
};

module.exports = userController;