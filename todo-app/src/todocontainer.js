import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
    card: {
        top: "50px",
        position: "relative",
    },
    textfield: {
        marginBottom: "10px",
    },
});

const TodoContainer = (props) => {
    const [todos, setTodos] = useState([]);
    const [input, setInput] = useState("");
    const [tag, setTag] = useState([]);

    const newToDo = { title: input, done: false };
    const history = useHistory();
    const classes = useStyles();
    const {setCurrentPage} = props

    const getTodos = () => {
        axios
            .get("/api/v1/todos")
            .then((response) => {
                setTodos(response.data);
            })
            .catch((error) => console.log(error));
    };

    const onSubmit = (newTitle) => {
        axios
            .post("/api/v1/todos/", { todo: newToDo, tags: tag })
            .then((response) => {
                const newTodos = [...todos, response.data];
                setTodos(newTodos);
                setInput("");
                setTag([]);
                const path = `/`;
                history.push(path);
            })
            .catch((error) => console.log(error));
    };

    const onTextChange = (event) => {
        event.preventDefault();
        setInput(event.target.value);
        //console.log(event.target.value)
    };

    const onTagChange = (event) => {
        event.preventDefault();
        const test = event.target.value;
        const array = [...new Set(test.split(",").map((t) => t.toUpperCase()))];
        setTag([...array]);
    };

    useEffect(() => {
        getTodos();
        setCurrentPage('New Task')
    }, []);

    return (
        <div>
            <Grid
                direction="row"
                container
                justify="center"
                alignItems="center"
            >
                <Grid item xs={12} sm={8}>
                    <Paper className={classes.card}>
                        <Typography variant="h4" align="center">
                            Add a Task
                        </Typography>
                        <div>
                            <Grid
                                direction="row"
                                container
                                justify="center"
                                alignItems="center"
                            >
                                <Grid item sm={2} />
                                <Grid item sm={8}>
                                    <TextField
                                        className={classes.textfield}
                                        variant="outlined"
                                        fullWidth
                                        value={input}
                                        placeholder="Task"
                                        onChange={(e) => onTextChange(e)}
                                    />
                                    <TextField
                                        className={classes.textfield}
                                        variant="outlined"
                                        fullWidth
                                        value={tag}
                                        placeholder="(Optional) Tags"
                                        onChange={(e) => onTagChange(e)}
                                    />
                                    <Button
                                        variant="outlined"
                                        onClick={() => onSubmit(input)}
                                    >
                                        Add
                                    </Button>
                                </Grid>
                                <Grid item sm={2} />
                            </Grid>
                        </div>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
};

export default TodoContainer;
