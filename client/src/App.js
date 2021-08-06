import './App.css';
import Form from './components/Form';
import Header from './components/Header';
import Home from './components/Home';
import Modal from './components/Modal';


function App() {
  
  return (
    <div className="App">
      <Header/>
      <Home/>
      <Modal>
        <Form/>
      </Modal>
    </div>
  );
}

export default App;
