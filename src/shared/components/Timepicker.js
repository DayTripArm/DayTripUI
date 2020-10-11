import React from "react";
import ReactDOM from "react-dom";
import Slider from "react-slick";
import {HOURS, MINUTES} from "../../constants";


class Timepicker extends React.Component {
    constructor(props) {
        super(props);
        this.slide_hour = this.slide_hour.bind(this);
        this.slider_minute = this.slider_minute.bind(this);
        this.slide_meridiem = this.slide_meridiem.bind(this);
        this.hoursSlider = null;
        this.minutesSlider = null;
        this.meridiemSlider = null;
        this.props = props;
        this.hours = HOURS();
        this.minutes = MINUTES();
        this.meridiem = ['am', 'pm'];
    }

    slide_hour(y) {
        if (y.target.closest(".hoursSlider")) {
            y.wheelDelta > 0 ? this.hoursSlider.slickNext() : this.hoursSlider.slickPrev();
        }
    }

    slider_minute(y) {
        if (y.target.closest(".minutesSlider")) {
            y.wheelDelta > 0 ? this.minutesSlider.slickNext() : this.minutesSlider.slickPrev();
        }
    }

    slide_meridiem(y) {
        if (y.target.closest(".meridiemSlider")) {
            y.wheelDelta > 0 ? this.meridiemSlider.slickNext() : this.meridiemSlider.slickPrev();
        }
    }

    componentWillMount() {
        window.addEventListener("wheel", (e) => {
            if (this.hoursSlider) {
                this.slide_hour(e);
            }
            if (this.minutesSlider) {
                this.slider_minute(e);
            }
            if (this.meridiemSlider) {
                this.slide_meridiem(e);
            }
        });
    }
    render() {
        const settings = {
            centerMode: true,
            infinite: true,
            slidesToShow: 1,
            speed: 100,
            swipe:true,
            vertical: true,
            verticalSwiping: true,
            swipeToSlide: true,
            arrows: false,
            adaptiveHeight: false,

        };
        return (
            <div className="wrapper">
                <Slider
                    {...settings}
                    className="slider-entity hours hoursSlider"
                    initialSlide={this.hours.indexOf(this.props.pickTime.hour)}
                    ref={(slider) => (this.hoursSlider = slider)}
                    afterChange={(index) => { this.props.pickTime.hour = this.hours[index] }}
                >
                    {this.hours.map((hour) => (
                        <div key={hour}>{hour}</div>
                    ))}
                </Slider>
                <Slider
                    {...settings}
                    className="slider-entity minutes minutesSlider"
                    initialSlide={this.minutes.indexOf(this.props.pickTime.minute)}
                    ref={(slider) => (this.minutesSlider = slider)}
                    afterChange= {(index) => { this.props.pickTime.minute = this.minutes[index] }}
                >
                    {this.minutes.map((minutes) => (
                        <div key={minutes}>{minutes}</div>
                    ))}
                </Slider>
                <Slider
                    {...settings}
                    infinite={false}
                    className="slider-entity ampm meridiemSlider"
                    initialSlide={this.meridiem.indexOf(this.props.pickTime.meridiem)}
                    ref={(slider) => (this.meridiemSlider = slider)}
                    afterChange={(index) => { this.props.pickTime.meridiem = this.meridiem[index] }}
                >
                    <div>AM</div>
                    <div>PM</div>
                </Slider>
                <div className="mask">
                    <div className="mask-item"></div>
                    <div className="mask-item"></div>
                    <div className="mask-item"/>
                </div>
            </div>
        );
   }
}

export default Timepicker
