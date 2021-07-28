import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import Modal from 'shared/components/Modal';
import Textarea from 'shared/components/Textarea';
import { useTranslation } from 'react-i18next';
import actions from "../../../actions";

const DeleteAccountModal = (props) => {
    const {
        onClose,
        userType,
    } = props;
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const [itemValue, setItemValue] = useState(false);
    const [otherValue, setOtherValue] = useState("");


    const handleSubmit = e => {
        e.preventDefault();

        #debugger
        dispatch(actions.deleteUserRequest({reason: itemValue, other: otherValue}, Number(localStorage.id)));
        // dispatch(actions.logOut());
        // delete localStorage.userType;
        // delete localStorage.is_prereg;
        // delete localStorage.id;
        // window.location.href = "/";
        onClose();
    };


    return (
        <Modal title={t("home_page.delete_account.title")} showDismissButton onClose={onClose}>
            <form onSubmit={handleSubmit}>
            <div className='py-4 px-0 px-md-8'>
                <p className='text-sm mh-50px'>
                    {t("home_page.delete_account.about_delete")}
                </p>
                <p className='text-sm mh-50px'>
                    {t("home_page.delete_account.reason_question")}
                </p>
                <div className='text-sm mh-100px'>
                    <label className='mb-2 w-100'>
                        <input
                            name='itemValue'
                            className='py-4 px-0 px-md-8'
                            value={userType === 1? t("home_page.delete_account.usage_reason_traveler") : t("home_page.delete_account.usage_reason_driver")}
                            type="radio"
                            onChange={(e) => setItemValue(e.target ? e.target.value : e)}
                        />
                        <span className='py-4 px-0 px-md-4'>{userType === 1? t("home_page.delete_account.usage_reason_traveler") : t("home_page.delete_account.usage_reason_driver")}</span>
                    </label>
                    <label className='mb-2 w-100'>
                        <input
                            name='itemValue'
                            className='py-4 px-0 px-md-8'
                            value={t("home_page.delete_account.trouble_reason")}
                            type="radio"
                            onChange={(e) => setItemValue(e.target ? e.target.value : e)}
                        />
                        <span className='py-4 px-0 px-md-4'>{t("home_page.delete_account.trouble_reason")}</span>
                    </label>
                    <label className='mb-2 w-100'>
                        <input
                            name='itemValue'
                            className='py-4 px-0 px-md-8'
                            value={t("home_page.delete_account.concern_reason")}
                            type="radio"
                            onChange={(e) => setItemValue(e.target ? e.target.value : e)}
                        />
                        <span className='py-4 px-0 px-md-4'>{t("home_page.delete_account.concern_reason")}</span>
                    </label>
                        <Textarea
                            name='other'
                            label={t("home_page.delete_account.other_reason")}
                            value={otherValue}
                            className='h-152px'
                            onChange={(e) => setOtherValue(e.target ? e.target.value : e)}
                        />
                </div>


                <div className='d-flex align-items-center justify-content-between'>
                    <button className='btn btn-secondary btn-secondary__black text-uppercase' onClick={onClose}>{t("commons.buttons.cancel_btn")}</button>
                    <button type="submit" className='btn btn-secondary text-uppercase'>{t("commons.buttons.confirm_btn")}</button>
                </div>
            </div></form>
        </Modal>
    )
};

export default DeleteAccountModal;
