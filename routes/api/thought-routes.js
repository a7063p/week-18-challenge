const router = require('express').Router();
const { 
    addThought, 
    removeThought, 
    getAllThought,
    addReaction,
    removeReaction,
    getThoughtById,
    updateThought   
} = require('../../controllers/thought-controller');

router
    .route('/') 
    .get(getAllThought);

//  /api/thoughts/<userId>
router
    .route('/:userId')
    .post(addThought);

// /api/thoughts/<userId>/<thoughtId>
router
    .route('/user/:userId/thought/:thoughtId')
    .post(addReaction)
    .delete(removeThought);

// /api/thoughts/<userId>/<thoughtId>/<reactionId>
router
.route('/user/:userId/thought/:thoughtId/reaction/:reactionId')
.delete(removeReaction);

router
.route('/:id')
.get(getThoughtById)
.put(updateThought)

module.exports = router;