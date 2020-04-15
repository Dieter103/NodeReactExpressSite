import React, { useState, useEffect } from "react";
// Import React FilePond
import { FilePond, registerPlugin } from "react-filepond";
// import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";
// import FilePondPluginImageCrop from "filepond-plugin-image-crop";
// import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

// Import FilePond styles
import "filepond/dist/filepond.min.css";
import { TextField, Hidden } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Fade from "@material-ui/core/Fade";
import Paper from "@material-ui/core/Paper";
import Slide from "@material-ui/core/Slide";
import Card from "./Card";
// Register the plugins
// FilePond.registerPlugin(FilePondPluginFileValidateSize);
// registerPlugin(FilePondPluginImageCrop);

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  },
  leftIcon: {
    marginRight: theme.spacing(1)
  },
  rightIcon: {
    marginLeft: theme.spacing(1)
  },
  iconSmall: {
    fontSize: 20
  },
  input: {
    marginBottom: theme.spacing(2)
  },

  invalid: {
    color: "red",
    fontSize: "12px"
  },
  valid: {
    color: "green",
    fontSize: "12px"
  },
  root: {
    height: 180
  },
  container: {
    display: "flex",
    height: 900
  },
  paper: {
    margin: theme.spacing(1),
    height: "fit-content"
  },
  svg: {
    width: 100,
    height: 100
  },
  polygon: {
    fill: theme.palette.common.white,
    stroke: theme.palette.divider,
    strokeWidth: 1
  }
}));

// FilePond.setOptions({
//   server: {
//     process: "/submission/process",
//     fetch: null,
//     revert: null
//   }
// });

const Form = props => {
  const classes = useStyles();
  let options = {
    process: "/submission/process",
    fetch: null,
    revert: "/submission/revert"
  };
  const [files, setFiles] = useState("");
  // const sanitizer = dompurify.sanitize;

  useEffect(() => {}, []);

  let handleSubmit = async event => {
    event.preventDefault();
    console.log(event.target);
    let formData = new FormData(event.target);
    [...formData.values()].forEach(value => {
      console.log(value);
    });

    try {
      const res = await fetch("/submission/submit", {
        method: "POST",
        body: formData
      });
      if (res.status === 200) {
        const token = await res.json();
        console.log(token);
        // setUser("Logged In");
        // setStatus(true);
        // props.isAuth(true);
      } else {
        // setUser("Invalid Username/Password");
        // setStatus(false);
        // props.isAuth(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <TextField
        name="test1"
        label="Test 1"
        className={classes.input}
        fullWidth={true}
      >
        {" "}
      </TextField>
      <TextField
        name="test2"
        label="Test 2"
        className={classes.input}
        fullWidth={true}
      >
        {" "}
      </TextField>
      <TextField type="hidden" name="attribute[0][id]" value="0" />
      <TextField
        name="attribute[0][value]"
        label="Attr 1"
        className={classes.input}
        fullWidth={true}
      >
        {" "}
      </TextField>
      <TextField
        name="attribute[1][value]"
        label="Attr 2"
        className={classes.input}
        fullWidth={true}
      >
        {" "}
      </TextField>
      <FilePond
        // ref={ref => (pond = ref)}
        files={files}
        allowMultiple={true}
        maxFiles={3}
        server={options}
        name="images"
        // oninit={() => this.handleInit()}
        onupdatefiles={fileItems => {
          // Set currently active file objects to this.state
          setFiles({
            files: fileItems.map(fileItem => fileItem.file)
          });
        }}
      />
      <Button variant="contained" type="submit" className={classes.button}>
        Submit
      </Button>
      <Card />
    </form>
  );
};

export default Form;
