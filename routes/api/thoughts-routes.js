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

router.route('/').get(getAllThoughts);

router.route('/:userId').post(createThoughts);

router.route('/:thoughtId').get(getThoughtsById).put(updateThoughts);

router.route('/:userId/:thoughtId').delete(deleteThoughts);

router.route('/:thoughtId/:reactions').post(addReaction);

router.route('/:thoughtId/:reactions/:reactionId').delete(deleteReaction);

module.exports = router;