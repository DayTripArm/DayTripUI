import React from 'react';
import Modal from 'shared/components/Modal';
import { useTranslation } from 'react-i18next';

const InfoModal = (props) => {
    const {
        onClose,
        onProceed,
        title='Welcome to Daytrip',
    } = props;
    const { t } = useTranslation();
    return (
        <Modal title={title} showDismissButton onClose={onClose}>
            <div className='py-4 px-0 px-md-8'>
                <p className='text-sm mh-100px'>
                   {t("my_car_page.car_details.change_profile_text1")}
                </p>
                <p className='text-sm mh-100px'>
                    <b style={{color: "#FE4C30"}}>{t("my_car_page.car_details.change_profile_text2_note")}</b> {t("my_car_page.car_details.change_profile_text2")}
                </p>


                <div className='d-flex align-items-center justify-content-between'>
                    <button className='btn btn-secondary btn-secondary__black text-uppercase' onClick={onClose}>{t("commons.buttons.cancel_btn")}</button>
                    <button className='btn btn-secondary text-uppercase' onClick={() => {
                        onProceed();
                        onClose();
                    }}>{t("commons.buttons.proceed_btn")}</button>
                </div>
            </div>
        </Modal>
    )
};

export default InfoModal;
