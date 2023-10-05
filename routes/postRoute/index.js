const { createPost, updatePost, deletePost, likePost, getPost, getPostTimeline } = require('../../controllers/postControllers');

const router=require('express').Router();

router.post('/create',createPost)
router.put('/:id',updatePost)
router.delete('/:id',deletePost)
router.put('/:id/like',likePost)
router.get('/:id',getPost)
router.get('/timeline/all',getPostTimeline)
module.exports=router;