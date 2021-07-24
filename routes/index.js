var express = require('express');
var router = express.Router();
const postController = require('../controllers/postController');
const commentController = require('../controllers/commentController');
const adminController = require('../controllers/adminController');
const passport = require('passport');

/* GET home page. */
router.get('/', function(req, res) {
  res.end("Homepage - Don't need unless I want to supply user with info on the API")
});


// Routes for all posts
router.get('/posts', postController.posts_get);

router.post('/posts', postController.posts_create);


// Routes for specific posts
router.get('/posts/:postid', postController.posts_get_post);

router.put('/posts/:postid', postController.posts_edit_post);

router.delete('/posts/:postid', postController.posts_delete_post);

// Router to get comments for a specific post
router.get('/posts/:postid/comments', commentController.comments_get);

// Router to create a comment for a specific post
router.post('/posts/:postid/comments', commentController.comments_create);

// Route to delete a post under a specific comment - ADMIN only
router.delete('/posts/:postid/comments/:commentid', commentController.comment_delete);


// Routes for the admin
router.post('/admin/login', adminController.loginAdmin);

router.post('/admin/logout', adminController.logoutAdmin);

router.post('/admin/create', adminController.createAdmin);

router.get("/admin/protected", passport.authenticate('jwt', { session: false }), (req, res) => {
  return res.status(200).json( {message: "YAY! this is a protected Route"} )
})

module.exports = router;