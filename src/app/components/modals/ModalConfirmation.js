import React from 'react';
import Modal from 'shared/components/Modal';

const ModalConfirmation = () => {

    return (
        <Modal title='Verify Your Account' >
            <div className='py-4 px-0 px-md-8'>
                    <div class="text__blue text-center mb-0">
                        <p><h3>Check your Email</h3></p>
                        <p><h6 className={`text-wrap`}>Please confirm your email address by clicking on the link we have sent</h6></p>
                        <button className={`btn`}>Resend Email</button>
                    </div>
            </div>
        </Modal>
    );
};

export default ModalConfirmation;
