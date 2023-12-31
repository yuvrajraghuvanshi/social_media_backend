const {updateController, deleteController, getController} = require('../../controllers/userControllers');

const router=require('express').Router();

router.put('/:id',updateController);
router.delete('/:id',deleteController);
router.get('/',getController);

module.exports=router