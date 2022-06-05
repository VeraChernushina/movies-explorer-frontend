import './AboutMe.css';

const AboutMe = () => {
  return (
    <div className='about-me'>
      <h2 className='about-me__title'>Студент</h2>
      <div className='about-me__content'>
        <div className='about-me__info'>
          <span className='about-me__name'>Вера</span>
          <span className='about-me__job'>Фронтенд-разработчик, 24 года</span>
          <span className='about-me__bio'>
            Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена 
и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.
          </span>
          <a className='about-me__link' href='#'>Facebook</a>
          <a className='about-me__link' href='https://github.com/VeraChernushina' target='_blank'>Github</a>
        </div>
        <div className='about-me__photo'>Photo</div>
      </div>
    </div>
  )
};

export default AboutMe;