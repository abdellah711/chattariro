import './App.css';
import Form from './components/Form';
import Header from './components/Header';
import Home from './pages/Home';
import Modal from './components/Modal';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Converations from './pages/Converations';

function App() {

  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route path="/c" component={Converations}/>
          <Route path="/" component={Home} />
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
