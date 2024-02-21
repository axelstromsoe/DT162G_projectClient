// ----- IMPORTS -----

// Components
import Header from './components/Header';
import Footer from './components/Footer'

// Pages
import Index from './pages/Index';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Lessons from './pages/Lessons';
import Profile from './pages/Profile';
import EditUser from './pages/EditUser';
import ChangePassword from './pages/ChangePassword';
import About from './pages/About';
import CreateLesson from './pages/CreateLesson';
import EditLesson from './pages/EditLesson';
import NotFound from './pages/Notfound';

// Functionality
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// ----- Application -----

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header></Header>
        <div id='content'>
          <Routes>
            <Route path='/' element={<Index></Index>}></Route>
            <Route path='/login' element={<Login></Login>}></Route>
            <Route path='/signup' element={<Signup></Signup>}></Route>
            <Route path='/lessons' element={<Lessons></Lessons>}></Route>
            <Route path='/profile' element={<Profile></Profile>}></Route>
            <Route path='/edituser' element={<EditUser></EditUser>}></Route>
            <Route path='/changepassword' element={<ChangePassword></ChangePassword>}></Route>
            <Route path='/about' element={<About></About>}></Route>
            <Route path='/createlesson' element={<CreateLesson></CreateLesson>}></Route>
            <Route path='/editlesson/:id' element={<EditLesson></EditLesson>}></Route>
            <Route path='*' element={<NotFound></NotFound>}></Route>
          </Routes>
        </div>
        <Footer></Footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
