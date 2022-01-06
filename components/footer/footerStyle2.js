import styles from "../../styles/footer.module.css";

export default function Footer2() {
  const footerContArr = [
    "FAQ",
    "Help Center",
    "Terms of Use",
    "Privacy",
    "Cookie Preferences",
    "Corporate Information",
  ];
  return (
    <footer className={styles.footer2}>
      <div className={styles.container2}>
        <p className={styles.footerTel2}>
          Questions? Call <a href="tel:1-844-505-2993">1-844-505-2993</a>
        </p>
        <div className={styles.unorderedList2}>
          {footerContArr.map((info, index) => {
            return (
              <li key={index} className={styles.listItem2}>
                <a href="">{info}</a>
              </li>
            );
          })}
        </div>
      </div>
    </footer>
  );
}
