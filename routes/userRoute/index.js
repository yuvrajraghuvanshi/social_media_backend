const {updateController, deleteController, getController} = require('../../controllers/userControllers');

const router=require('express').Router();

router.put('/:id',updateController);
router.delete('/:id',deleteController);
router.get('/:id',getController);

module.exports=router