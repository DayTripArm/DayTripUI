import React from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import actions from "../actions";
import FormButton from "../Form/FormButton";

class Welcome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0
        };
        this.welcomeInfo = [{
            src: require("../../assets/images/predesigned_day_trips.png"),
            header: "Predesigned Day Trips",
            text: "Discover what you can do in Armenia in one day. Choose among the possible one day trip options we made for you."
        },{
            src: require("../../assets/images/find_your_driver.png"),
            header: "Find Your Driver",
            text: "Find your private driver to take you sighsteeing. Simply choose from the predesigned trips our proffesionals have created, see the date, pick your driver and go."
        },{
            src: require("../../assets/images/who_are_our_drivers.png"),
            header: "Who Are Our Drivers?",
            text: "Daytrip Drivers are trusted people with different proffesions and interests who(have an available car) chose to dedicate their free time to traveling around Armenia and making new connections."
        }];
    }

    render() {
        const info = this.welcomeInfo[this.state.count];
        const {showHideSignUp, showHideWelcome} = this.props;

        return (
            <div className="welcome">
                <header>
                    <span>Welcome to Daytrip</span>
                </header>
                <div className="container">
                    <img src={info.src} width="328" height="213" alt="Predesigned Day Trips"/>
                    <div className="header">{info.header}</div>
                    <div className="text">{info.text}</div>
                </div>
                {
                    this.state.count === this.welcomeInfo.length - 1 // last dot
                        ?
                        <FormButton label="GET STARTED" customClass="get-started" onClick={() => {
                            showHideSignUp(false);
                            showHideWelcome(false);
                            document.documentElement.scrollTop = 0;
                        }} />
                        :
                        <div className="control">
                            <div className="skip" onClick={() => this.setState({count: this.welcomeInfo.length - 1})}>skip</div>
                            <div className="dots">
                                {
                                    this.welcomeInfo.map((info, i) => {
                                        return (
                                            <span
                                                key={i}
                                                className={i <= this.state.count ? "big" : ""}
                                                onClick={() => this.setState({count: i})}
                                            />
                                        );
                                    })
                                }
                            </div>
                            <div className="next" onClick={() => this.setState({count: this.state.count + 1})}>next</div>
                        </div>
                }
            </div>
        );
    }
}

Welcome.propTypes = {
    showHideSignUp: PropTypes.func,
    showHideWelcome: PropTypes.func,
};

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({
    showHideSignUp: (show) => dispatch(actions.showHideSignUp(show)),
    showHideWelcome: (show) => dispatch(actions.showHideWelcome(show)),
});


export default connect(mapStateToProps, mapDispatchToProps)(Welcome);
