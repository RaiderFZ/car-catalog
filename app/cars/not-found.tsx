import styles from './not-found.module.css';
const {container, title, text} = styles;

const NotFound = () => {
  return (
    <div className={container}>
      <h2 className={title}>Автомобили не найдены</h2>
      <p className={text}>Попробуйте изменить параметры фильтра или сортировки.</p>
    </div>
  );
}

export default NotFound;