import React, { useState, useEffect } from "react";
import projectsPage from "../js/projectsPage.js";

//TODO: figure out how to deal with mustache template being sanitized
// import dompurify from "dompurify";

import "../css/projectsPage.css";
import "../css/bootstrap.min.css";
const Test = props => {
  const [page, setPage] = useState("");
  // const sanitizer = dompurify.sanitize;
  const getPage = () => {
    console.log("cLLING");

    return fetch("/users/page/test.html")
      .then(res => res.text())
      .then(res => {
        console.log(res);
        setPage(res);
        console.log();
      })
      .then(() => {});
  };

  useEffect(() => {
    getPage().then(() => {
      projectsPage.init();
    });
  }, [page]);

  return <div dangerouslySetInnerHTML={{ __html: page }} />;
};

export default Test;
