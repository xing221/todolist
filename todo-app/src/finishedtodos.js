import React, { useState, useEffect } from "react";
import axios from "axios";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Button from "@material-ui/core/Button";
import ListItemText from "@material-ui/core/ListItemText";
import { Link, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
	overall: {
		position: "relative",
		top: "76px",
	},
});

const FinishedTodos = (props) => {
	const [todos, setTodos] = useState([]);
	const [search, setSearch] = useState("");
	const { setCurrentPage } = props;
	const history = useHistory();
	const classes = useStyles();

	const getTodos = () => {
		axios
			.get(`/api/v1/todos`)
			.then((response) => {
				setTodos(response.data);
			})
			.catch((error) => console.log(error));
	};

	const onDelete = (itemID) => {
		axios
			.delete(`/api/v1/todos/${itemID}`)
			.then((response) => {
				const newTodos = todos.filter((item) => item.id !== itemID);
				setTodos(newTodos);
			})
			.catch((error) => console.log(error));
	};

	const onSearch = (event) => {
		event.preventDefault();
		setSearch(event.target.value);
	};

	const list = (search) => (
		<List>
			{search === ""
				? todos.map((todo) => {
						if (todo.done)
							return (
								<ListItem button>
									<ListItemText primary={`${todo.title}`} />
									<Button
										onClick={() => history.push(`/todos/edit/${todo.id}`)}
									>
										Edit
									</Button>
									<Button onClick={() => onDelete(todo.id)}>Delete</Button>
								</ListItem>
							);
				  })
				: todos.map((todo) => {
						if (todo.done && todo.title.includes(search))
							return (
								<ListItem button>
									<ListItemText primary={`${todo.title}`} />
									<Button
										onClick={() => history.push(`/todos/edit/${todo.id}`)}
									>
										Edit
									</Button>
									<Button onClick={() => onDelete(todo.id)}>Delete</Button>
								</ListItem>
							);
				  })}
		</List>
	);

	useEffect(() => {
		getTodos();
		setCurrentPage("Finished Tasks");
	}, []);

	return (
		<div>
			<Grid
				className={classes.overall}
				container
				direction="row"
				justify="center"
				alignItems="center"
				spacing={1}
			>
				<Grid item xs={12} sm={8}>
					<TextField
						onChange={(e) => onSearch(e)}
						fullWidth
						variant="outlined"
					/>{" "}
				</Grid>
				<Grid item xs={12} sm={8}>
					<Paper>{list(search)}</Paper>
				</Grid>
			</Grid>
		</div>
	);
};

export default FinishedTodos;
