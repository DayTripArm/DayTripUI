import React from 'react';
import { useTranslation } from 'react-i18next';
import Modal from 'shared/components/Modal'

const RestrictDeleteModal = ({count, onClose}) => {
    const { t } = useTranslation();

    return (
         <Modal title={t("home_page.restrict_delete_account.title")} onClose={() => onClose(false)} showDismissButton>
             <div className='py-4 px-0 px-md-8'>
                 <p className='text-md mh-100px'>
                     <span>{t("home_page.restrict_delete_account.upcoming_trips_information")}</span>
                     <span style={{display: 'inline-block'}}>{t("home_page.restrict_delete_account.cancel_all_trips")}</span>
                 </p>
             </div>
        </Modal>
    )
}

export default RestrictDeleteModal;
