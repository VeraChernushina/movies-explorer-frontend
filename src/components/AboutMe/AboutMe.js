import './AboutMe.css';
import photo from '../../images/myphoto.jpg';

const AboutMe = () => {
  return (
    <div className='about-me'>
      <h2 className='about-me__title'>Студент</h2>
      <div className='about-me__content'>
        <div className='about-me__info'>
          <span className='about-me__name'>Вера</span>
          <span className='about-me__job'>Фронтенд-разработчик, 24 года</span>
          <span className='about-me__bio'>
            Я родилась и живу в Санкт-Петербурге, в 2021 году я закончила факультет ветеринарной медицины СПбГУВМ. 
            Кодить я начала еще в школе, но заняться программированием серьезно я решилась только после университета. 
            Я работаю в стартапе удаленно, что позволяет мне больше времени проводить с моей собакой. 
            В свободное время я смотрю ситкомы, занимаюсь йогой и гуляю по моему прекрасному городу.
          </span>
          <a className='about-me__link' href='https://www.facebook.com/v.chernushina/' target='_blank' rel='noreferrer'>Facebook</a>
          <a className='about-me__link' href='https://github.com/VeraChernushina' target='_blank' rel='noreferrer'>Github</a>
        </div>
        <img
          className='about-me__photo'
          src={photo}
          alt='Мое фото'
        />
      </div>
    </div>
  )
};

export default AboutMe;