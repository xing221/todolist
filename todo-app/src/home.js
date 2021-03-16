import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import TextField from "@material-ui/core/TextField";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
	overall: {
		position: "relative",
		top: "20px",
	},
});

const Home = (props) => {
	const [todos, setTodos] = useState([]);
	const [search, setSearch] = useState("");
	const { match,setCurrentPage } = props;
	const history = useHistory();
	const classes = useStyles();


	const getTodos = () => {
		axios
			.get("/api/v1/todos")
			.then((response) => {
				setTodos(response.data);
				console.log(response);
			})
			.catch((error) => console.log(error));
	};

	const onDone = (event, itemID) => {
		axios
			.put(`/api/v1/todos/${itemID}`, {
				todo: {done: event.target.checked }
			})
			.then((response) => {
				console.log('this is the response')
				console.log(response)
				const newTodos = todos.map((item) =>
					itemID === item.id ? response.data : item
				);
				setTodos(newTodos);
			})
			.catch((error) => console.log(error));
	};

	const onSearch = (event) => {
		event.preventDefault();
		setSearch(event.target.value);
	};

	const onDelete = (event, itemID) => {
		axios
			.delete(`/api/v1/todos/${itemID}`)
			.then((response) => {
				const newTodos = todos.filter((item) => item.id !== itemID);
				setTodos(newTodos);
			})
			.catch((error) => console.log(error));
	};


	useEffect(() => {
		getTodos();
		setCurrentPage('Tasks')
	}, []);

	console.log(todos)

	return (
		<div className={classes.overall}>
			<Grid
				direction="row"
				container
				justify="center"
				alignItems="center"
			>
				<Grid item xs={12}>
					<Grid
						direction="row"
						container
						justify="center"
						alignItems="center"
						spacing={1}
					>
						<Grid item xs={12} sm={8}>
							<IconButton onClick={() => history.push(`/new`)}>
								<AddIcon />
							</IconButton>
						</Grid>
						<Grid item xs={12} sm={8}>
							<TextField
								fullWidth
								variant="outlined"
								placeholder="search"
								onChange={(e) => onSearch(e)}
							/>
						</Grid>
						<Grid item xs={12} sm={8}>
							<Paper>
							<List>
								{search === ""
									? todos.map((todo) => {
											if (!todo.done) {
												return (
													<ListItem
														key={todo.id}
														button
													>
														<Checkbox
															checked={todo.done}
															onChange={(e) =>
																onDone(
																	e,
																	todo.id
																)
															}
														/>
														<ListItemText
															primary={`${todo.title}`}
														/>
														<Button
															onClick={(e) =>
																history.push(
																	`/todos/edit/${todo.id}`
																)
															}
														>
															Edit
														</Button>
														<Button
															onClick={(e) =>
																onDelete(
																	e,
																	todo.id,
																)
															}
														>
															Delete
														</Button>
													</ListItem>
												);
											}
									  })
									: todos.map((todo) => {
											if (
												!todo.done &&
												todo.title.includes(search)
											) {
												return (
													<ListItem
														key={todo.id}
														button
													>
														<Checkbox
															checked={todo.done}
															onChange={(e) =>
																onDone(
																	e,
																	todo.id
																)
															}
														/>
														<ListItemText
															primary={`${todo.title}`}
														/>
														<Button
															onClick={(e) =>
																history.push(
																	`/todos/edit/${todo.id}`
																)
															}
														>
															Edit
														</Button>
														<Button
															onClick={(e) =>
																onDelete(
																	e,
																	todo.id
																)
															}
														>
															Delete
														</Button>
													</ListItem>
												);
											}
									  })}
							</List>
							</Paper>
						</Grid>
						{/*				<div>
			<h2> Done</h2>
				{todos.map(todo => {
					if (todo.done) {
					return (
						<ListItem key={todo.id} button>
						<Checkbox checked={todo.done} onChange={(e)=>onDone(e,todo.id)}/>
						<ListItemText primary={`${todo.title}`} />
						</ListItem>
						)}
				})}
			</div>
			<button type='submit' onClick={()=>history.push(`/tags`)}>All Tags</button>*/}
					</Grid>
				</Grid>
			</Grid>
		</div>
	);
};

export default Home;
