const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/:id:comment_id', withAuth, async (req, res) => {
    try {
      const newComment = await Comment.create({
        ...req.body,
        user_id: req.session.user_id,
      });
  
      res.status(200).json(newComment);
    } catch (err) {
      res.status(400).json(err);
    }
  });

  router.get('/:id/:comment_id', async (req, res) => {
    try {
      // Get all comments and JOIN with blog posts
      const commentData = await Comment.findAll({
        include: [
          {
            model: Comment,
            attributes: ['comment'],
          },
        ],
      });
  
      // Serialize data so the template can read it
      const blogPosts = blogPostData.map((blogPost) => blogPost.get({ plain: true }));
  
      // Pass serialized data and session flag into template
      res.render('homepage', { 
        blogPosts, 
        logged_in: req.session.logged_in 
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

  module.exports = router;