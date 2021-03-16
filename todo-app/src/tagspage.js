import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";

import TextField from "@material-ui/core/TextField";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";

const TagsPage = () => {
	const [tag, setTag] = useState([]);
	const history = useHistory();

	const getTags = () => {
		axios
			.get("/api/v1/tags")
			.then((response) => {
				console.log(response.data);
				setTag(response.data);
			})
			.catch((error) => console.log(error));
	};

	const onDelete = (event, itemID) => {
		event.preventDefault();
		axios
			.delete(`/api/v1/tags/${itemID}`)
			.then((response) => {
				const newTags = tag.filter((item) => item.id !== itemID);
				setTag(newTags);
			})
			.catch((error) => console.log(error));
	};

	useEffect(() => {
		getTags();
	}, []);

	return (
		<div>
			<h1>Tags page</h1>
			<div>
				<List>
					{tag.map((item) => {
						return (
							<ListItem
								key={item.id}
								button
							>
								<ListItemText primary={`${item.name}`} />
								<Button
									variant='outlined'
									onClick={() => history.push(`/tags/${item.id}`)}
								>
									View
								</Button>
								<Button
									variant='outlined'
									onClick={(e) => onDelete(e, item.id)}
								>
									Delete
								</Button>
							</ListItem>
						);
					})}
				</List>
			</div>
		</div>
	);
};

export default TagsPage;
