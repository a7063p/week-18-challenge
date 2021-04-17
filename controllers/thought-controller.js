//const { Schema, model } = require('mongoose');
const { User, Thought } = require('../models');


const thoughtController = {
  getAllThought(req,res){
    Thought.find({})
  
     .then(dbThoughtData => {
      if(!dbThoughtData){
        res.status(404).json({ message: 'There are no current thoughts'})
        return;
      }
      res.json(dbThoughtData)
    })
    .catch(err => {
      res.status(err)
    })
  },

  // add thought to User
  addThought({ params, body }, res) {
    console.log(body);
    Thought.create(body)
    .then(({ _id }) => {
     return User.findOneAndUpdate(
       { _id: params.userId },
       { $push: { thoughts: _id }},
       { new: true }
     );
    })    
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({message: 'No user with this ID found for the thought'});
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => {
      res.json(err)
    });

  },
  // add reaction
  addReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $push: { reactions: body } },
      { new: true }
    )
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No user with this ID!' });
        return;
      }
      res.json(dbUserData)
    })
    .catch(err => res.json(err));
  },

  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.id })
    .populate({ 
      path: 'reactions',
      select: '-__v'
    })
    .then(dbThoughtData => {
      if(!dbThoughtData) {
        res.status(404).json({ message: 'there is no thought with that ID!'});
        return;
      }
      res.json(dbThoughtData)
    })
    .catch(err => {
      res.json(err)
    })
  },

  // update Thought

  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.id }, body, {new: true})
    .then(dbThoughtData => {
      if(!dbThoughtData){
        res.status(404).json({ message: 'no thoughts with this ID found'});
        return;
      }
      res.json(dbThoughtData)
    })
    .catch(err => {
      res.json(err)
    })
  },

  // remove Thought
  removeThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.thoughtId })
      .then(deletedThought => {
        if (!deletedThought) {
          return res.status(404).json({ message: 'No thought with this id!' });
        }
        return User.findOneAndUpdate(
          { _id: params.userId },
          { $pull: { thoughts: params.thoughtId } },
          { new: true }
        );
      })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No User found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
  },
  // remove Reaction //look at this for comments with delete user........//
  removeReaction ({ params }, res ) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionId: params.reactionId } } },
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

module.exports = thoughtController;