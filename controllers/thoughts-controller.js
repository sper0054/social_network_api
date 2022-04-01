const { Thoughts, Users } = require('../models');

const thoughtsController = {

    //get all thoughts
    getAllThoughts(req, res) {
        Thoughts.find({})
            .select('-__v')
            .then(dbThoughtsData => res.json(dbThoughtsData))
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },

    //get thought by id
    getThoughtsById({ params }, res) {
        Thoughts.findOne({ _id: params.id })
            .then((dbThoughtsData) => {
                if (!dbThoughtsData) {
                    res.status(404).json({ message: 'No thoughts found with this id!' });
                    return;
                }
                res.json(dbThoughtsData);
            })
            .catch((err) => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    //create a new thought
    createThoughts({ body }, res) {
        console.log(body);
        Thoughts.create(body)
            .then(((ThoughtsData) => {
                return Users.findOneAndUpdate(
                    { _id: body.userId }, 
                    { $push: { thoughts: ThoughtsData._id } },
                    { new: true }
                    );
            })
            .then(dbUsersData => {
                if(!dbUsersData) {
                    res.status(404).json({ message: 'No user found!' });
                    return;
                }
                res.json(dbUsersData)
            })
            .catch((err) => res.json(err));
    },

    //update thought by id
    updateThoughts({ params, body }, res) {
        Thoughts.findOneAndUpdate({ _id: params.id }, body, { new: true })
            .then((dbThoughtsData => {
                if (!dbThoughtsData) {
                    res.status(404).json({message: 'No thoughts found with this id!' });
                    return;
                }
                res.json(dbThoughtsData);
            })
            .catch((err) => res.status(400).json(err));
    },

    //delete thought by id
    deleteThoughts({ params }, res) {
        Thoughts.findOneAndDelete({ _id: params.id })
            .then(dbThoughtsData => res.json(dbThoughtsData))
            .catch(err => res.json(err));
    },

    //add reaction
    addReaction({ params, body }, res) {
        Thoughts.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: {reactions: body } },
            { new: true, runValidators: true }
            )
            .populate({
                path: 'reactions',
                select: '-__v'
            })
            .select('-__v')
            .then(dbThoughtsData => {
                if (!dbThoughtsData) {
                    res.status(404).json({message: 'No thoughts found with this id!' });
                    return;
                }
                res.json(dbThoughtsData);
            })
            .catch(err => res.json(err))
    },

    //delete reaction by id
    deleteReaction({ params }, res) {
        Thoughts.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId } } },
            { new : true }
            )
            .then(dbThoughtsData => res.json(dbThoughtsData))
            .catch(err => res.json(err));
    }
};

module.exports = thoughtsController;