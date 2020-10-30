import React from 'react';
import Modal from 'shared/components/Modal';

const InfoModal = (props) => {
    const {
        onClose,
        onProceed,
        title='Welcome to Daytrip',
    } = props;

    return (
        <Modal title={title} showDismissButton onClose={onClose}>
            <div className='py-4 px-0 px-md-8'>
                <p className='text-sm mh-100px'>
                    If you change this field you’r profile will be temporarily suspended for further verification. If you make any changes here, you will be asked to update all car related information.
                </p>
                <p className='text-sm mh-100px'>
                    <b style={{color: "#FE4C30"}}>NOTE:</b> Please be notified that all your upcoming bookings will be cancelled if you proceed
                </p>


                <div className='d-flex align-items-center justify-content-between'>
                    <button className='btn btn-secondary btn-secondary__black text-uppercase' onClick={onClose}>Cancel</button>
                    <button className='btn btn-secondary text-uppercase' onClick={() => {
                        onProceed();
                        onClose();
                    }}>Proceed</button>
                </div>
            </div>
        </Modal>
    )
};

export default InfoModal;
