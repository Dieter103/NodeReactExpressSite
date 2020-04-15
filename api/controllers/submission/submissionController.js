let fetch = require("node-fetch");
const conn = require("../../mysql");
const bcrypt = require("bcrypt");
const ini = require("ini");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");

let submissionController = {
  submitForm: async formData => {
    let values = [];
    for (let key in formData) {
      if (key !== "attribute") {
        values.push(formData[key]);
      }
    }
    values.push(JSON.stringify(formData["attribute"]));
    console.log("this is data", values);
    return conn.query("CALL testschema.insertSubmissions (?)", [values]);
  },

  uploadFile: async file => {}
};

module.exports = submissionController;
