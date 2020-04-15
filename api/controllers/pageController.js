let fetch = require("node-fetch");
const fs = require("fs");

const pageController = {
  getPage: async href => {
    let result = await fs.readFileSync(href, "utf8", (err, data) => {
      if (err) throw err;
      else return data;
    });
    return result;
  }
};

module.exports = pageController;
