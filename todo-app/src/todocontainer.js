import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {Link, useHistory} from 'react-router-dom'


const TodoContainer = () => {

	const [todos, setTodos] = useState([])
	const [input,setInput] = useState('')
	const [tag,setTag] = useState([])

	const newToDo = {title:input,done:false}
	const history = useHistory()

	const getTodos = () => {
		axios.get('/api/v1/todos')
		.then(response => {
			setTodos(response.data)
		})
		.catch(error => console.log(error))
	}

	const onSubmit = (newTitle) => {
		axios.post('/api/v1/todos/',{todo: newToDo, tags: tag})
		.then(response => {
			const newTodos = [...todos,response.data]
			setTodos(newTodos)
			setInput('')
			setTag([])
			const path = `/`
			history.push(path)
		})
		.catch(error => console.log(error))
	}

	const onTextChange = (event) => {
		event.preventDefault();
		setInput(event.target.value);
		//console.log(event.target.value)
	}

	const onTagChange = (event) => {
		event.preventDefault();
		const test = event.target.value
		const array = [...new Set(test.split(",").map((t) => t.toUpperCase()))]
		setTag([...array])
	}


	const onDelete = (event,itemID) => {
		event.preventDefault();
		axios.delete(`/api/v1/todos/${itemID}`)
		.then(response => {
			const newTodos = todos.filter(item => item.id !== itemID)
			setTodos(newTodos);
		})
		.catch(error => console.log(error))
	}


	useEffect(() => {
		getTodos()
	}, []);

	return (
		<div>
			<h1>Todo List</h1>
			<div>
				<input type='text' value={tag} placeholder='type a tag' onChange={(e)=>onTagChange(e)} />
				<input type='text' value={input} placeholder="add a task" onChange={(e)=>onTextChange(e)}/>
				<button type='submit' onClick={()=>onSubmit(input)}>Add</button>
			</div>

			<div>
				<ul>
					{todos.map( (item) => {
						const id = item.id
						console.log('this is item')
						console.log(item)
						return (
							<li key={item.id}>
								<label >{item.title} isDone? {item.done.toString()} tagged {console.log(item.tags)} </label>
								<button type='submit' onClick={(e)=>onDelete(e,id)}>Delete</button>
							</li>
							)
						})
					}
				</ul>
			</div>
		</div>
	)
}

export default TodoContainer;