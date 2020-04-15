const test = {
  init() {
    console.log(
      "heeeeeeeeeeey-------------------------------------------------------------"
    );
    this.testSetDiv();
    this.cacheDoM();
    this.bindEvents();
  },
  cacheDoM() {
    this.testDiv = document.getElementById("testDiv");
  },
  bindEvents() {
    this.testDiv.addEventListener("click", event => {
      event.target.innerHTML = "pshhhh";
    });
  },
  testSetDiv() {
    document.getElementById("testDiv").innerHTML = "tetetetetetette";
  }
};

module.exports = test;
