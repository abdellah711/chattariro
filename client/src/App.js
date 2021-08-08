import './App.css';
import Form from './components/Form';
import Header from './components/Header';
import Home from './pages/Home';
import Modal from './components/Modal';
import { BrowserRouter as Router, Switch, Route ,useHistory, Redirect} from 'react-router-dom';
import Converations from './pages/Converations';
import { useSelector} from 'react-redux'

function App() {

  const token = useSelector(state => state.app.token)

  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          
          <Route path="/c">
            {!token ? <Redirect to="/"/> :<Converations/>}
          </Route>
          <Route path="/" >
            {token ? <Redirect to="c"/> :<Home/>}
          </Route>
        </Switch>

        <Modal>
          <Switch>
            <Route path={["/login","/signup"]} component={Form}/>
          </Switch>
        </Modal>
      </Router>
    </div>
  );
}

export default App;
