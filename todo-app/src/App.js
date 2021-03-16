import TodoContainer from "./todocontainer.js";
import TodoPage from "./todopage.js";
import TagsPage from "./tagspage.js";
import Tags from "./tag.js";
import Home from "./home.js";
import Appbar from "./appbar.js";
import FinishedTodos from "./finishedtodos.js";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";

const App = () => {
	const [currentPage, setCurrentPage] = useState("");

	return (
		<div>
			<Router>
				<Appbar currentPage={currentPage} />
				<div>
					<Route
						path="/"
						exact
						render={(props) => (
							<Home {...props} setCurrentPage={setCurrentPage} />
						)}
					/>
					<Route
						path="/new"
						exact
						render={(props) => (
							<TodoContainer
								{...props}
								setCurrentPage={setCurrentPage}
							/>
						)}
					/>
					<Route path="/tags/:id" component={Tags} />
					<Route path="/tags" exact component={TagsPage} />
					<Route path="/finished" exact render={(props) => (<FinishedTodos {...props} setCurrentPage={setCurrentPage} />)} />
					<Route path="/todos/edit/:id" render={(props) => (<TodoPage {...props} setCurrentPage={setCurrentPage} />)} />
				</div>
			</Router>
		</div>
	);
};

export default App;
