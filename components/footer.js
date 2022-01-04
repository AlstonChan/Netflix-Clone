import { useState } from "react";
import styles from "../styles/footer.module.css";

export default function Featured() {
  const footerContArr = [
    "FAQ",
    "Help Center",
    "Account",
    "Media Center",
    "Investor Relations",
    "Jobs",
    "Redeem Gift Cards",
    "Buy Gift Cards",
    "Investor Relations",
    "Terms of Use",
    "Privacy",
    "Cookie Preferences",
    "Corporate Information",
    "Contact Us",
    "Speed Test",
    "Legal Notices",
    "Only on Netflix",
  ];
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p className={styles.footerTel}>
          Questions? Call <a href="tel:1-844-505-2993">1-844-505-2993</a>
        </p>
        <div className={styles.unorderedList}>
          {footerContArr.map((info, index) => {
            return (
              <li key={index} className={styles.listItem}>
                <a href="">{info}</a>
              </li>
            );
          })}
        </div>
      </div>
    </footer>
  );
}
