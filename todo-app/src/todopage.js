import React, { useState, useEffect } from "react";
import axios from "axios";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Checkbox from '@material-ui/core/Checkbox';

const TodoPage = (params) => {
	const { match,setCurrentPage } = params;
	const [todo, setTodos] = useState({});
	const [title, setTitle] = useState('');
	const [done, setDone] = useState(false);
	const [tags, setTags] = useState('')
	const newTodo = {todo: {title: title, done: done}, tags: tags === "" ? [] : tags.split(",")}

	const getData = () => {
		axios
			.get(`/api/v1/todos/${match.params.id}`)
			.then((response) => {
				setTodos(response.data)
				setTitle(response.data.title)
				setDone(response.data.done)
				setTags(response.data.tags.map(t=>t.name).join(","))
			})
			.catch((error) => console.log(error));
	};

	const updateTodo = () => {
		axios.put(`/api/v1/todos/${match.params.id}`,newTodo)
		.then(response => console.log(response))
		.catch(error =>console.log(error))
	}

	const onCheck = (event) => {
		setDone(event.target.checked)
	}

	const onTitleChange = (event) => {
		setTitle(event.target.value)
	}

	const onTagsChange = (event) => {
		const test = event.target.value
		setTags(test)
	}

	useEffect(() => {
		getData();
		setCurrentPage("Edit");
	}, []);

	console.log(tags)


	return (
		<Grid 
		  container 
		  direction='row'
		  justify='center'
		  alignItems='center'
		>
			<Grid item>
				<Paper>
					<TextField
						variant='outlined'
						placeholder='title'
						value={title}
						onChange={e=>onTitleChange(e)}
					/>
					<TextField
						variant='outlined'
						placeholder='tags'
						value={tags}
						onChange={e=>onTagsChange(e)}
					/>
					<Checkbox
						checked={done}
						onChange={e=>onCheck(e)}
					/>
					<Button
						onClick={()=>updateTodo()}
						variant='contained'
					>
					Submit
					</Button>
				</Paper>
			</Grid>

		</Grid>



	)
};

export default TodoPage;
