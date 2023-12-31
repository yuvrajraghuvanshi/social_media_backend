const User = require("../../databases/models/User");
const bcrypt= require('bcryptjs')
const updateController = async (req, res) => {

  if (req.body.userId === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        req.body.password = await bcrypt.hash(req.body.password, 10);
      } catch (error) {
        res.status(500).json(error);
      }
      try {
        const updateUser = await User.findByIdAndUpdate(req.params.id, {
          $set: req.body,
        });
        return res.status(200).json("User details has been updated");
      } catch (error) {
        res.status(500).json(error);
      }
    } 
  } else {
    res.status(403).json("You can only update only your account");
  }
};

const deleteController=async(req,res)=>{
    
  if (req.body.userId === req.params.id || req.body.isAdmin) {
   
      try {
        const updateUser = await User.findByIdAndDelete(req.params.id);
        return res.status(200).json("User deleted successfully");
      } catch (error) {
        res.status(500).json(error);
      }
    
  } else {
    res.status(403).json("You can only delete your account");
  }
}
const getController=async(req,res)=>{
    
   const userId=req.query.userId;
   const username=req.query.username;
      try {
        const user = userId? await User.findById(userId):await User.findOne({username:username})
        const {
          password, updatedAt, ...other
        }=user._doc
        return res.status(200).json(other);
      } catch (error) {
        res.status(500).json(error);
      }
}
module.exports = {updateController,deleteController,getController};
