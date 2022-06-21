import Promo from "./Promo/Promo";
import AboutProject from "./AboutProject/AboutProject";
import Techs from "./Techs/Techs";
import AboutMe from "./AboutMe/AboutMe";
import Portfolio from "./Portfolio/Portfolio";
import Footer from "./Footer/Footer";

const Main = ({ loggedIn }) => {
  return (
    <>
      <Promo loggedIn={loggedIn} />
      <AboutProject />
      <Techs />
      <AboutMe />
      <Portfolio />
      <Footer />
    </>
  )
};

export default Main;