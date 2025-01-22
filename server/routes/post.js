const express = require('express');

const router = express.Router();

const { Posts } = require('../models');
const { verifyToken } = require('../middlewares/auth');

router.get('/', async (req, res) => {
    //res.json({ message: 'Hello World' });
    const listOfPosts = await Posts.findAll();
    res.json(listOfPosts);
});

router.post('/', verifyToken, async (req, res) => {
    try {
        const post = req.body;
        const result = await Posts.create(post);
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to create post' });
    }
});
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const post = await Posts.findByPk(id);
        if (!post) {
            res.status(404).json({ message: 'Post not found' });
        } else {
            res.json(post);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to retrieve post' });
    }
});

module.exports = router;