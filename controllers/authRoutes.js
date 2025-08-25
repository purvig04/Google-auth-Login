require("dotenv").config();

const express = require("express");
const router = express.Router();


const CLIENT_ID= process.env.CLIENT_ID;
const REDIRECT_URI= 'https://localhost:3000/auth/login/callback';

router.get("/", (req, res) => {
  res.send("Home page");
});

router.get("/auth/login", (req, res) => {
    const uri = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=profile%20email`
    res.redirect(uri);
});

router.get('/auth/login/callback',(req,res) =>{
    const {code} = req.query;
    
})

module.exports = router;
