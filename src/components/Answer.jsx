import React from "react";
import {createStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(() => 
    createStyles({
        "button" : {
            color: "#ff8549",
            borderColor: "#ff8549",
            fontWeight: 600,
            marginBottom: "8px",
            "&:hover": {
                backgroundColor: "#ff8549",
                color: "#fff"
            }
        }
    })
);
const Answer = (props) => {
    const classes = useStyles();
    return(
        <Button className={classes.button} variant="outlined"  onClick={() => props.select(props.content, props.nextId)}>
            {props.content}
        </Button> 
    )
}

export default Answer