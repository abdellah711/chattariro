import './App.css';
import Form from './components/Form';
import Header from './components/Header';
import Home from './pages/Home';
import Modal from './components/Modal';
import { BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import { useSelector} from 'react-redux'
import Profile from './components/Profile';

function App() {

  const token = useSelector(state => state.app.token)
  
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          
          <Route path="/c">
            {!token ? <Redirect to="/"/> :<Dashboard/>}
          </Route>
          <Route exact path={["/","/signup","/login"]} >
            {token ? <Redirect to="c"/> :<Home/>}
          </Route>
        </Switch>

        <Modal>
          <Switch>
            <Route path={["/login","/signup"]} component={Form}/>
            <Route path="*" component={Profile}/>
          </Switch>
        </Modal>
      </Router>
    </div>
  );
}

export default App;
