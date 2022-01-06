import styles from "../../styles/login.module.css";
import Link from "next/link";
import InputEmail from "./InputEmail";
import InputPassword from "./InputPassword";

export default function LoginForm() {
  return (
    <form className={styles.formFlex} action="">
      <InputEmail inputId={"signInFormInputEml"} />
      <InputPassword inputId={"signInFormInputPas"} />
      <div className={styles.btnContain}>
        <button className={`netflixBtn ${styles.submitBtn}`} type="submit">
          Sign In
        </button>
      </div>
      <div className={styles.inputFoot}>
        <div className={styles.checkBoxContain}>
          <input
            className={styles.checkRememberInput}
            type="checkbox"
            name="checkRemember"
            id="checkRemember"
          />
          <label className={styles.checkRememberLabel} htmlFor="checkRemember">
            Remember me
          </label>
        </div>
        <Link href="/">
          <a className={styles.helpLink}>Need Help?</a>
        </Link>
      </div>
    </form>
  );
}
