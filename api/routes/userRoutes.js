let express = require("express");
let router = express.Router();
let multer = require("multer");
const ini = require("ini");
const fs = require("fs");
const upload = multer();
let usersController = require("../controllers/usersController");
let pageController = require("../controllers/pageController");

router.post("/login", upload.none(), async (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  let token = await usersController.login(username, password);

  if (!token) {
    //set cookie to httpOnly
    const cookieOptions = { httpOnly: true, expires: 0 };

    //save token to cookie
    res.cookie("userJwt", token, cookieOptions);

    //return success message with token just for testing purposes
    //TODO: don't return the token
    await res.json({
      success: true,
      msg: "Authentication successful!"
      // token: token
    });
  } else {
    res.clearCookie("userJwt");
    res.status(400).json({ msg: `Invalid Username/Password` });
  }
});

/**
 * Router for logging out user
 *
 */
router.post("/logout", upload.none(), async (req, res) => {
  const config = ini.parse(fs.readFileSync("config.ini", "utf-8"));

  const token = req.cookies.userJwt;
  const payload = token.verify(token, config.secret.jwt);

  //TODO: Implement a check to db to see if user is logged in

  res.clearCookie("userJwt");

  res.status(200);
});

/**
 * validate that the user is logged in.
 * TODO: Make table to check against
 */
router.get("/validate", async (req, res) => {
  let token = req.cookies.userJwt;
  let tokenInformation = await usersController.validate(token);
  if (tokenInformation) await res.json(tokenInformation);
  else res.status(400);
});

router.get("/page/:href", async (req, res) => {
  console.log("getting");
  let html = await pageController.getPage("../src/html/projectsPage.mustache");
  // console.log(html);
  res.send(html);
});

module.exports = router;
