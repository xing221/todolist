import React, { useState, useEffect } from 'react'
import axios from 'axios'

const TagsPage = () => {
	const [tag,setTag] = useState([]);

	const getTags = () => {
		axios.get('/api/v1/tags')
		.then(response => {
			console.log(response.data)
			setTag(response.data)
		})
		.catch(error => console.log(error))
	}

	const onDelete = (event,itemID) => {
		event.preventDefault();
		axios.delete(`/api/v1/tags/${itemID}`)
		.then(response => {
			const newTags = tag.filter(item => item.id !== itemID)
			setTag(newTags)
		})
		.catch(error => console.log(error))
	}


	useEffect(() => {
		getTags()
	}, [])


	return (
		<div>
			<h1>Tags page</h1>
			<div>
				<ul>
					{tag.map(item => {
						return (
							<li key={item.id}>
								<label>{item.name}</label>
								<button type='submit' onClick={(e)=>onDelete(e,item.id)}>Delete</button>
							</li>

							)
					})}
				</ul>	
			</div>
		</div>

		)



}

export default TagsPage;