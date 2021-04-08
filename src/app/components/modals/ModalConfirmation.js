import React from 'react';
import Modal from 'shared/components/Modal';
import actions from "../../../actions";
import {useDispatch} from "react-redux";
import { useTranslation } from 'react-i18next';

const ModalConfirmation = ({email, onClose}) => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    return (
        <Modal title={t("home_page.confirm_account.title")} showDismissButton onClose={() => onClose(false)}>
            <div className='py-4 px-0 px-md-8'>
                    <div className="text__blue text-center mb-0">
                        <h3>{t("home_page.confirm_account.check_email")}</h3>
                        <h6 className={`text-wrap`}>{t("home_page.confirm_account.confirm_email_text")}</h6>
                        <p>&nbsp;</p>
                        <div className="form-field mr-lg-4 mb-lg-0">
                            <div className="position-relative">
                                <p><input type="text" disabled="disabled" className="is-readonly" autoComplete="off" readOnly="" value={email}/></p>
                            </div>
                        </div>
                        <p>&nbsp;</p>
                        <button className={`btn btn-primary btn-block__md text-uppercase`}onClick={() => {
                            dispatch(actions.resendConfirmation(email));
                        }}>{t("home_page.confirm_account.resend_btn")}</button>
                    </div>
            </div>
        </Modal>
    );
};

export default ModalConfirmation;
