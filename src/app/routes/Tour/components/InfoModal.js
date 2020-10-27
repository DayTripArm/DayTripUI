import React from 'react';
import Modal from 'shared/components/Modal';

const InfoModal = (props) => {
    const {
        onClose,
        data={},
    } = props;

    const {
        description="",
        image_url,
    } = data;

    const src = process.env.NODE_ENV === "development"
        ? "http://localhost:3000" + image_url
        : image_url;

    return (
        <Modal title='Welcome to Daytrip' showDismissButton onClose={onClose}>
            <div className='py-4 px-0 px-md-8'>
                <img
                    className='rounded__4 mb-4'
                    alt=''
                    src={src}
                />
                <p className='text-sm mh-100px text-break' dangerouslySetInnerHTML={{__html: description}}></p>
            </div>
        </Modal>
    )
};

export default InfoModal;
