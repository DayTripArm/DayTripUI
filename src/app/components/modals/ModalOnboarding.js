import React, { useState } from 'react';
import Modal from 'shared/components/Modal';
import ImgMap from 'assets/images/map.svg';
import ImgPhone from 'assets/images/phone.svg';
import ImgCar from 'assets/images/car.svg';
import { Link } from 'react-router-dom';

const ModalContent1 = ({step}) => (
    <div className={`${step !== 1 ? 'd-none' : ''}`}>
        <img height={213} className='rounded__4 mb-4' alt='328x213' src={ImgMap} />
        <p className='text-center weight-700 mb-3'>Predesigned Day Trips</p>
        <p className='text-center text-sm mh-100px mb-11'>
            Discover what you can do in Armenia in one day. Choose among the possible one day trip options
            we made for you.
        </p>
    </div>
);
const ModalContent2 = ({step}) => (
    <div className={`${step !== 2 ? 'd-none' : ''}`}>
        <img height={213} className='rounded__4 mb-4' alt='328x213' src={ImgPhone} />
        <p className='text-center weight-700 mb-3'>Find Your Driver</p>
        <p className='text-center text-sm mh-100px mb-11'>
            Find your private driver to take you sighsteeing. Simply choose from the predesigned trips our
            proffesionals have created, see the date, pick your driver and go.
        </p>
    </div>
);
const ModalContent3 = ({step}) => (
    <div className={`${step !== 3 ? 'd-none' : ''}`}>
        <img height={213} className='rounded__4 mb-4' alt='328x213' src={ImgCar} />
        <p className='text-center weight-700 mb-3'>Who Are Our Drivers?</p>
        <p className='text-center text-sm mh-100px mb-11'>
            Daytrip Drivers are trusted people with different proffesions and interests who(have an
            available car) chose to dedicate their free time to traveling around Armenia and making new
            connections.
        </p>
    </div>
);

const ModalOnboarding = ({ onClose }) => {
    const [step, setStep] = useState(1);

    return (
        <Modal title='Welcome to Daytrip' showDismissButton onClose={() => onClose(false)}>
            <div className='py-4 px-0 px-md-8'>
                <ModalContent1 step={step} />
                <ModalContent2 step={step} />
                <ModalContent3 step={step} />
                {step === 3 ? (
                    <p className='text-center'>
                        <Link to='/home' className='btn btn-primary' onClick={() => onClose(false)}>
                            Get Started
                        </Link>
                    </p>
                ) : (
                    <div className='d-flex align-items-center justify-content-between'>
                        <button className='btn btn-secondary btn-secondary__black text-uppercase'>Skip</button>
                        <div className='d-flex align-items-center'>
                            <span className={`bullet bg__grey mr-4${step >= 1 ? ' active' : ''}`} />
                            <span className={`bullet bg__grey mr-4${step >= 2 ? ' active' : ''}`} />
                            <span className='bullet bg__grey ' />
                        </div>
                        <button className='btn btn-secondary text-uppercase' onClick={() => setStep(step + 1)}>
                            Next
                        </button>
                    </div>
                )}
            </div>
        </Modal>
    );
};

export default ModalOnboarding;
