const express = require('express')
const bcrypt = require('bcrypt')
const userList = require('./model/user.json')
const path = require('path')
const app = express()
app.use(express.json())

app.post("/users/register", async (req,res,next)=>{
    try {
        const hashedPassword = await bcrypt.hash(req.body.password,10);
        const new_user = {"username":req.body.username,"password":hashedPassword}
        userList.push(new_user)
        console.log(userList)
        res.json({"message":"User added Sussessfully"})
    } catch (error) {
        res.status(500).send("failed to add user")
    }
    
})


app.post("/users/login",async (req,res)=>{
   
    const user = userList.find(user=>user.username === req.body.username);

    if(user == null){
        return res.status(400).json({"message":"Can't find user"})
    }
    console.log(user)

    try {
        
        if(await bcrypt.compare(req.body.password,user.password)){
            console.log("login success")
            res.json({"message":"login success"})
        }else{
            console.log("invalid password")
            res.json({"message":"invalid password"})
        }
   } catch (error) {
    res.status(500).send("error occured")
   }
})


// console.log(user)
app.listen(3000,()=>{console.log("server listening on port :", 3000)})
