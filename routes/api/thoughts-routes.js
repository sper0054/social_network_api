const router = require('express').Router();
const {
    getAllThoughts,
    getThoughtsById,
    createThoughts,
    updateThoughts,
    deleteThoughts,
    addReaction,
    deleteReaction
} = require('../../controllers/thoughts-controller');

// /api/thoughts
router
    .route('/')
    .get(getAllThoughts);

// /api/thoughts/<thoughtid> 
router
    .route('/:id')
    .get(getThoughtsById)
    .put(updateThoughts)
    .delete(deleteThoughts);

// /api/thoughts/<userid>
router
    .route('/:userId')
    .post(createThoughts);

// /api/thoughts/<thoughtId>/reactions 
router
    .route('/:thoughtId/reactions')
    .post(addReaction);

// /api/thoughts/<thoughtid>/<reactionid> 
router
    .route('/:thoughtId/reactions/:reactionId')
    .delete(deleteReaction);


module.exports = router;