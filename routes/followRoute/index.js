const { followController, unfollowController } = require('../../controllers/followControllers');

const router=require('express').Router();

router.put('/:id/follow',followController)
router.put('/:id/unfollow',unfollowController)
module.exports=router;