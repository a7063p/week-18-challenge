const { User } = require('../models');

const userController = {
    
    //get all usernames
    getAllUser(req,res) {
        User.find({})
        .populate({
            path: 'thoughts',
            select: '-__v'
        })      
        .populate({
            path: 'friends',
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
        .populate({
            path: 'friends',
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
    // Add Friend
    addFriend({ params, body}, res ){
        User.findByIdAndUpdate(
            { _id: params.id },
            { $push: { friends: params.friendId } },
            { new: true }
        )
        .then (dbUserData => {
            if(!dbUserData) {
                res.status(404).json({ message: 'No user found with this ID'});
                return;
            }
            res.json(dbUserData)
        })
        .catch(err => {
            res.json(err)
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
    },
    removeFriend({ params }, res){
        User.findByIdAndUpdate(
            { _id: params.id },
            { $pull: { friends: params.friendId } },
            { new: true }
        )
        .then(dbUserData => {
            res.json(dbUserData)
          })
          .catch(err => {
            res.json(err)
          })
    }    
};

module.exports = userController;