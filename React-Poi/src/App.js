
import './App.css';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import HomePage from './Home';
import HubPage from './HubPage';

function App() {

  return (
    <Router>
        <Switch>
            <Route exact path = "/" component = {HomePage}></Route>
            <Route path = "/accounts/:email" component = {HubPage}></Route>
            
        </Switch>
    </Router>
      

    
  );
}

export default App;
