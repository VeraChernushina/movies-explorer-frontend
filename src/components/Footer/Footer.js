import './Footer.css';

const Footer = () => {
  return (
    <footer className='footer'>
      <span className='footer__text'>Учебный проект Яндекс.Практикум х BeatFilm.</span>
      <div className='footer__bottom-block'>
        <span className='footer__copyright'>© 2022</span>
        <div className='footer__socials'>
          <a className='footer__link' href='https://practicum.yandex.ru/' target='_blank' rel="noreferrer">Яндекс.Практикум</a>
          <a className='footer__link' href='https://github.com/VeraChernushina' target='_blank' rel="noreferrer">Github</a>
          <a className='footer__link' href='https://www.facebook.com/v.chernushina/' target='_blank' rel="noreferrer">Facebook</a>
        </div>
      </div>

    </footer>
  )
};

export default Footer;