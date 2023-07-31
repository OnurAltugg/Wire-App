import './App.css';
import wireLogoYellow from './assets/logos/wireLogoYellow.svg';
import { HiHome, HiPlus } from 'react-icons/hi'
import { PiMagnifyingGlassBold } from 'react-icons/pi'
import { BsCalendarWeek } from 'react-icons/bs'
import { BiUser } from 'react-icons/bi'

import { BrowserRouter as Router, Route, NavLink, Routes } from 'react-router-dom';
import { useState } from 'react';

import Home from './pages/Home/Home';
import Discover from './pages/Discover/Discover';
import CalendarPage from './pages/Calendar/CalendarPage';
import Account from './pages/Account/Account';

import Login from './pages/Authentication/Login/Login';
import Register from './pages/Authentication/Register/Register';
import NavbarAuth from './pages/Authentication/NavbarAuth/NavbarAuth'

import SportPage from './components/sportPage/SportPage';
import MatchLobby from './components/MatchLobby/MatchLobby';

import RedbullBlog from './components/blogPages/RedbullBlog';
import JimmyKeyBlog from './components/blogPages/JimmyKeyBlog';
import WindsurfBlog from './components/blogPages/WindsurfBlog';
import RepublicCupBlog from './components/blogPages/RepublicCupBlog';
import SalsanamaBlog from './components/blogPages/SalsanamaBlog';

import ModalForm from "./components/ModalForm/ModalForm";


function App() {
  const [showModal, setShowModal] = useState(false);

  return (
    <Router className="AppRouter">
      <div className="App">
        <nav className='desktopNavbar'>
          <img src={wireLogoYellow} alt="Wire" className='MainLogo' />
          <ul>
            <li>
              <NavLink exact to="/" activeClassName="active">Home</NavLink>
            </li>
            <li>
              <NavLink to="/discover" activeClassName="active">Discover</NavLink>
            </li>
            <li>
              <NavLink to="/calendar" activeClassName="active">Calendar</NavLink>
            </li>
            <li>
              <NavLink to="/account" activeClassName="active">Account</NavLink>
            </li>
          </ul>
        </nav>

        <div className='mobileNavbar'>
          <NavLink exact to="/" activeClassName="active" className={"mobileNavbarElement"}>
            <HiHome size={"1.6em"} />
            <p>Home</p>
          </NavLink>
          <NavLink to="/discover" activeClassName="active" className={"mobileNavbarElement"}>
            <PiMagnifyingGlassBold size={"1.6em"} />
            <p>Discover</p>
          </NavLink>
          <NavLink to="/calendar" activeClassName="active" className={"mobileNavbarElement"}>
            <BsCalendarWeek size={"1.6em"} />
            <p>Calendar</p>
          </NavLink>
          <NavLink to="/account" activeClassName="active" className={"mobileNavbarElement"}>
            <BiUser size={"1.6em"} />
            <p>Account</p>
          </NavLink>
        </div>

        <div className="Content">
          <div className="TopBar">
            <button className='createEventButton' onClick={() => setShowModal(true)}>
              <HiPlus />
              <b>Create Event</b>
            </button>
            <div className='accountAccessSection'>
            <NavbarAuth />
            </div>
          </div>

          <div className='eventForm'>
            {showModal && <ModalForm onClose={() => setShowModal(false)} />}
          </div>


          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/discover" element={<Discover />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/account" element={<Account />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/sport/:sportName" element={<SportPage />} />
            <Route path="/lobby/:lobbyId" element={<MatchLobby />} />

            <Route path="/redbull/halfcourtizmir" element={<RedbullBlog />} />
            <Route path="/uriyat/jimmykey" element={<JimmyKeyBlog />} />
            <Route path="/arkas/windsurf" element={<WindsurfBlog />} />
            <Route path="/eayk/republiccup" element={<RepublicCupBlog />} />
            <Route path="/salsanama/izmir" element={<SalsanamaBlog />} />
          </Routes>
        </div>
      </div>
    </Router>

  );
}

export default App;
