import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import actions from "../../actions";
import _ from "lodash";
import Input from "./Input";

const FormCarInputBoxTariff = (props) => {

    const dispatch = useDispatch();
    const {travelerData, driverData} = useSelector(state => state);
    const [edit, setEdit] = useState(false);

    const {
        type,
        label,
        value,
        disabled=false,
    } = props;


    const [tariff1, setTariff1] = useState(value[0]);
    const [tariff2, setTariff2] = useState(value[1]);
    let errorMsgTariff1, errorMsgTariff2 = "";

    const isValidTariff1 = () => {
        errorMsgTariff1 = "";
        if (tariff1 === ""){
            errorMsgTariff1 = "This field is mandatory";
            return false;
        }
        else if (tariff1 < 50 ){
            errorMsgTariff1 = "Minimal price for 1km is 50 AMD";
            return false;
        }else{return true;}
    }
    const isValidTariff2 = () => {
        errorMsgTariff2 = "";
        if ( tariff2 === ""){
            errorMsgTariff2 = "This field is mandatory";
            return false;
        }
        else if (tariff2 < 50){
            errorMsgTariff2 = "Minimal price for 1km is 50 AMD";
            return false;
        }else{return true;}
    }

    const handleSave = (e) => {
        const {profile:profileData} = !_.isEmpty(travelerData.profile) ? travelerData : driverData;
        const {id} = profileData;
        let data = {
            login_id: id,
            car_info: {
                tariff1,
                tariff2
            }
        };

            dispatch(actions.updateDriverInfosRequest(data));
            setEdit(!edit);
    };


    return (
        <li className='border__bottom border__default pt-3 pb-4'>
            <div className='d-flex align-items-center justify-content-between mb-2'>
                <p className='mb-0 weight-700'>Price per 1 km</p>
                <button className='btn btn-sm btn-secondary' disabled={disabled} onClick={() => setEdit(!edit)}>{!edit ? "Edit" : "Cancel"}</button>
            </div>
            <br/>
            <div className='d-flex align-items-center justify-content-between mb-2 mt-2'>
                <p className='mb-0 weight-700'>{label[0]}</p>
            </div>
            {
                edit ?
                <div className='mt-4 mt-md-5'>
                    <div className='d-md-flex mxw-328px'>
                        {
                            type === "tariff" &&
                            <>
                                <Input
                                    type='number'
                                    name='tariff1'
                                    value={tariff1}
                                    tariff={true}
                                    min={50}
                                    precision={5}
                                    onChange={(e) => setTariff1(e.target ? e.target.value : e)}
                                    placeholder='Price'
                                    iconPosition='right'
                                    isError={!isValidTariff1()}
                                    message={errorMsgTariff1}
                                />
                            </>
                        }
                    </div>
                    {
                        Number(tariff1) > 0 &&
                        <div className='w-100 mxw-328px'>
                            <p className='text__grey-dark'>According to the 1km price, you will earn the following amounts for these example trips.</p>
                            <ul className='no-list-style mb-0'>
                                <li className='rounded__4 border-style border__default p-4 mb-2'>
                                    <div className='d-flex justify-content-between'>
                                        <p className='text-xs text__blue mb-0'>Yerevan - Garni - Geghard - Yerevan</p>
                                        <p className='text-xs text__blue weight-500 mb-0'>{Number(tariff1) * 76}AMD</p>
                                    </div>
                                    <hr className='border__top border__default mt-2 mb-3'/>
                                    <div className='d-flex'>
                                        <p className='text-xs text__grey-dark mr-7 mb-0'>
                                            <span className='weight-500'>Trip duraction</span>: 6 hours
                                        </p>
                                        <p className='text-xs text__grey-dark mb-0'>
                                            <span className='weight-500'>Distance</span>: 76 km
                                        </p>
                                    </div>
                                </li>
                                <li className='rounded__4 border-style border__default p-4 mb-5'>
                                    <div className='d-flex justify-content-between'>
                                        <p className='text-xs text__blue mb-0'>Yerevan - Hripsime - Etchmiatsin - Gayane - Zvartnots - Yerevan</p>
                                        <p className='text-xs text__blue weight-500 mb-0'>{Number(tariff1) * 46}AMD</p>
                                    </div>
                                    <hr className='border__top border__default mt-2 mb-3'/>
                                    <div className='d-flex'>
                                        <p className='text-xs text__grey-dark mr-7 mb-0'>
                                            <span className='weight-500'>Trip duraction</span>: 4 hours
                                        </p>
                                        <p className='text-xs text__grey-dark mb-0'>
                                            <span className='weight-500'>Distance</span>: 46 km
                                        </p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    }
                </div>
                :
                <p className='text__grey-dark mb-0'>{value[0]}</p>
            }



            <div className='d-flex align-items-center justify-content-between mb-2 mt-2'>
                <p className='mb-0 weight-700'>{label[1]}</p>
            </div>
            {
                edit ?
                    <div className='mt-4 mt-md-5'>
                        <div className='d-md-flex mxw-328px'>
                            {
                                type === "tariff" &&
                                <Input
                                    type='number'
                                    name='tariff2'
                                    value={tariff2}
                                    tariff={true}
                                    min={50}
                                    precision={5}
                                    onChange={(e) => setTariff2(e.target ? e.target.value : e)}
                                    placeholder='Price'
                                    iconPosition='right'
                                    isError={!isValidTariff2()}
                                    message={errorMsgTariff2}
                                />
                            }
                        </div>
                        {
                            Number(tariff2) > 0 &&
                            <div className='w-100 mxw-328px'>
                                <p className='text__grey-dark'>According to the 1km price, you will earn the following amounts for these example trips.</p>
                                <ul className='no-list-style mb-0'>
                                    <li className='rounded__4 border-style border__default p-4 mb-2'>
                                        <div className='d-flex justify-content-between'>
                                            <p className='text-xs text__blue mb-0'>Yerevan - Khor Virap - Noravank - Tatev - Yerevan</p>
                                            <p className='text-xs text__blue weight-500 mb-0'>{Number(tariff2) * 530}AMD</p>
                                        </div>
                                        <hr className='border__top border__default mt-2 mb-3'/>
                                        <div className='d-flex'>
                                            <p className='text-xs text__grey-dark mr-7 mb-0'>
                                                <span className='weight-500'>Trip duraction</span>: 14 hours
                                            </p>
                                            <p className='text-xs text__grey-dark mb-0'>
                                                <span className='weight-500'>Distance</span>: 530 km
                                            </p>
                                        </div>
                                    </li>
                                    <li className='rounded__4 border-style border__default p-4 mb-8'>
                                        <div className='d-flex justify-content-between'>
                                            <p className='text-xs text__blue mb-0'>Yerevan - Kecharis - Sevanavank - Haghartsin - Goshavank - Yerevan</p>
                                            <p className='text-xs text__blue weight-500 mb-0'>{Number(tariff2) * 267}AMD</p>
                                        </div>
                                        <hr className='border__top border__default mt-2 mb-3'/>
                                        <div className='d-flex'>
                                            <p className='text-xs text__grey-dark mr-7 mb-0'>
                                                <span className='weight-500'>Trip duraction</span>: 11 hours
                                            </p>
                                            <p className='text-xs text__grey-dark mb-0'>
                                                <span className='weight-500'>Distance</span>: 267 km
                                            </p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        }
                        <button className='btn btn-primary text-uppercase btn-xs-block' onClick={() => handleSave()}>Save</button>
                    </div>
                    :
                    <p className='text__grey-dark mb-0'>{value[1]}</p>
            }
        </li>
    );
};

export default FormCarInputBoxTariff;
