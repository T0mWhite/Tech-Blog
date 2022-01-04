const sequelize = require('../config/connection');
const { User, BlogPost, Comment } = require('../models');

const userData = require('./userData.json');
const blogPostData = require('./blogPostData.json');
const commentData = require('./commentData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const blogPost of blogPostData) {
    await BlogPost.create({
      ...blogPost,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  // const blogPosts = await Comment.bulkCreate(blogPostData, {
  //   individualHooks: true,
  //   returning: true,
  // });
  
    for (const comment of commentData) {
      await Comment.create({
        ...comment,
        user_id: users[Math.floor(Math.random() * users.length)].id,
      });
    }

    // for (const blogPost of commentData) {
    //   await Comment.create({
    //     ...comment,
    //     blog_post_id: blogPost.id,
    //   });
    // }
  
  process.exit(0);
};

seedDatabase();
