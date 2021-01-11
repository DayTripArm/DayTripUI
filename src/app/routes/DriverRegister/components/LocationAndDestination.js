import React, {useEffect, useState} from 'react';
import Input from 'shared/components/Input';
import SelectCustom from 'shared/components/SelectCustom';
import MultiSelect from 'shared/components/MultiSelect';
import ModalAside from 'shared/components/ModalAside';
import { IconQuestionOutlined } from 'shared/components/Icons';
import {useDispatch, useSelector} from "react-redux";
import actions from "../../../../react_app/actions";
import _ from "lodash";
import Api from '../../../../Api';

const LocationAndDestination = (props) => {
    const {invalidFields} = props;

    const dispatch = useDispatch();
    const [openModal, setOpenModal] = useState(false);

    const {driverData} = useSelector(state => state);
    const {preregistered_info} = driverData;
    const {
        location,
        destination_list=[],
        driver_destinations="",
        tips={},
        tariff1,
        tariff2,
    } = preregistered_info;

    const carTips = tips[2]; // type = 2


    useEffect(() => {
        document.documentElement.scrollTop = 0;

        dispatch(actions.destinationRequest());
        dispatch(actions.tipsRequest(2));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const selectOnChange = (value, name) => {
        let valueStr = value;
        if (name === "driver_destinations") {
            valueStr = "";

            value && value.map(item => valueStr += item.value + ",");
            valueStr = valueStr.slice(0, -1);
        } else if (name === "location") {
            valueStr = "";
            valueStr = value.label + " - " + value.country;
        }

        dispatch(actions.setPreregisteredDriverProperty(name, valueStr));
    };

    const destinationList = destination_list.map(item => {return {label: item.title, value: item.id}});

    let destinationValue = [];
    driver_destinations.split(",").map(id => destinationValue.push(_.find(destinationList, dest => dest.value === Number(id))));

    let locationValue;
    if (location && location.length) {
        locationValue = {label: location.split("-")[0].trim()}
    }
    let errorMsgTariff1, errorMsgTariff2 = "";

    const loadOptions = (inputText, callback) => {
        setTimeout(async () => {
            const response = await Api.getCountryCities(inputText);

            callback(response.response.data.cities.slice(0, 100).map(item => { // limit data to 100
                return {
                    label: item.city,
                    value: item.id,
                    country: item.country
                }
            }));

        }, 500);
    };

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

    return(
        <>
            <h4 className='text__blue mb-6'>Few More Details</h4>

            <SelectCustom
                async={true}
                type='text'
                name='location'
                onChange={event => selectOnChange(event, "location")}
                value={locationValue}
                label='City of Residence'
                placeholder='Search your city'
                loadOptions={loadOptions}
                message={_.includes(invalidFields, "location") ? "This field is mandatory" : ""}
                isError={_.includes(invalidFields, "location")}
            />

            <MultiSelect
                isMulti={true}
                name='driver_destinations'
                label='Destinations'
                placeholder='I can drive to'
                onChange={event => selectOnChange(event, "driver_destinations")}
                value={destinationValue}
                options={destinationList}
                message={_.includes(invalidFields, "driver_destinations") ? "This field is mandatory" : ""}
                isError={_.includes(invalidFields, "driver_destinations")}
            />

            <h4 className='text__blue mb-6'>
                Set Your Price per 1 Km{' '}
                <button className='btn btn-circle btn-sm border-0 pull-t-5' onClick={() => {setOpenModal(true); window.location.hash = "modal"}}>
                    <IconQuestionOutlined fill='#757575'/>
                </button>
            </h4>

            <Input
                type='number'
                name='tariff1'
                value={tariff1}
                min={50}
                precision={5}
                tariff={true}
                onChange={(e, name) => selectOnChange(e.target ? e.target.value : e, name)}
                label='Set your price per 1 Km for short-distance trips (up to 110 Km, including waiting time)'
                placeholder='Price'
                iconPosition='right'
                isError={!isValidTariff1()}
                message={errorMsgTariff1}
            />

            {
                Number(tariff1) > 0 &&
                    <>
                        <p className='text__grey-dark'>The following examples show how much you will earn based on your 1 Km tariff.</p>
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
                            <li className='rounded__4 border-style border__default p-4'>
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
                    </>
            }

            <Input
                type='number'
                name='tariff2'
                value={tariff2}
                min={50}
                precision={5}
                tariff={true}
                onChange={(e, name) => selectOnChange(e.target ? e.target.value : e, name)}
                label='Set your price per 1 Km for long-distance trips (over 110 Km, including waiting time)'
                placeholder='Price'
                iconPosition='right'
                containerClass="mt-6"
                isError={!isValidTariff2()}
                message={errorMsgTariff2}
            />

            {
                Number(tariff2) > 0 &&
                <>
                    <p className='text__grey-dark'>The following examples show how much you will earn based on your 1 Km tariff.</p>
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
                        <li className='rounded__4 border-style border__default p-4'>
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
                </>
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

export default LocationAndDestination;
