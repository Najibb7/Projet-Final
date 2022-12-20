import './App.css';
// import Accueil from './components/Accueil';
// import Validation from './components/PageAdmission/Validation';
// import AddAbsence from './components/PageGestion/AddAbsence';
// import ModifyAbsence from './components/PageGestion/ModifyAbsence';
import JoursFeries from './components/PageJoursFeries/JoursFeries';
import Login from './components/Login/Login';
import cookie from 'react-cookies';
import { useState } from 'react';
import AddJF from './components/PageJoursFeries/AddJF';
import ModalDelete from './components/ModalDelete';
import GestionDefault from './components/PageGestion/GestionDefault';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Nav from './Layouts/Nav';
// import ValidationManager from './components/PageValidation/ValidationManager';
import VueValidation from './components/PageValidation/VueValidation';


function App() {
  //console.log(cookie.load("username"));
  const [page, setPage] = useState("");
  const [login, setLogin] = useState(false);
  if (login || cookie.load("_id")) {
    return (
      <>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Nav />} >
              <Route path='/' element={<GestionDefault />} />
              <Route path='/gda' element={<GestionDefault />} />
              <Route path='/JF' element={<JoursFeries />} />
              <Route path='/validation' element={<VueValidation />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </>
    );

  } else {
    return (
      <div className="App">
        <Login setLogin={() => setLogin(true)} />
      </div>
    );
  }
  /* return (
    <div className="App">
    <Validation />
    </div>
  ); */
}

export default App;
