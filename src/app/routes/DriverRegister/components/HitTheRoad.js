import React, {useEffect, useState} from 'react';
import ImgMap from 'assets/images/map.svg';
import Input from 'shared/components/Input';
import ModalAside from 'shared/components/ModalAside';
import { IconQuestionOutlined } from 'shared/components/Icons';
import {useDispatch, useSelector} from "react-redux";
import actions from "../../../../react_app/actions";
import _ from "lodash";
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    selected: {
        backgroundColor: "#FA5B42 !important",
        color: "#FFFFFF !important",
        "&:active, &:focus": {
            outline: "0 !important"
        }
    },
});

const HitTheRoad = (props) => {
    const {
        setTariffChecked,
        tariffChecked
    } = props;

    const classes = useStyles();
    const dispatch = useDispatch();
    const [openModal, setOpenModal] = useState(false);

    const {driverData} = useSelector(state => state);
    const {preregistered_info} = driverData;
    const {
        tips={},
        hit_the_road_tariff,
    } = preregistered_info;

    const carTips = tips[3]; // type = 4
    let errorMsg;


    useEffect(() => {
        document.documentElement.scrollTop = 0;

        dispatch(actions.tipsRequest(4));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const selectOnChange = (value, name) => {
        dispatch(actions.setPreregisteredDriverProperty(name, value));
    };

    const isValid = () => {
        errorMsg = "";
        if (hit_the_road_tariff === null || hit_the_road_tariff === ""){
            errorMsg = "This field is mandatory";
            return false;
        }
        else if (hit_the_road_tariff < 25000){
            errorMsg = "Minimal price for full day drive is 25.000 AMD";
            return false;
        }else{return true;}
    }

    return (
        <>
            <h2 className='text__blue mb-6 text-center'>Final Step</h2>
            <img className='rounded__4 mb-4' alt='328x213' src={ImgMap} />
            <h4 className='text__blue mb-6 text-center'>
                Full Day Drive
                <button className='btn btn-circle btn-sm border-0 pull-t-5' onClick={() => {setOpenModal(true); window.location.hash = "modal"}}>
                    <IconQuestionOutlined fill='#757575'/>
                </button>
            </h4>
            <p className='text-sm mh-100px mb-11'>
                “Hit The Road” is for the travelers who want to travel across the country without any specific destination preferences, stop for breaks wherever they like. As their driver, you should be available for the whole day.
            </p>

            <p className='weight-700 mb-3'>Would you like to take this opportunity?</p>

            <ToggleButtonGroup
                value={tariffChecked}
                exclusive
                onChange={(e, value) => {
                    if (value !== null) setTariffChecked(value);

                    if (value === false) {
                        dispatch(actions.setPreregisteredDriverProperty("hit_the_road_tariff", undefined));
                    }
                }}
            >
                <ToggleButton value={false} classes={{selected: classes.selected}}>No</ToggleButton>
                <ToggleButton value={true}  classes={{selected: classes.selected}} >Yes</ToggleButton>
            </ToggleButtonGroup>

            {
                tariffChecked &&
                <Input
                    type='number'
                    name='hit_the_road_tariff'
                    tariff={true}
                    min={25000}
                    precision={100}
                    value={hit_the_road_tariff}
                    onChange={(e, name) => selectOnChange(e.target ? e.target.value : e, name)}
                    label='Set your price for booking you for the whole day'
                    placeholder='Price'
                    iconPosition='right'
                    containerClass="mt-6"
                    isError={tariffChecked && !isValid()}
                    message={errorMsg}
                />
            }

            {openModal && (
                <ModalAside title='Trips' onClose={() => setOpenModal(false)}>
                    <h4 className='text__blue'>{!_.isEmpty(carTips) && carTips.title}</h4>

                    {
                        !_.isEmpty(carTips) && carTips.tips.map((tip, i) => {
                            return(
                                <div key={i}>
                                    <p className='weight-500 mb-3'>
                                        <span className='bullet bg__black mr-2 mb-01' />
                                        {tip.title}
                                    </p>
                                    <p className='mb-5' dangerouslySetInnerHTML={{__html: tip.description}}></p>
                                </div>
                            );
                        })
                    }
                </ModalAside>
            )}
        </>
    );
};

export default HitTheRoad;
