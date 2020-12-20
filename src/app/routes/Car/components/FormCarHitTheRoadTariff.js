import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import Input from 'shared/components/Input';
import ModalAside from 'shared/components/ModalAside';
import { IconQuestionOutlined } from 'shared/components/Icons';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import _ from "lodash";
import actions from "../../../../actions";
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

const FormCarHitTheRoadTariff = (props) => {
    const {
        label,
        value,
        disabled=false,
        carTips
    } = props;

    const dispatch = useDispatch();
    const {travelerData, driverData} = useSelector(state => state);
    const {profile:profileData} = !_.isEmpty(travelerData.profile) ? travelerData : driverData;
    const {id} = profileData;
    const [hit_the_road_tariff, setHitTheRoadTariff] = useState(value);
    const [tariffChecked, setTariffChecked] = useState(value === "" ? false : true);
    const [openModal, setOpenModal] = useState(false);
    const [edit, setEdit] = useState(false);
    const classes = useStyles();

    const handleSave = (e) => {
            if (tariffChecked  && hit_the_road_tariff!=="") {
                let data = {
                    login_id: id,
                    car_info: {
                        hit_the_road_tariff
                    }
                };
                dispatch(actions.updateDriverInfosRequest(data));
                setEdit(!edit);
            }else{return false;}
    };

    return (
        <li className='pt-3 pb-4'>
            <div className='d-flex align-items-center justify-content-between mb-2'>
                <p className='mb-0 weight-700'>{label}
                <button className='btn btn-circle btn-sm border-0 pull-t-1' onClick={() => {setOpenModal(true); window.location.hash = "modal"}}>
                    <IconQuestionOutlined fill='#757575'/>
                </button></p>
                <button className='btn btn-sm btn-secondary' disabled={disabled} onClick={() => setEdit(!edit)}>{!edit ? "Edit" : "Cancel"}</button>
            </div>
            {
                edit ?
                <div className='mt-4 mt-md-5'>
                    <div>
                        <p className='text-sm'>
                            “Hit The Road” is for the travelers who want to travel across the country without any specific destination preferences, stop for breaks wherever they like. As their driver, you should be available for the whole day.
                        </p>

                        <p className='weight-700 mb-3'>Would you like to take this opportunity?</p>

                        <ToggleButtonGroup
                            value={tariffChecked}
                            exclusive
                            onChange={(e, value) => {
                                if (value !== null) setTariffChecked(value);
                                if (value === false) {
                                    setHitTheRoadTariff("");
                                    let data = {
                                        login_id: id,
                                        car_info: {
                                            hit_the_road_tariff : ""
                                        }
                                    };
                                    dispatch(actions.updateDriverInfosRequest(data));
                                }
                            }}
                        >
                            <ToggleButton value={false} classes={{selected: classes.selected}}>No</ToggleButton>
                            <ToggleButton value={true}  classes={{selected: classes.selected}} >Yes</ToggleButton>
                        </ToggleButtonGroup>

                        {tariffChecked &&
                            <>
                            <Input
                                type='number'
                                name={hit_the_road_tariff}
                                value={hit_the_road_tariff}
                                tariff={true}
                                min={25000}
                                precision={100}
                                onChange={(e) => setHitTheRoadTariff(e.target ? e.target.value : e)}
                                label='Set your price for booking you for the whole day'
                                placeholder='Price'
                                iconPosition='right'
                                containerClass="mt-6"
                                message={tariffChecked && hit_the_road_tariff < 1 ? "This field is mandatory" : ""}
                                isError={tariffChecked && hit_the_road_tariff < 1}
                            />
                            <button className='btn btn-primary text-uppercase btn-xs-block' onClick={() => handleSave()}>Save</button>
                            </>
                        }
                    </div>

                </div>
                :
                <p className='text__grey-dark mb-0'>{value !==""? value : "Are you interested in a full-day drive? Activate this opportunity, so the travelers can book you for the whole day."}</p>
            }
            {openModal && (
                <ModalAside title='Tips' onClose={() => setOpenModal(false)}>
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
        </li>
    );
};

export default FormCarHitTheRoadTariff;
