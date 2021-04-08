import React, { useState } from 'react';
import Modal from 'shared/components/Modal';
import ImgMap from 'assets/images/map.svg';
import ImgPhone from 'assets/images/phone.svg';
import ImgCar from 'assets/images/car.svg';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const ModalContent1 = ({step, title, text}) => (
    <div className={`${step !== 1 ? 'd-none' : ''}`}>
        <img height={213} className='rounded__4 mb-4' alt='328x213' src={ImgMap} />
        <p className='text-center weight-700 mb-3'>{title}</p>
        <p className='text-center text-sm mh-100px mb-11'>{text}</p>
    </div>
);
const ModalContent2 = ({step, title, text}) => (
    <div className={`${step !== 2 ? 'd-none' : ''}`}>
        <img height={213} className='rounded__4 mb-4' alt='328x213' src={ImgPhone} />
        <p className='text-center weight-700 mb-3'>{title}</p>
        <p className='text-center text-sm mh-100px mb-11'>{text}</p>
    </div>
);
const ModalContent3 = ({step, title, text}) => (
    <div className={`${step !== 3 ? 'd-none' : ''}`}>
        <img height={213} className='rounded__4 mb-4' alt='328x213' src={ImgCar} />
        <p className='text-center weight-700 mb-3'>{title}</p>
        <p className='text-center text-sm mh-100px mb-11'>{text}</p>
    </div>
);

const ModalOnboarding = ({ onClose }) => {
    const [step, setStep] = useState(1);
    const { t } = useTranslation();
    return (
        <Modal title={t("home_page.onboarding.popup_title")} showDismissButton onClose={() => onClose(false)}>
            <div className='py-4 px-0 px-md-8'>
                <ModalContent1 step={step} title={t("home_page.onboarding.popup1.title")} text={t("home_page.onboarding.popup1.text")} />
                <ModalContent2 step={step} title={t("home_page.onboarding.popup2.title")} text={t("home_page.onboarding.popup2.text")}/>
                <ModalContent3 step={step} title={t("home_page.onboarding.popup3.title")} text={t("home_page.onboarding.popup3.text")} />
                {step === 3 ? (
                    <p className='text-center'>
                        <Link to='/home' className='btn btn-primary' onClick={() => onClose(false)}>
                            {t("home_page.onboarding.get_started_btn")}
                        </Link>
                    </p>
                ) : (
                    <div className='d-flex align-items-center justify-content-between'>
                        <button className='btn btn-secondary btn-secondary__black text-uppercase'>{t("commons.buttons.skip_btn")}</button>
                        <div className='d-flex align-items-center'>
                            <span className={`bullet bg__grey mr-4${step >= 1 ? ' active' : ''}`} />
                            <span className={`bullet bg__grey mr-4${step >= 2 ? ' active' : ''}`} />
                            <span className='bullet bg__grey ' />
                        </div>
                        <button className='btn btn-secondary text-uppercase' onClick={() => setStep(step + 1)}>
                            {t("commons.buttons.next_btn")}
                        </button>
                    </div>
                )}
            </div>
        </Modal>
    );
};

export default ModalOnboarding;
