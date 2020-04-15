let fetch = require("node-fetch");
const conn = require("../mysql");
const bcrypt = require("bcrypt");
const ini = require("ini");
const fs = require("fs");
const jwt = require("jsonwebtoken");

/**
 * Controller for users
 * @type {{getUsers: (function(): []), login: usersController.login, validate: (function(*=): boolean)}}
 */
let usersController = {
  /**
   * Get all users
   * @returns {Promise<[]>}
   */
  getUsers: async function() {
    let users = [];
    let res = await conn.query("SELECT * FROM users.user");

    res.forEach(user => {
      users.push(user);
    });
    console.log(users);
    console.log("doin thiat");
    return users;
  },

  /**
   * Authorize user to log in
   * @param username
   * @param password
   * @returns {Promise<undefined|*|boolean>}
   */
  login: async (username, password) => {
    //validate no empty fields
    if (!username || !password) {
      return false;
    }

    let res = await conn.query(
      "SELECT * FROM users.user WHERE username = ?",
      username
    );

    let testUpperCase = await conn.query(
      "SELECT * FROM vid_Demo.Project",
      username
    );

    console.log(testUpperCase);

    // no users found
    if (res.length === 0) {
      return false;
    }

    let user = res[0];
    let hashedPassword = user.password;

    //There is a difference in the first few characters of the hash when encrypted in PHP vs Node
    hashedPassword = hashedPassword.replace(/^\$2y(.+)$/i, "$2a$1");

    //decrypt the password and see if it matches what they entered
    let matching = await bcrypt.compare(password, hashedPassword);
    if (matching) {
      //parse config file
      const config = ini.parse(fs.readFileSync("config.ini", "utf-8"));

      const payLoad = {
        //Date.now() returns ms since jan 1 1970. Divide to get secs, add 1 hr in seconds
        exp: Math.floor(Date.now() / 1000) + 60 * 60,
        ID: user.ID,
        username: user.username,
        algorithm: "HS256"
      };

      //sign token and return
      let token = jwt.sign(payLoad, config.secret.jwt);

      console.log(token);
      return token;
    } else {
      console.log("login incorrect");
      return false;
    }
  },

  /**
   * Validate that they are logged in when the page is reloaded. If so then let them access the dashboard.
   * @param conn
   * @param token
   * @returns {Promise<string>}
   */
  validate: async token => {
    console.log("dis a token ", token);
    //take bearer out of the token
    // token = token.slice(7, token.length);
    let tokenInformation = "";
    //verify the token
    const config = ini.parse(fs.readFileSync("config.ini", "utf-8"));
    if (config.secret.jwt.indexOf("$") !== -1) {
      config.secret.jwt = process.env[config.secret.jwt.substring(1)];
    }
    let validated = await jwt.verify(token, config.secret.jwt);
    console.log("validated? :", validated);

    console.log(tokenInformation);
    return validated ? validated : false;
  }
};

module.exports = usersController;
