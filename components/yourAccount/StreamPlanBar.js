import styles from "../../styles/yourAccount/changePlan.module.css";
import CheckMarkSvg from "../icons/CheckMarkSvg";

export default function StreamPlanBar({
  plan,
  desc,
  fee,
  selected,
  selectBar,
  currentPlan,
}) {
  return (
    <>
      <li
        className={
          selected === plan ? `${styles.bar} ${styles.selectedbar}` : styles.bar
        }
        onClick={() => selectBar(plan)}
      >
        <div
          className={styles.barHeader}
          style={selected === plan ? { backgroundColor: "#ccc" } : {}}
        >
          <h3
            className={styles.barHeaderContent}
            style={selected === plan ? { color: "#077af5" } : {}}
          >
            {currentPlan === plan ? (
              <p className={styles.showCurrentPlan}>CURRENT PLAN:</p>
            ) : (
              ""
            )}
            <p style={{ margin: "0 ", textAlign: "left" }}>{plan}</p>
          </h3>
        </div>
        <div className={styles.barDetails}>
          <p className={styles.desc}>
            {desc}&nbsp; <span className={styles.packageFee}>{fee} </span>
          </p>
        </div>
        {selected === plan ? (
          <div className={styles.checkedContainer}>
            <CheckMarkSvg stWidth={3} />
          </div>
        ) : (
          ""
        )}
      </li>
    </>
  );
}
