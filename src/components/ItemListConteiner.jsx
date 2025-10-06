import styles from "./ItemListConteiner.module.css";

const ItemListConteiner = ({ greeting }) => {
  return (
    <div className={styles.welcome}>
      <h2>{greeting}</h2>
    </div>
  );
};

export default ItemListConteiner;
