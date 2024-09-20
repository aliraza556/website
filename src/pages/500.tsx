import DotsBackground from "@/components/DotsBackground";
import styles from "@/styles/500.module.css";
import Link from "next/link";

const Custom500 = () => {
  return (
    <>
      <div className={styles.body}>
        <div
          className={`bg-gray-800 text-white p-4 rounded-lg shadow-lg ${styles.codeArea}`}
        >
          <span className={styles.comment}>// 500 internal server error.</span>
          <span>
            <span className={styles.keyword}>if</span>(
            <span className={styles.variable}>serverError</span>){" {"}
          </span>
          <span>
            <span className={styles.indent}>throw</span>(
            <span className={styles.string}>"(╯°□°)╯︵ ┻━┻"</span>);
          </span>
          <span>{"}"}</span>
          <span className={styles.comment}>
            //{" "}
            <Link href="/" className={styles.link}>
              Go home!
            </Link>
          </span>
        </div>
      </div>
      <DotsBackground move={false} />
    </>
  );
};

export default Custom500;
