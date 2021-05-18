import React from 'react';
import styles from './CountDownStringTime.css';
import PropTypes from 'prop-types';
class CountDownStringTime extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			days: 0,
			hours: 0,
			min: 0,
			sec: 0
		};
	}
	componentDidMount() {
		//update every seconds
		this.interval = setInterval(() => {
			const date = this.calculationCountDown(this.props.date);

			date ? this.setState(date) : this.stop();
		}, 1000);
	}
	componentWillUnMount() {
		this.stop();
	}
	calculationCountDown(endDate) {
		let diff = (Date.parse(new Date(endDate)) - Date.parse(new Date())) / 1000;
		//clear countdown when date is reached
		if (diff <= 0) return false;
		const timeLeft = {
			years: 0,
			days: 0,
			hours: 0,
			min: 0,
			sec: 0,
			millisec: 0
		};
		//Calculte Time difference between now and expected days
		if (diff >= 365.25 * 86400) {
			// 365.25 * 24 * 60 * 60
			timeLeft.years = Math.floor(diff / (365.25 * 86400));
			diff -= timeLeft.years * 365.25 * 86400;
		}
		if (diff >= 86400) {
			// 24 * 60 * 60
			timeLeft.days = Math.floor(diff / 86400);
			diff -= timeLeft.days * 86400;
		}
		if (diff >= 3600) {
			// 60 * 60
			timeLeft.hours = Math.floor(diff / 3600);
			diff -= timeLeft.hours * 3600;
		}
		if (diff >= 60) {
			timeLeft.min = Math.floor(diff / 60);
			diff -= timeLeft.min * 60;
		}
		timeLeft.sec = diff;

		return timeLeft;
	}
	stop() {
		clearInterval(this.interval);
		if (this.props.onComplete) {
			this.props.onComplete();
		}
	}
	addLeadingZeros(value) {
		value = String(value);
		while (value.length < 2) {
			value = '0' + value;
		}
		return value;
	}
	render() {
		const countDown = this.state;
		return (
			<div className={styles.Countdown}>
				{this.props.showDays && (
					<span
						className={styles.CountdownCol}
						style={{ color: this.props.color, fontSize: this.props.fontSize }}
					>
						<span className={styles.CountdownColElement}>
							{this.addLeadingZeros(countDown.days)}:
							{/* <span>{countDown.days === 1 ? "Day" : "Days"}</span> */}
						</span>
					</span>
				)}
				{this.props.showHours && (
					<span className={styles.CountdownCol}>
						<span className={styles.CountdownColElement}>
							{this.addLeadingZeros(countDown.hours)} {this.props.stringTime === true && 'hr'}:
						</span>
					</span>
				)}

				{this.props.showMinute && (
					<span className={styles.CountdownCol}>
						<span className={styles.CountdownColElement}>
							{this.addLeadingZeros(countDown.min)} {this.props.stringTime === true && 'min'} :
						</span>
					</span>
				)}
				{this.props.showSeconds && (
					<span className={styles.CountdownCol}>
						<span className={styles.CountdownColElement}>
							{this.addLeadingZeros(countDown.sec)} {this.props.stringTime === true && 'sec'}
						</span>
					</span>
				)}
			</div>
		);
	}
}
export default CountDownStringTime;
CountDownStringTime.propTypes = {
	date: PropTypes.string,
	color: PropTypes.string,
	fontSize: PropTypes.number,
	stringTime: PropTypes.bool
};
CountDownStringTime.defaultProps = {
	color: ' #eb2026',
	fontSize: 14,
	date: 'Thru, 20 June 2019, 17:30:04',
	stringTime: false
};
