const router = require('express').Router();
const { Article } = require('../../models');
const withAuth = require('../../utils/auth');


// // Comment routes
// router.post('/:articleid/comment/', async (req, res) => {
//   try {
//     const newComment = await Comment.create({
//       ...req.body,
//       user_id: req.session.user_id,
//       article_id: req.params.articleid,
//     });

//     res.status(200).json(newComment);
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });

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



// router.get('/:id/:id', async (req, res) => {
//   try {
//     // Get all comments and JOIN with blog posts
//     const dbCommentData = await Comment.findAll();
//     const comments = dbCommentData.map((comment) =>
//       comment.get({ plain: true })
//     );
//     res.status(200).json(comments);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });

    
    
    
    // {
    //   include: [
    //     {
    //       model: Comment,
    //       attributes: ['comment'],
    //     },
    //   ],
    // });

//     // Serialize data so the template can read it
//     // const comments = commentData.map((article) => comment.get({ plain: true }));

//     // Pass serialized data and session flag into template
//     // res.render('homepage', { 
//     //   articles, 
//     //   logged_in: req.session.logged_in 
//     // });
//     res.status(200).json(commentData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// article post routes
router.post('/', withAuth, async (req, res) => {
  try {
    const newArticle = await Article.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newArticle);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updateArticle = await Article.update(
      {
        title: req.body.title,
        description: req.body.description,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json(updateArticle);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const articleData = await Article.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!articleData) {
      res.status(404).json({ message: 'No blog post found with this id!' });
      return;
    }

    res.status(200).json(articleData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
