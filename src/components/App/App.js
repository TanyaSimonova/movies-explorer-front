import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import { Register } from "../Register/Register";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Login } from "../Login/Login";
import NotFound from "../NotFound/NotFound";

function App() {
  //поменять значение на false чтобы разлогиниться
  //роуты пока не защищены
  const [loggedIn, setLoggedIn] = useState(true);

  //поменять значение на null чтобы не видеть сообщения об ошибке в Profile
  const [error, setError] = useState("Пользователь уже существует");

  //const navigate = useNavigate();

  return (
    <div className="App">
      <Routes>
        <Route path="/signup" element={<Register />} />
        <Route path="/signin" element={<Login />} />
        <Route
          path="/"
          element={
            <>
              <Header loggedIn={loggedIn} />
              <Main />
              <Footer />
            </>
          }
        />
        <Route
          path="/movies"
          element={
            <>
              <Header loggedIn={loggedIn} />
              <Movies />
              <Footer />
            </>
          }
        />
        <Route
          path="/saved-movies"
          element={
            <>
              <Header loggedIn={loggedIn} />
              <SavedMovies />
              <Footer />
            </>
          }
        />
        <Route
          path="/profile"
          element={
            <>
              <Header loggedIn={loggedIn} />
              <Profile error={error} />
            </>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}
export default App;
