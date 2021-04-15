import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import Input from 'shared/components/Input';
import ModalAside from 'shared/components/ModalAside';
import { IconQuestionOutlined } from 'shared/components/Icons';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import _ from "lodash";
import { useTranslation } from 'react-i18next';
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
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const {travelerData, driverData} = useSelector(state => state);
    const {profile:profileData} = !_.isEmpty(travelerData.profile) ? travelerData : driverData;
    const {id} = profileData;
    const [hit_the_road_tariff, setHitTheRoadTariff] = useState(value);
    const [tariffChecked, setTariffChecked] = useState(value === "" ? false : true);
    const [openModal, setOpenModal] = useState(false);
    const [edit, setEdit] = useState(false);
    const classes = useStyles();
    let errorMsg;

    const isValid = () => {
        errorMsg = "";
        if (hit_the_road_tariff === null || hit_the_road_tariff === ""){
            errorMsg = t("commons.required_fiield");
            return false;
        }
        else if (hit_the_road_tariff < 25000){
            errorMsg = t("driver_signup.step9.min_price_full_day_text", {price: "25.000 AMD"});
            return false;
        }else{return true;}
    }
    const handleSave = (e) => {
            if (tariffChecked  && isValid()) {
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
                <button className='btn btn-sm btn-secondary' disabled={disabled} onClick={() => setEdit(!edit)}>{!edit ? t("commons.buttons.edit_btn") : t("commons.buttons.cancel_btn")}</button>
            </div>
            {
                edit ?
                <div className='mt-4 mt-md-5'>
                    <div>
                        <p className='text-sm'>
                            {t("driver_signup.step9.hit_the_road_text")}
                        </p>

                        <p className='weight-700 mb-3'>{t("driver_signup.step9.hit_the_road_question")}</p>

                        <ToggleButtonGroup
                            value={tariffChecked}
                            exclusive
                            onChange={(e, value) => {
                                if (value !== null) setTariffChecked(value);
                                if(value === true && hit_the_road_tariff ===""){
                                    setHitTheRoadTariff(25000); //set initial value for input field.
                                }
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
                            <ToggleButton value={false} classes={{selected: classes.selected}}>{t("commons.toogle_no")}</ToggleButton>
                            <ToggleButton value={true}  classes={{selected: classes.selected}} >{t("commons.toogle_yes")}</ToggleButton>
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
                                label={t("driver_signup.step9.hit_the_road_toggle")}
                                placeholder={t("my_car_details.tarrifs.price_input")}
                                iconPosition='right'
                                containerClass="mt-6"
                                isError={tariffChecked && !isValid()}
                                message={errorMsg}
                            />
                            <button className='btn btn-primary text-uppercase btn-xs-block' onClick={() => handleSave()}>{t("commons.buttons.save_btn")}</button>
                            </>
                        }
                    </div>

                </div>
                :
                <p className='text__grey-dark mb-0'>{value !==""? value : t("my_car_page.tarrifs.activate_htr_text")}</p>
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
