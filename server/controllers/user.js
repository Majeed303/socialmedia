import { User } from "../models/User.js";

//read
export const getUser = async (req, res) =>{
    console.log(req.params.id)
    try{
        const userId = req.params.id; 
        console.log("id",userId)
        const user = await User.findById(userId);
        res.status(200).json(user);
    }catch(err){
         console.log(err)
        res.status(404).json({message: err.message});
    }
}

export const getUserFriends = async (req ,res) =>{
    try{
    const { id } = req.params;
    const user = await User.findById(id);

    const friends = await Promise.all(
        user.friends.map((id)=> User.findById(id))
    );
    const formattedFriends = friends.map(
        ({_id,firstName, lastName, occupation, location, picturePath}) =>{
            return {_id , firstName, lastName, occupation, location, picturePath};
        }
    );
    res.status(200).json(formattedFriends);
    }catch(err){
        res.status(404).json({message : err.message});
    }
}

//uptate
export const addRemoveFriend = async (req , res) =>{
    try{
       const { id , friendId } = req.params;
       if (id === friendId) {
        return res.status(400).json({ msg: "Cannot add/remove yourself as a friend." });
      }
       const user = await User.findById(id);
       const friend = await User.findById(friendId)

       if (!user) {
        return res.status(404).json({ msg: "User not found" });
      }

    

       if(user.friends.includes(friendId)){
        user.friends = user.friends.filter((id)=> id !== friendId);
        friend.friends = friend.friends.filter((id) => id !==id );

       }else{
         user.friends.push(friendId);
         friend.friends.push(id);
       }
       await user.save();
       await friend.save();

       const friends = await Promise.all(
        user.friends.map((id)=> User.findById(id))
      );

      const formattedFriends = friends.map(
        ({_id,firstName, lastName, occupation, location, picturePath}) =>{
            return {_id , firstName, lastName, occupation, location, picturePath};
        }
    );
          res.status(200).json(formattedFriends);

    }catch(err){
        res.status(404).json({message : err.message});
    }
}

export const editusers = async (req , res) =>{
    try{
         console.log(req.body)
       const {_id ,firstNamee, lastNamee , emaile, locatione , occupatione} = req.body ;
       const findUser = await User.findById(_id)
       if(!findUser) {
        return res.status(404).json({ message: 'User not found' });
       }
    // Update user properties
    findUser.firstName = firstNamee;
    findUser.lastName = lastNamee;
    findUser.email = emaile;
    findUser.location = locatione;
    findUser.occupation = occupatione;

    // Save the updated user
    await findUser.save();
    return res.status(200).json({ message: 'User updated successfully', user: findUser });

    }catch(err){
        res.status(500).json({ message: 'Internal server error' });
    }
}