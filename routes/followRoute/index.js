const { followController, unfollowController, getFollowers } = require('../../controllers/followControllers');

const router=require('express').Router();

router.put('/:id/follow',followController)
router.put('/:id/unfollow',unfollowController)
router.get('/friends/:userId',getFollowers)
module.exports=router;