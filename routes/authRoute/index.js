
const authControllers=require('../../controllers/authControllers/index')
const router=require('express').Router();

router.post('/login',authControllers.authController)
router.post('/signup',authControllers.signupController)
module.exports=router
