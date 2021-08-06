import { useState } from 'react';
import './App.css';
import Form from './components/Form';
import Header from './components/Header';
import Home from './components/Home';
import Modal from './components/Modal';


function App() {
  
  const [open, setOpen] = useState(true)

  return (
    <div className="App">
      <Header/>
      <Home/>
      <Modal open={open} onClose={()=>setOpen(o=>!o)}>
        <Form/>
      </Modal>
    </div>
  );
}

export default App;
