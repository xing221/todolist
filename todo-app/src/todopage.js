import React, { useState, useEffect } from "react";
import axios from "axios";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Checkbox from "@material-ui/core/Checkbox";
import { makeStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

const useStyles = makeStyles({
	overall: {
		position: "relative",
		top: "20px",
	},
});

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const TodoPage = (params) => {
	const { match, setCurrentPage } = params;
	const [todo, setTodos] = useState({});
	const [title, setTitle] = useState("");
	const [done, setDone] = useState(false);
	const [tags, setTags] = useState("");
	const [comment, setComment] = useState("");
	const newTodo = {
		todo: { title: title, done: done, comment: comment },
		tags: tags === "" ? [] : tags.split(","),
	};
	const classes = useStyles();

	const [open, setOpen] = useState(false);

	const getData = () => {
		axios
			.get(`/api/v1/todos/${match.params.id}`)
			.then((response) => {
				console.log('this is response')
				console.log(response)
				setTodos(response.data);
				setTitle(response.data.title);
				setDone(response.data.done);
				setTags(response.data.tags.map((t) => t.name).join(","));
				setComment(response.data.comment);
			})
			.catch((error) => console.log(error));
	};

	const updateTodo = () => {
		axios
			.put(`/api/v1/todos/${match.params.id}`, newTodo)
			.then((response) => {
				console.log(response);
				setOpen(true);
			})
			.catch((error) => console.log(error));
	};

	const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}

		setOpen(false);
	};

	const onCheck = (event) => {
		setDone(event.target.checked);
	};

	const onTitleChange = (event) => {
		setTitle(event.target.value);
	};

	const onTagsChange = (event) => {
		const test = event.target.value;
		setTags(test);
	};

	const onCommentChange = (event) => {
		setComment(event.target.value);
	}

	useEffect(() => {
		getData();
		setCurrentPage("Edit");
	}, []);

	return (
		<Grid
			container
			direction="row"
			justify="center"
			alignItems="center"
			spacing={1}
			className={classes.overall}
		>
			<Grid item xs={12} sm={8}>
				<TextField
					variant="outlined"
					label="title"
					value={title}
					onChange={(e) => onTitleChange(e)}
					fullWidth
				/>
			</Grid>
			<Grid item xs={12} sm={8}>
				<TextField
					variant="outlined"
					label="tags"
					value={tags}
					onChange={(e) => onTagsChange(e)}
					fullWidth
				/>
			</Grid>
			<Grid item xs={12} sm={8}>
				<TextField
					fullWidth
					label="comments"
					variant="outlined"
					multiline
					value={comment}
					onChange={(e)=>onCommentChange(e)}
					row={4}
				/>
			</Grid>
			<Grid item xs={12} sm={8}>
				<Checkbox checked={done} onChange={(e) => onCheck(e)} />
				<Button onClick={() => updateTodo()} variant="contained">
					Submit
				</Button>
				<Snackbar
					open={open}
					autoHideDuration={6000}
					onClose={handleClose}
				>
					<Alert onClose={handleClose} severity="success">
						Edited!
					</Alert>
				</Snackbar>
			</Grid>
		</Grid>
	);
};

export default TodoPage;
