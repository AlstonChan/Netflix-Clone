import styles from "./HomeFeatured.module.scss";

import useHandleHomeEmail from "src/hooks/useHandleHomeEmail";

import Header from "../../Header";
import HomeForm from "../common/HomeForm";

export default function FeaturedHome() {
  const { ref, btnClass, handleMouse, handleFormSubmit } = useHandleHomeEmail();

  return (
    <>
      <section className={styles.container}>
        <div className={styles.content}>
          <Header />
          <div className={styles.feaContainer}>
            <h1 className={styles.title}>
              Unlimited movies, TV shows, and more.
            </h1>
            <p className={styles.subTitle}>Watch anywhere. Cancel anytime.</p>
            <p className={styles.desc}>
              Ready to watch? Enter your email to create or restart your
              membership.
            </p>
            <HomeForm
              handleFormSubmit={handleFormSubmit}
              handleMouse={handleMouse}
              btnClass={btnClass}
              ref={ref}
            />
          </div>
        </div>
      </section>
    </>
  );
}
