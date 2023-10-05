const User = require("../../databases/models/User")

const followController=async(req,res)=>{
   if(req.body.userId !== req.params.id){
    try{
        const user= await User.findById(req.params.id);
        const currentUser= await User.findById(req.body.userId);
        if(!user.followers.includes(req.body.userId)){
            await user.updateOne({$push:{followers:req.body.userId}})
            await currentUser.updateOne({$push:{followings:req.params.id}})
            res.status(200).json("User has been Followed")
        }
        else{
            res.status(403).json("You already follow the user")
        }
    }
    catch(err){
        res.status(500).json(err)
    }
   }
   else{
    res.status(403).json("You Can't Follow Yourself")
   }
}
const unfollowController=async(req,res)=>{
   if(req.body.userId !== req.params.id){
    try{
        const user= await User.findById(req.params.id);
        const currentUser= await User.findById(req.body.userId);
        if(user.followers.includes(req.body.userId)){
            await user.updateOne({$pull:{followers:req.body.userId}})
            await currentUser.updateOne({$pull:{followings:req.params.id}})
            res.status(200).json("User has been unfollowed")
        }
        else{
            res.status(403).json("You don't follow this user")
        }
    }
    catch(err){
        res.status(500).json(err)
    }
   }
   else{
    res.status(403).json("You Can't Follow Yourself")
   }
}

module.exports={followController,unfollowController}