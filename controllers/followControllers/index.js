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
        console.err(err)
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

const getFollowers=async(req,res)=>{
     try{
         const user= await User.findById(req.params.userId);
       const friends=await Promise.all(
        user.followings.map(friendId=>{
            return User.findById(friendId)
        })
       )
       let friendList=[];
       friends.map(friend=>{
        const {_id,username,profilePicture}=friend;
        friendList.push({_id,username,profilePicture})
       })
       res.status(200).json(friendList)
     }
     catch(err){
         res.status(500).json(err)
     }
    
 }
module.exports={followController,unfollowController,getFollowers}