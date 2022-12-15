import styles from "@/styles/footer.module.css";
import facebook from "@/public/images/icons/social media/facebook.svg";
import instagram from "@/public/images/icons/social media/instagram.svg";
import twitter from "@/public/images/icons/social media/twitter.svg";
import youtube from "@/public/images/icons/social media/youtube.svg";
import movieDB from "@/public/images/movieDB.svg";

import Image from "next/image";

import { responsive } from "@/styles/cssStyle";

export default function FooterBrwose() {
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
              <Image
                src={facebook}
                alt="facebook icon"
                unoptimized
                style={responsive}
              />
            </a>
          </div>
          <div className={styles.socialMedia}>
            <a href="">
              <Image
                src={instagram}
                alt="instagram icon"
                unoptimized
                style={responsive}
              />
            </a>
          </div>
          <div className={styles.socialMedia}>
            {" "}
            <a href="">
              <Image
                src={twitter}
                alt="twitter icon"
                unoptimized
                style={responsive}
              />
            </a>
          </div>
          <div className={styles.socialMedia}>
            {" "}
            <a href="">
              <Image
                src={youtube}
                alt="youtube icon"
                unoptimized
                style={responsive}
              />
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
          <Image src={movieDB} alt="movieDB logo" unoptimized />
          <p className={styles.attribution}>
            This product uses the TMDB API but is not endorsed or certified by
            TMDB.
          </p>
        </div>
      </div>
    </footer>
  );
}
