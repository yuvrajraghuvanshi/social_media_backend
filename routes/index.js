
const router=require('express').Router();
const authRoutes=require('./authRoute/index')
const userRoute=require('./userRoute/index')
const followRoute=require('./followRoute/index')
const postRoute=require('./postRoute/index')

router.use('/',authRoutes)


router.use('/update',userRoute);
router.use('/delete',userRoute);
router.use('/users',userRoute);



router.use('/users',followRoute)

router.use('/posts',postRoute);


module.exports=router
