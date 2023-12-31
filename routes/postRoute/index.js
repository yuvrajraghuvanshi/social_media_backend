const { createPost, updatePost, deletePost, likePost, getPost, getPostTimeline, getUsersAllPosts } = require('../../controllers/postControllers');

const router=require('express').Router();

router.post('/create',createPost)
router.put('/:id',updatePost)
router.delete('/:id',deletePost)
router.put('/:id/like',likePost)
router.get('/:id',getPost)
router.get('/timeline/:userId',getPostTimeline)
router.get('/profile/:username',getUsersAllPosts)
module.exports=router;