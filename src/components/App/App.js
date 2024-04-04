import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import { Register } from "../Register/Register";
import {
  Routes,
  Route,
  useNavigate,
  useLocation,
  Navigate,
} from "react-router-dom";
import { Login } from "../Login/Login";
import NotFound from "../NotFound/NotFound";
import Preloader from "../Preloader/Preloader.js";
import { CurrentUserContext } from "../../context/CurrentUserContext.js";
import * as auth from "../../utils/MainApi.js";
import api from "../../utils/MoviesApi.js";
import ProtectedRouteElement from "../ProtectedRoute/ProtectedRoute.js";
import {
  DuplicateError,
  RegisterError,
  ServerError,
  LoginError,
  ProfileError,
  LoadingFilmError,
  LoadingProfileSuccess,
} from "../../utils/constants.js";

function App() {
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState("");
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [errorRegister, setErrorRegister] = useState(null);
  const [errorLogin, setErrorLogin] = useState(null);
  const [errorProfile, setErrorProfile] = useState(null);
  const [successProfile, setSuccessProfile] = useState(null);
  const [errorLoadingMovies, setErrorLoadingMovies] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const isSignUp = location.pathname === "/signup";
  const isSignIn = location.pathname === "/signin";

  useEffect(() => {
    if (!isSignUp) {
      setErrorRegister(null);
    }
    if (!isSignIn) setErrorLogin(null);
  }, [isSignIn, isSignUp]);

  useEffect(() => {
    handleTokenCheck();
  }, [loggedIn]);

  const handleTokenCheck = () => {
    const jwt = localStorage.getItem("token");
    if (jwt) {
      auth
        .checkToken(jwt)
        .then((res) => {
          setCurrentUser(res);
        })
        .catch((error) => {
          console.log(`Ошибка при проверке токена ${error}`);
          setLoggedIn(false);
          navigate("/signin", { replace: true });
        });
    }
  };

  useEffect(() => {
    if (loggedIn) {
      Promise.all([auth.getItems(), auth.getUser()])
        .then(([movies, currentUser]) => {
          setSavedMovies(movies);
          setCurrentUser(currentUser);
        })
        .catch((error) => {
          console.log(
            `Ошибка при загрузке данных пользователя и фильмов ${error}`,
          );
        });
    }
  }, [loggedIn]);

  const handleRegister = (formValue) => {
    setLoading(true);
    setErrorRegister(null);
    auth
      .register(formValue)
      .then((res) => {
        setCurrentUser(formValue);
        setLoggedIn(true);
        setLoading(false);
        navigate("/movies", { replace: true });
        handleLogin(formValue);
      })
      .catch((error) => {
        if (error === 400) setErrorRegister(RegisterError);
        if (error === 409) setErrorRegister(DuplicateError);

        if (error === 500) setErrorRegister(ServerError);
        setLoading(false);
      });
  };

  const handleLogin = (formValue) => {
    setErrorLogin(null);
    setLoading(true);
    auth
      .authorize(formValue)
      .then((res) => {
        if (res.token) {
          setLoggedIn(localStorage.getItem("token"));
          setCurrentUser(formValue);
          setLoading(false);
          navigate("/movies", { replace: true });
        }
      })
      .catch((error) => {
        if (error === 401) setErrorLogin(LoginError);

        if (error === 500) setErrorLogin(ServerError);
        setLoading(false);
      });
  };

  const handleProfile = (formValue) => {
    setErrorProfile(null);
    setSuccessProfile(null);
    setLoading(true);
    auth
      .setUserUpdate(formValue)
      .then((res) => {
        setCurrentUser(res.user);
        setLoading(false);
        setSuccessProfile(LoadingProfileSuccess);
      })
      .catch((error) => {
        if (error === 409) setErrorProfile(DuplicateError);
        if (error === 400) setErrorProfile(ProfileError);
        if (error === 500) setErrorProfile(ServerError);
        setLoading(false);
      });
  };

  function handleSearchFilm() {
    setErrorLoadingMovies(null);
    setLoading(true);
    api
      .getItems()
      .then((res) => {
        setLoading(false);
        setMovies(res);
      })
      .catch((error) => {
        setErrorLoadingMovies(LoadingFilmError);
        console.log(`Ошибка при загрузке данных фильмов ${error}`);
        setLoading(false);
      });
  }

  function handleAddLikeMovie(data) {
    const isLikedCard = savedMovies.find((m) => m.movieId === data.id);
    if (!isLikedCard) {
      auth
        .saveMovie(data)
        .then((newMovie) => {
          setSavedMovies([newMovie, ...savedMovies]);
        })
        .catch((error) => {
          console.log(`Ошибка при добавлении фильма в избранное ${error}`);
        });
    }
    if (isLikedCard) {
      auth
        .deleteMovie(isLikedCard._id)
        .then(() => {
          setSavedMovies((state) =>
            state.filter((c) => c._id !== isLikedCard._id),
          );
        })
        .catch((error) => console.log(`Ошибка при удалении фильма ${error}`));
    }
  }

  function handleMovieDelete(movie) {
    auth
      .deleteMovie(movie._id)
      .then(() => {
        setSavedMovies((state) => state.filter((c) => c._id !== movie._id));
      })
      .catch((error) => console.log(`Ошибка при удалении фильма ${error}`));
  }

  function handleLogOut(e) {
    setLoggedIn(false);
  }

  return (
    <div className="App">
      <CurrentUserContext.Provider value={currentUser}>
        <Routes>
          <Route
            path="/signup"
            element={
              !loggedIn ? (
                <>
                  <Register
                    onRegister={handleRegister}
                    errorRegister={errorRegister}
                    loggedIn={loggedIn}
                  />
                  {loading && <Preloader />}
                </>
              ) : (
                <Navigate replace to="/" />
              )
            }
          />
          <Route
            path="/signin"
            element={
              !loggedIn ? (
                <>
                  <Login
                    onLogin={handleLogin}
                    errorLogin={errorLogin}
                    loggedIn={loggedIn}
                  />
                  {loading && <Preloader />}
                </>
              ) : (
                <Navigate replace to="/" />
              )
            }
          />
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
              <ProtectedRouteElement loggedIn={loggedIn}>
                <Header loggedIn={loggedIn} />
                <Movies
                  loading={loading}
                  onSearch={handleSearchFilm}
                  savedMovies={savedMovies}
                  errorLoadingMovies={errorLoadingMovies}
                  movies={movies}
                  onMovieLike={handleAddLikeMovie}
                />
                {loading && <Preloader />}
                <Footer />
              </ProtectedRouteElement>
            }
          />
          <Route
            path="/saved-movies"
            element={
              <ProtectedRouteElement loggedIn={loggedIn}>
                <Header loggedIn={loggedIn} />
                <SavedMovies
                  savedMovies={savedMovies}
                  onMovieDelete={handleMovieDelete}
                />
                <Footer />
              </ProtectedRouteElement>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRouteElement loggedIn={loggedIn}>
                <Header loggedIn={loggedIn} />
                <Profile
                  currentUser={currentUser}
                  onUpdateUser={handleProfile}
                  errorProfile={errorProfile}
                  onLoggedIn={handleLogOut}
                  successProfile={successProfile}
                />
                {loading && <Preloader />}
              </ProtectedRouteElement>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </CurrentUserContext.Provider>
    </div>
  );
}
export default App;
