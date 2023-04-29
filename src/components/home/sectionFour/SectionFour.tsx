import styles from "./HomeSectionFour.module.scss";
import baseStyles from "../HomeSection.module.scss";
import netflixKid from "@/public/images/home/netflix-kids.png";

import Image from "next/image";

import { responsive } from "@/styles/cssStyle";

export default function CardFour() {
  return (
    <section className={baseStyles.container}>
      <div className={`${baseStyles.containerContent} ${baseStyles.reverse}`}>
        <div className={styles.imgPresentContainer}>
          <Image
            src={netflixKid}
            alt="netflix kid display image"
            style={responsive}
          />
        </div>
        <div className={`${baseStyles.wordGroup} ${baseStyles.right}`}>
          <h1 className={baseStyles.title}>Create profiles for kids.</h1>
          <p className={baseStyles.subTitle}>
            Send kids on adventures with their favorite characters in a space
            made just for them—free with your membership.
          </p>
        </div>
      </div>
    </section>
  );
}
