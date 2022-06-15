import Promo from "./Promo/Promo";
import AboutProject from "./AboutProject/AboutProject";
import Techs from "./Techs/Techs";
import AboutMe from "./AboutMe/AboutMe";
import Portfolio from "./Portfolio/Portfolio";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Movies from "./Movies/Movies";
import SavedMovies from "./SavedMovies/SavedMovies";
import Register from "./Register/Register";
import Login from "./Login/Login";

const Main = () => {
  return (
    <>
      <Header />
      <Promo />
      <AboutProject />
      <Techs />
      <AboutMe />
      <Portfolio />
      <Movies />
      <SavedMovies />
      <Footer />
      <Register />
      <Login />
    </>
  )
};

export default Main;