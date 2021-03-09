import React, { useState, useEffect } from 'react'
import axios from 'axios'


const TodoContainer = () => {

	const [todos, setTodos] = useState([])
	const [input,setInput] = useState('')

	const newToDo = {title:input,done:false}

	const getTodos = () => {
		axios.get('/api/v1/todos')
		.then(response => {
			setTodos(response.data)
		})
		.catch(error => console.log(error))
	}

	const onSubmit = (newTitle) => {
		axios.post('/api/v1/todos/',{todo: newToDo})
		.then(response => {
			const newTodos = [...todos,response.data]
			setTodos(newTodos)
			setInput('')
		})
		.catch(error => console.log(error))
	}

	const onTextChange = (event) => {
		event.preventDefault();
		setInput(event.target.value);
		//console.log(event.target.value)
	}

	const onDone = (event,itemID) => {
		event.preventDefault();
		axios.put(`/api/v1/todos/${itemID}`, {todo: {done: event.target.checked}})
		.then(response => {
			const newTodos = todos.map(item => itemID === item.id ? response.data : item)
			setTodos(newTodos)
		})
		.catch(error => console.log(error))

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
			<div>
				<input type='text' value={input} placeholder="add a task" onChange={(e)=>onTextChange(e)}/>
				<button type='submit' onClick={()=>onSubmit(input)}>Add</button>
			</div>

			<div>
				<ul>
					{todos.map( (item) => {
						const id = item.id
						return (
							<li key={item.id}>
								<input type='checkbox' checked={item.done} onChange={(e)=>onDone(e,id)}/>
								<label >{item.title} isDone? {item.done.toString()} </label>
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