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
          <Route exact path="/" component={Home} />
          <Route path="/c" component={Converations}/>
        </Switch>

        <Modal>
          <Form />
        </Modal>
      </Router>
    </div>
  );
}

export default App;
