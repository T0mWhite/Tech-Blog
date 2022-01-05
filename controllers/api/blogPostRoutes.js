const router = require('express').Router();
const { BlogPost } = require('../../models');
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');


// Comment routes
router.post('/:id/comment/', async (req, res) => {
  try {
    const newComment = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
      blogPost_id: req.params.id,
    });

    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/:id/comment/:id', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const commentData = await Comment.findAll({
      // include: [
      //   {
      //     model: blogPost,
      //     attributes: ['comment'],
      //   },
      // ],
    });

    // Serialize data so the template can read it
    const comments = commentData.map((comment) => comment.get({ plain: true }));

    // Pass serialized data and session flag into template
    // res.render('homepage', { 
    //   projects, 
    //   logged_in: req.session.logged_in 
    // });
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json(err);
  }
});



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

    
    
    
//     {
//       include: [
//         {
//           model: Comment,
//           attributes: ['comment'],
//         },
//       ],
//     });

//     // Serialize data so the template can read it
//     // const comments = commentData.map((blogPost) => comment.get({ plain: true }));

//     // Pass serialized data and session flag into template
//     // res.render('homepage', { 
//     //   blogPosts, 
//     //   logged_in: req.session.logged_in 
//     // });
//     res.status(200).json(commentData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// blog post routes
router.post('/', withAuth, async (req, res) => {
  try {
    const newBlogPost = await BlogPost.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newBlogPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updateBlogPost = await BlogPost.update(
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
    res.status(200).json(updateBlogPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const blogPostData = await BlogPost.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!blogPostData) {
      res.status(404).json({ message: 'No blog post found with this id!' });
      return;
    }

    res.status(200).json(blogPostData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
