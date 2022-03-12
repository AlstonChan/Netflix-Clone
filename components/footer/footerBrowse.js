import styles from "../../styles/footer.module.css";
import Image from "next/image";

import facebook from "../../public/images/icons/social media/facebook.svg";
import instagram from "../../public/images/icons/social media/instagram.svg";
import twitter from "../../public/images/icons/social media/twitter.svg";
import youtube from "../../public/images/icons/social media/youtube.svg";
import movieDB from "../../public/images/movieDB.svg";

export default function Footer1() {
  const footerContArr = [
    "Audio and Subtitles",
    "Audio Description",
    "Help Center",
    "Gift Cards",
    "Media Center",
    "Investor Relations",
    "Jobs",
    "Terms of Use",
    "Privacy",
    "Legal Notices",
    "Cookie Preferences",
    "Corporate Information",
    "Contact Us",
  ];
  return (
    <footer className={styles.footerBrowse}>
      <div className={styles.containerBrowse}>
        <div className={styles.socialMediaContainer}>
          <div className={styles.socialMedia}>
            <a href="">
              <Image src={facebook} alt="facebook icon" />
            </a>
          </div>
          <div className={styles.socialMedia}>
            <a href="">
              <Image src={instagram} alt="instagram icon" />
            </a>
          </div>
          <div className={styles.socialMedia}>
            {" "}
            <a href="">
              <Image src={twitter} alt="twitter icon" />
            </a>
          </div>
          <div className={styles.socialMedia}>
            {" "}
            <a href="">
              <Image src={youtube} alt="youtube icon" />
            </a>
          </div>
        </div>
        <div className={styles.unorderedListBrowse}>
          {footerContArr.map((info, index) => {
            return (
              <li key={index} className={styles.listItemBrowse}>
                <a href="">{info}</a>
              </li>
            );
          })}
        </div>
        <div>
          <h3 className={styles.attribution}>Special Thanks to:</h3>
          <Image src={movieDB} />
        </div>
      </div>
    </footer>
  );
}
