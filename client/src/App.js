import "./App.css";
import MyNavbar from "./components/navbar/navbar";
import LoginCard from "./components/login/login";
import SignupCard from "./components/signup/signup";
import Live from "./components/golive/live";
import AttendLive from "./components/golive/attendlive";

import History from "./components/history/history.js";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Switch,
} from "react-router-dom";
import Homepage from "./components/homepage/homepage";
import { useState } from "react";
import { LoginContext } from "./context/LoginContext";

function App() {
  let [loggedin, setLoggedin] = useState(false);
  return (
    <LoginContext.Provider value={[loggedin, setLoggedin]}>
      <div className="App">
        <Router>
          <MyNavbar />
          <Routes>
            <Route exact path="/signup" element={<SignupCard />} />

            <Route exact path="/" element={<LoginCard />} />

            <Route exact path="/login" element={<LoginCard />} />
            <Route exact path="/homepage" element={<Homepage />} />
            <Route exact path="/live" element={<Live />} />
            <Route exact path="/attendlive" element={<AttendLive />} />

            <Route exact path="/history" element={<History />} />
          </Routes>
        </Router>
      </div>
    </LoginContext.Provider>
  );
}

export default App;
