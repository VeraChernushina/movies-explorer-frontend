import './Portfolio.css';

const Portfolio = () => {
  return (
    <div className='portfolio'>
      <h3 className='portfolio__title'>Портфолио</h3>
      <ul className='portfolio__projects'>
        <li><span>Статичный сайт</span><span>↗</span></li>
        <li><span>Адаптивный сайт</span><span>↗</span></li>
        <li><span>Одностраничное приложение</span><span>↗</span></li>
      </ul>
    </div>
  )
};

export default Portfolio;