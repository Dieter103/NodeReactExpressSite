import React, { useState, useEffect } from "react";
// Import React FilePond
import { FilePond, registerPlugin } from "react-filepond";
// import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";
// import FilePondPluginImageCrop from "filepond-plugin-image-crop";
// import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

// Import FilePond styles
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
import clsx from "clsx";

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
    display: "flex"
    // height: 900
  },
  paper: {
    margin: theme.spacing(1),

    height: "fit-content",
    opacity: 0,
    position: "relative",
    right: 0,
    transition: theme.transitions.create(
      ["border-color", "color", "opacity", "right", "left"],
      {
        duration: "0.3s"
      }
    )
  },
  setRight: {
    right: "-30px"
  },
  setLeft: {
    right: "30px"
  },
  visible: {
    margin: theme.spacing(1),
    right: 0,

    height: "fit-content",
    opacity: 1
  },
  visibleRight: {},
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

const Card = props => {
  const classes = useStyles();
  let options = {
    process: "/submission/process",
    fetch: null,
    revert: "/submission/revert"
  };

  useEffect(() => {}, []);
  const [checked, setChecked] = React.useState(false);
  const [right, setRight] = React.useState(false);
  const [left, setLeft] = React.useState(false);
  const [visible, setVisible] = React.useState(true);

  const handleChange = () => {
    setChecked(prev => !prev);
  };
  const handleButtonClick = (direction, evt) => {
    if (direction === "right") {
      setLeft(true);
      setVisible(prev => !prev);

      setTimeout(() => {
        setLeft(false);
        setRight(true);
        setTimeout(() => {
          setVisible(prev => !prev);
        }, 300);
        console.log(direction);
      }, 320);
    } else {
      console.log(direction);

      setRight(true);
      setVisible(prev => !prev);
      console.log(right);
      setTimeout(() => {
        setRight(false);
        setLeft(true);
        setTimeout(() => {
          setVisible(prev => !prev);
          setLeft(false);
        }, 300);
      }, 320);
    }
  };

  return (
    <div>
      <FormControlLabel
        control={<Switch checked={checked} onChange={handleChange} />}
        label="Show"
      />
      <div className={classes.container}>
        {/*<Fade in={checked}>*/}
        <Paper
          elevation={4}
          className={clsx(classes.paper, checked && classes.visible)}
        >
          <svg className={classes.svg}>
            <polygon
              points="0,100 50,00, 100,100"
              className={classes.polygon}
            />
          </svg>
        </Paper>
        <Button
          variant="outlined"
          className={classes.button}
          onClick={handleButtonClick.bind(this, "left")}
        >
          {"<"}
        </Button>
        <Paper
          elevation={4}
          className={clsx(
            classes.paper,
            visible && classes.visible,
            right && classes.setRight,
            left && classes.setLeft
          )}
        >
          <svg className={classes.svg}>
            <polygon
              points="0,100 50,00, 100,100"
              className={classes.polygon}
            />
          </svg>
        </Paper>
        <Button
          variant="outlined"
          className={classes.button}
          onClick={handleButtonClick.bind(this, "right")}
        >
          {">"}
        </Button>

        {/*</Fade>*/}
      </div>
    </div>
  );
};

export default Card;
