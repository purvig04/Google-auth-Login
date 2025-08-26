require("dotenv").config();

const express = require("express");
const router = express.Router();
const axios = require("axios");

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = "http://localhost:3000/auth/login/callback";

router.get("/login", (req, res) => {
  res.send("Login page");
});

router.get("/", (req, res) => {
  res.send("Home page");
});

// will redirect to google login page
router.get("/auth/login", (req, res) => {
  try {
    const uri = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=profile%20email`;
    res.redirect(uri);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
});

//callback after google login
router.get("/auth/login/callback", async (req, res) => {
  const { code } = req.query;

  try {
    const params = new URLSearchParams({
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      code,
      redirect_uri: REDIRECT_URI,
      grant_type: "authorization_code",
    });
    console.log(params);

    const { data } = await axios.post(
      "https://oauth2.googleapis.com/token",
      params.toString(),
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );
    console.log(data);

    //fetching access_token and id_token from the data
    const { access_token, id_token } = data;

    //this gives google authentication token of that user ie this is authenticated user
    //and fetches the user information using acces_token
    const { data: profile } = await axios.get(
      "https://www.googleapis.com/oauth2/v1/userinfo",
      {
        headers: { Authorization: `Bearer ${access_token}` },
      }
    );

    res.redirect("/");
  } catch (error) {
    console.error("Error:", error.response.data.error);
    res.redirect("/login");
  }
});

router.get("/logout", (req, res) => {
  res.redirect("/login");
});

module.exports = router;
