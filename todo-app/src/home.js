import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {Link, useHistory} from 'react-router-dom'


const Home = (props) => {
	const [todos,setTodos] = useState([]);
	const {match} = props
	const history = useHistory()

	const getTodos = () => {
		axios.get('/api/v1/todos')
		.then(response => {
			setTodos(response.data)
			console.log(response)
		})
		.catch(error => console.log(error))
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

	useEffect(() => {
		getTodos();
	}, [])


	return (
		<div>
			<h1>Todo List</h1>
			<Link to={`/new`}>New Todo</Link>

			<h2> To be completed</h2>
			<ul>
				{todos.map(todo => {
					if (!todo.done) {
					return (
						<div>
						<li key={todo.id}>
						<input type='checkbox' checked={todo.done} onChange={(e)=>onDone(e,todo.id)}/>
						<label>{todo.title} Done: {todo.done.toString()} Tags: 
						{todo.tags.map(tag => {
							return <Link to={`/tags/${tag.id}`}>{tag.name} </Link>
						})}
						</label>
						</li></div>
						)}
				})}

			</ul>
			<div>
			<h2> Done</h2>
				{todos.map(todo => {
					if (todo.done) {
					return (
						<li key={todo.id}>
						<input type='checkbox' checked={todo.done} onChange={(e)=>onDone(e,todo.id)}/>
						<label>
						{todo.title} Done: {todo.done.toString()} Tags: 
						{todo.tags.map(tag => {
							return <Link to={`/tags/${tag.id}`}>{tag.name} </Link>
						})}
						</label>
						</li>
						)}
				})}
				</div>
			<button type='submit' onClick={()=>history.push(`/tags`)}>All Tags</button>
		</div>
	)


}

export default Home