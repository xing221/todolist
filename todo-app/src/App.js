import TodoContainer from './todocontainer.js'
import TagsPage from './tagspage.js'
import Tags from './tag.js'
import Home from './home.js'
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'

const App = () => {
  return (
  	<Router> 
	    <div>
	      <Route path="/" exact component={Home} />
	      <Route path="/new" exact component={TodoContainer} />
	      <Route path="/tags/:id" component={Tags} />
	      <Route path="/tags" exact component={TagsPage} />
	    </div>
	</Router>




    )


}

export default App;
