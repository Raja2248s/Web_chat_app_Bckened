const messageModel = require("../model/messageModel");

module.exports.addMessage=async(req,res,next)=>{
    try{
         const {from , to , message} = req.body;
         const data = await messageModel.create({
            message:{text:message},
            users:[from , to],
            sender: from,
         });
        
         if(data){
            
            return res.json({msg:"Message added sucessfully,"});
         }
         else{
            return res.json({msg:"Failed to add Message t dtatabase"})
         }
    }
    catch(ex){
        next(ex);
    }
};


module.exports.getAllMessage=async(req,res,next)=>{
   try{ 
     
       const {from , to} = req.body;  
      
       const messages = await messageModel.find({
         users:{
            $all:[from , to],
            
         },
       }).sort({updatedAt:1});
     
     

       const projectMessages = messages.map((msg) =>{
         return {
            fromSelf:msg.sender.toString() === from,
            message:msg.message.text,
         }
       })
       
       res.json(projectMessages);
   }
   catch(ex){
      console.error("Error in getAllMessage:", ex);
      res.status(500).json({ error: "Internal Server Error" });
      next(ex);
   }
}


