const express = require('express');
const server = express();
const PORT = 5000;
const bodyParser = require('body-parser');
server.use(bodyParser.json());
const bcrypt = require('bcryptjs');
const Cryptowatch = require('./dbHelpers');

server.get('/',(req,res)=>{
    res.status(200).json({message:'Welcome to the server'});
});

server.get('/users',(req,res)=>{
    Cryptowatch.getUsers()
    .then(users=>{
        res.status(200).json(users)
    })
    .catch(error=>{
        res.status(500).json({message:`Cannot get users`})
    })
});

server.get('/users/:username',(req,res)=>{
    const {username} = req.params;
    Cryptowatch.getUserByUsername(username)
    .then(user=>{
        if (user) {
            res.status(200).json(user)
        } else {
            res.status(404).json({message:`User not found`})
        }
    })
    .catch(error=>{res.status(500).json(error)})
});

server.post('/users/register',(req,res)=>{
    const {username,password} = req.body;
    if (!(username && password)) {
        return res.status(400).json({message:'Username & password required'});
    }
    req.body.password = bcrypt.hashSync(req.body.password,13);
    Cryptowatch.register(req.body)
    .then(user=>{
        res.status(200).json(user)
    })
    .catch(error=>res.status(500).json(error))
});

server.post('users/login',(req,res)=>{
    const {username,password} = req.body;
    Cryptowatch.getUserByUsername(username,password)
    .then(user=>{
        if (user && bcrypt.compareSync(password,user.password)) {
            res.status(200).json(user)
        } else {
            res.status(404).json({message:`Invalid credentials`})
        }
    })
    .catch(error=>{res.status(500).json(error)})
});

server.delete('/users/:id',(req,res)=>{
    const {id} = req.params;
    Cryptowatch.deleteAccount(id)
    .then(count=>{
        if (count > 0) {
            res.status(200).json({message:'Account successfully deleted'})
        } else {
            res.status(404).json({message:'Cannot find account'})
        }
    })
    .catch(error=>{res.status(500).json(error)})
})

server.listen(PORT,()=>{
    console.log(`Server running on PORT ${PORT}`);
});
