import './Techs.css';

const Techs = () => {
  return (
    <div className='techs'>
      <h2 className='techs__title'>Технологии</h2>
      <span>7 технологий</span>
      <span>На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</span>
      <ul>
        <li>HTML</li>
        <li>CSS</li>
        <li>JS</li>
        <li>React</li>
        <li>Git</li>
        <li>Express.js</li>
        <li>mongoDB</li>
      </ul>
    </div>
  )
};

export default Techs;