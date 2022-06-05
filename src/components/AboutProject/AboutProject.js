import './AboutProject.css';

const AboutProject = () => {
  return (
    <div className='about'>
      <h2 className='about__title'>О проекте</h2>
      <div>
        <h3>Дипломный проект включал 5 этапов</h3>
        <span>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</span>
      </div>
      <div>
        <h3>На выполнение диплома ушло 5 недель</h3>
        <span>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</span>
      </div>
      <div>Progress bar</div>
    </div>
  )
};

export default AboutProject;