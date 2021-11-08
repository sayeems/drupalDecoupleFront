import logo from './logo.svg';
import './App.css';
import Article from './Article';
import Single from './Single';
import Header from './Header';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <Header />
      <Router>
        <Switch>
          <Route exact path="/" component={Article} />
          <Route exact path="/:id" component={Single} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
