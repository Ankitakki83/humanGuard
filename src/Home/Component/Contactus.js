import React from "react";
import styles from "./css/Contactus.css";
export default class ContactUs extends React.Component {
  renderContactCard = member => {
    return (
      <div className={styles.card}>
        <h1 className={styles.name}>{member.name}</h1>
        <p className={styles.mailId}>{member.email}</p>
        <p className={styles.mobile}>{member.mobile}</p>
      </div>
    );
  };
  render() {
    return (
      <div className={styles.base} id="contactus">
        <div className={styles.wrapper}>
          <div className={styles.leftSection}>
            <h1 className={styles.addressHeading}>Address</h1>
            <h3 className={styles.subAddress}>CHANDIGARH</h3>
            <div className={styles.addressWrapper}>
              <p className={styles.address}>
                33/A, Pipliwala Town , Chandigarh , India (160101)
              </p>
              <p className={styles.mobile}>8858994962</p>

              <div className={styles.email}>
                <a href="mailto:humanguard0909@gmail.com">
                <p className={styles.color}>humanguardmarketing@gmail.com</p>

                </a>
              </div>

            </div>
            <h3 className={styles.subAddress}>Timimg</h3>
            <div className={styles.addressWrapper}>
              <p className={styles.address}>
                Office Open :  09:00 AM
              </p>
              <p className={styles.address}>
                Office Close :  06:00 PM
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
