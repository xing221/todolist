import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'


const Tag = (props) => {
	const [tag, setTag] = useState([]);

	const {match} = props 

	const getTag = () => {
		axios.get(`/api/v1/tags/${match.params.id}`)
		.then(response => {
			setTag(response.data)
		})
		.catch(error => console.log(error))
	}


	useEffect(() => {
		getTag()
	}, [])


	return (
		<div>
			<h1>{tag.name}</h1>
			<h2>List of todos associated with tag</h2>
			<ul>
				{tag.todos && tag.todos.map(t => {
					return (
						<li><Link to={`/todos/${t.id}`}>{t.title}</Link></li>
						)
				})}
			</ul>
		</div>
		)
}

export default Tag 