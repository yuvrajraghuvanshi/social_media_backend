const Post = require("../../databases/models/Post")
const User = require("../../databases/models/User")

const createPost= async(req,res)=>{
    const newPost=new Post(req.body);
    try{
       const post= await newPost.save();
        res.status(200).json(post)
    }
    catch(err){
        res.status(400).json(err)
    }
}


const updatePost=async(req,res)=>{
    try{
    const post=await Post.findById(req.params.id);
    if(!post){
        res.status(404).json("Post Not Found")
    }
    console.log({post});
    console.log(req.body)
    if(post.userId === req.body.userId){
        await post.updateOne({$set:req.body})
        res.status(200).json("Your Post has been Updated")
    }
    else{
        res.status(403).json("You can update only your post")
    }}
    catch(err){
        res.status(500).json(err)
    }
}
const deletePost=async(req,res)=>{
    try{
    const post=await Post.findById(req.params.id);
    if(!post){
        res.status(404).json("Post Not Found")
    }
    console.log({post});
    console.log(req.body)
    if(post.userId === req.body.userId){
        await post.updateOne({$set:req.body})
        res.status(200).json("Your Post has been Deleted")
    }
    else{
        res.status(403).json("You can delete only your post")
    }}
    catch(err){
        res.status(500).json(err)
    }
}
const likePost=async(req,res)=>{
    try{
    const post=await Post.findById(req.params.id);
    if(!post.likes.includes(req.body.userId)){
        await post.updateOne({$push:{likes:req.body.userId}})
        res.status(200).json("The Post has been Liked")
    }
    else{
       await post.updateOne({$pull:{likes:req.body.userId}});
       res.status(200).json("The post has been disliked")
    }}
    catch(err){
        res.status(500).json(err)
    }
}

const getPost=async(req,res)=>{
    try{
    const post=await Post.findById(req.params.id);
    if(!post){
        res.status(404).json("Post Not Found")
    }
   
        res.status(200).json(post)
   }
    catch(err){
        res.status(500).json(err)
    }
}
const getPostTimeline=async(req,res)=>{
    try{
        const currentUser=await User.findById(req.body.userId);
    const userPosts=await Post.find({userId:currentUser._id});
    const friendPosts= await Promise.all(currentUser.followings.map((friendId)=>{
        return Post.find({userId:friendId})
    }))
        res.json(userPosts.concat(...friendPosts))
   }
    catch(err){
        res.status(500).json(err)
    }
}
module.exports={createPost,updatePost,deletePost,likePost,getPost,getPostTimeline}