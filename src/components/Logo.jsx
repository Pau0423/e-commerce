import img from "../assets/img.png";
import styles from "./NavBar.module.css";

const Logo = () => {
  return (
    <div className={styles.logo}>
      <img src={img} alt="MontevideoImport" />
    </div>
  );
};
export default Logo;
