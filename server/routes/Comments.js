const express = require('express');
const router = express.Router();
const { Comments } = require('../models');
const { verifyToken } = require('../middlewares/auth');


router.get('/:postId', async (req, res) => {
    const postId = req.params.postId;
    const comments = await Comments.findAll({ where: { postId } });

    res.json(comments);
});

router.post('/', verifyToken, async (req, res) => {
    try {
        const comment = req.body;
        const result = await Comments.create(comment);
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}
)

module.exports = router;