const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// Comment routes

router.post('/', withAuth, async (req, res) => {
  console.log(
    'COMMENT ROUTE POST HAS BEEN INITIATED. STANDBY FOR POSTING-------------------------------------------'
  );
console.log(req.body);
  try {
    const newComment = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    // render
    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

// router.get('/:articleid/comment/:commentId', async (req, res) => {
//   try {

//     const commentData = await Comment.findAll({
//       where: { id: req.params.commentId}
//     });

//     // Serialize data so the template can read it
//     const comments = commentData.map((comment) => comment.get({ plain: true }));

//     // Pass serialized data and session flag into template
//     res.render('homepage', {
//       projects,
//       logged_in: req.session.logged_in
//     });
//     res.status(200).json(comments);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

module.exports = router;
