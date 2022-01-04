import styles from "../../../styles/Home/cardFaq.module.css";
import AccordionCard from "./accordionCard";
import EmailInput from "../featured/input";
import { useState } from "react";

export default function CardFaq() {
  const [emailBtnMouseClass, setEmailBtnMouseClass] = useState(
    `netflixBtn ${styles.getStartedBtn}`
  );

  function handleMouse(e) {
    if (e.type === "mousedown") {
      setEmailBtnMouseClass(
        `netflixBtn ${styles.getStartedBtn} ${styles.getStartedBtnMouse}`
      );
    } else if (e.type === "mouseup" || e.type === "mouseleave") {
      setEmailBtnMouseClass(`netflixBtn ${styles.getStartedBtn}`);
    }
  }
  const faq = [
    {
      headers: "Is this the real Netflix?",
      content:
        "Nope, so please do not enter any of your information here, this webpage is created as a part of my project only",
    },
    {
      headers: "What is Netflix?",
      content: [
        "Netflix is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.",
        "You can watch as much as you want, whenever you want without a single commercial – all for one low monthly price. There's always something new to discover and new TV shows and movies are added every week!",
      ],
    },
    {
      headers: "How much does Netflix cost?",
      content:
        "Watch Netflix on your smartphone, tablet, Smart TV, laptop, or streaming device, all for one fixed monthly fee. Plans range from $8.99 to $17.99 a month. No extra costs, no contracts.",
    },
    {
      headers: "Where can I watch?",
      content: [
        "Watch anywhere, anytime. Sign in with your Netflix account to watch instantly on the web at netflix.com from your personal computer or on any internet-connected device that offers the Netflix app, including smart TVs, smartphones, tablets, streaming media players and game consoles.",
        "You can also download your favorite shows with the iOS, Android, or Windows 10 app. Use downloads to watch while you're on the go and without an internet connection. Take Netflix with you anywhere.",
      ],
    },
    {
      headers: "How do I cancel?",
      content:
        "Netflix is flexible. There are no pesky contracts and no commitments. You can easily cancel your account online in two clicks. There are no cancellation fees – start or stop your account anytime.",
    },
    {
      headers: "What can I watch on Netflix?",
      content:
        "Netflix has an extensive library of feature films, documentaries, TV shows, anime, award-winning Netflix originals, and more. Watch as much as you want, anytime you want.",
    },
    {
      headers: "Is Netflix good for kids",
      content: [
        "The Netflix Kids experience is included in your membership to give parents control while kids enjoy family-friendly TV shows and movies in their own space.",
        "Kids profiles come with PIN-protected parental controls that let you restrict the maturity rating of content kids can watch and block specific titles you don’t want kids to see.",
      ],
    },
  ];

  function toggleOne(e) {
    console.log(e.currentTarget);
  }

  return (
    <section className={styles.container}>
      <div className={styles.shell}>
        <h1 className={styles.sectionHead}>Frequently Asked Questions</h1>
        <div className={styles.accordion}>
          {faq.map((item, index) => {
            return (
              <li key={index} className={styles.accordionItem}>
                <AccordionCard faq={item} toggleOne={toggleOne} />
              </li>
            );
          })}
        </div>
        <form
          action=""
          autoComplete="on"
          name="emailInput"
          onSubmit={(e) => handleFormSubmit(e)}
          className={styles.flexForm}
        >
          <p>
            Ready to watch? Enter your email to create or restart your
            membership.
          </p>
          <div className={styles.faqForm}>
            <EmailInput inputId={"_id_faqInput"} />
            <div className={styles.buttonContain}>
              <button
                type="submit"
                className={emailBtnMouseClass}
                onMouseDown={(e) => handleMouse(e)}
                onMouseUp={(e) => handleMouse(e)}
                onMouseLeave={(e) => handleMouse(e)}
              >
                Get Started &nbsp;
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
