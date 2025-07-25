import user from "../models/users.js"

export function getAllUsers(req,res){
    user.userFindAll()
        .then(u=>{
            res.json(u)
        })
        .catch(error =>{
            res.status(500).json({error:error})
        })
}

export function userFindOne(req,res){
    const userid = req.params.id

    user.userFindOne(userid)
        .then(u=>{
            res.json(u)
        })
        .catch(error =>{
            res.status(500).json({error:error.message})
        })
}

export function userInsert(req,res){
    const {name, email, password ,register_time} = req.body
    user.userInsert(name,email,password,register_time)
        .then(u=>{
            res.json(u)
        })
        .catch(error =>{
            console.error("Error inserting user:", error); 
            res.status(500).json({error:error.message})
        })
}

export function userUpdate(req,res){
    const userid = req.params.id;
    const{ name, email, password } = req.body
    user.userUpdate(userid,name,email,password)
        .then(u=>{
            res.json(u)
        })
        .catch(error=>{
            console.error("Error inserting user:", error); 
            res.status(500).json({error:error.message})
        })
}

export function userDelete(req,res){
    const userid = req.params.id
    user.userDelete(userid)
        .then(u=>{
            res.json(u)
        })
        .catch(error=>{
            res.status(500).json({error:error.message})
        })


}