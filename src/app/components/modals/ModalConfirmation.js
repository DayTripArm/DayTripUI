import React from 'react';
import Modal from 'shared/components/Modal';

const ModalConfirmation = () => {

    return (
        <Modal title='Create your profile' >
            <div className='py-4 px-0 px-md-8'>
                    <div class="text__blue text-center mb-0">
                        <p><h3>Check your email</h3></p>
                        <p><h6 className={`text-wrap`}>Tap the link in the email we sent you. Confirming your email address helps us send you trip information.</h6></p>
                    </div>
            </div>
        </Modal>
    );
};

export default ModalConfirmation;
