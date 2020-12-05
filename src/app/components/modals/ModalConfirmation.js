import React from 'react';
import Modal from 'shared/components/Modal';
import actions from "../../../actions";
import {useDispatch} from "react-redux";

const ModalConfirmation = ({email, onClose}) => {
    const dispatch = useDispatch();
    return (
        <Modal title='Verify Your Account' showDismissButton onClose={() => onClose(false)}>
            <div className='py-4 px-0 px-md-8'>
                    <div className="text__blue text-center mb-0">
                        <h3>Check your Email</h3>
                        <h6 className={`text-wrap`}>Please confirm your email address by clicking on the link we have sent</h6>
                        <p>&nbsp;</p>
                        <div className="form-field mr-lg-4 mb-lg-0">
                            <div className="position-relative">
                                <p><input type="text" disabled="disabled" className="is-readonly" autoComplete="off" readOnly="" value={email}/></p>
                            </div>
                        </div>
                        <p>&nbsp;</p>
                        <button className={`btn btn-primary btn-block__md text-uppercase`}onClick={() => {
                            dispatch(actions.resendConfirmation(email));
                        }}>Resend Email</button>
                    </div>
            </div>
        </Modal>
    );
};

export default ModalConfirmation;
