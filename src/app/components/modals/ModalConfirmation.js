import React from 'react';
import Modal from 'shared/components/Modal';

const ModalConfirmation = ({onClose}) => {

    return (
        <Modal title='Verify Your Account' showDismissButton onClose={() => onClose(false)}>
            <div className='py-4 px-0 px-md-8'>
                    <div className="text__blue text-center mb-0">
                        <h3>Check your Email</h3>
                        <h6 className={`text-wrap`}>Please confirm your email address by clicking on the link we have sent</h6>
                        <p>&nbsp;</p>
                        <div className="form-field mr-lg-4 mb-lg-0">
                            <div className="position-relative">
                                <p><input type="text" disabled="disabled" className="is-readonly" autoComplete="off" readOnly="" value="mkharamy@gmail.com"/></p>
                            </div>
                        </div>
                        <p>&nbsp;</p>
                        <button className={`btn btn-primary btn-block__md text-uppercase`}>Resend Email</button>
                    </div>
            </div>
        </Modal>
    );
};

export default ModalConfirmation;
