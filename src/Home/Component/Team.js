import React from "react";
import styles from "./css/Team.css";
import Icon from "../../general/Icon";
import { PUBLIC_ASSETS_PATH } from "../../Utils/Constants";
import { FormattedMessage } from "react-intl";
import HomeMessages from "../Messages/HomeMessages";
export default class Team extends React.Component {
  renderTeamCard = teamMate => {
    return (
      <div className={styles.card}>
        <div className={styles.imageWrapper}>
          <Icon image={`${PUBLIC_ASSETS_PATH}/${teamMate.image}`} size={200} />
        </div>
        <div className={styles.details}>
          <h2 className={styles.name}>{teamMate.name}</h2>
          <p className={styles.title}>{teamMate.title}</p>
          <div className={styles.socialLinks}>
            <div
              className={styles.icon}
              onClick={() => this.goToUrl(teamMate.linkedIn)}
            >
              <Icon size={25} image={`${PUBLIC_ASSETS_PATH}/linkedin.svg`} />
            </div>
            <div
              className={styles.icon}
              onClick={() => this.goToUrl(teamMate.twitter)}
            >
              <Icon size={25} image={`${PUBLIC_ASSETS_PATH}/twitter.svg`} />
            </div>
            <div
              className={styles.icon}
              onClick={() => this.goToUrl(teamMate.github)}
            >
              <Icon size={25} image={`${PUBLIC_ASSETS_PATH}/github.svg`} />
            </div>
          </div>
        </div>
      </div>
    );
  };
  render() {
    const teamMates = [
      {
        name: "Manoj Kumar",
        title: "Beyond Think",
        linkedIn: "",
        twitter: "",
        github: "",
        image: "manoj.svg"
      },
      {
        name: "Anand",
        title: "TechMate",
        linkedIn: "",
        twitter: "",
        github: "",
        image: "anand.svg"
      },
      {
        name: "Aakarsh Yadav",
        title: "Tech Hunt",
        linkedIn: "",
        twitter: "",
        github: "",
        image: "aakarsh.svg"
      }
    ];
    return (
      <div className={styles.base} id="team">
        <div className={styles.topSection}>
          <h1 className={styles.heading}>
            <FormattedMessage {...HomeMessages.teamMates} />
          </h1>
        </div>
        <hr className={styles.divider} />
        <div className={styles.teamWrapper}>
          {teamMates.map((team, id) => {
            return (
              <div className={styles.cardWrapper}>
                {this.renderTeamCard(team)}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
