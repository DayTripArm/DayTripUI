import React, {useState} from "react";
import {useDispatch} from "react-redux";
import FormDropZone from "./FormDropZone";
import actions from "../../actions";
import { useTranslation } from 'react-i18next';
import {HOST_URL} from "../../constants";

const FormCarInputBoxPicture = (props) => {

    const dispatch = useDispatch();
    // const {travelerData, driverData} = useSelector(state => state);
    const [edit, setEdit] = useState(false);
    const { t } = useTranslation();
    const {
        label,
        options=[],
        disabled=false,
        name,
        empty_message,
    } = props;

    const [photos, setPhotos] = useState(options);
    const [deletedPhotos, setDeletedPhotos] = useState([]);

    photos.map(file => {
        const src = process.env.NODE_ENV === "development"
            ? HOST_URL + file.full_path
            : file.full_path;

        Object.assign(file, {preview: file.preview ? file.preview : src})
    });



    const handleSave = (e) => {
        // const {profile:profileData} = !_.isEmpty(travelerData.profile) ? travelerData : driverData;
        // const {id} = profileData;

        const updatedPhotos = [
            ...photos.filter(photo => !photo.id), // get newly added photos
            ...deletedPhotos
        ];

        dispatch(actions.updateDriverInfosRequest({[name]: updatedPhotos}));
        setEdit(!edit);
    };

    const handleChange = (type, uploadPhotos, delPhoto) => {
        uploadPhotos.map(file => {
            const src = process.env.NODE_ENV === "development"
                ? HOST_URL + file.full_path
                : file.full_path;

            Object.assign(file, {
                preview: file.preview ? file.preview : src,
            })
        });

        // store only saved photos for delete
        if (delPhoto && delPhoto.id) {
            setDeletedPhotos([
                ...deletedPhotos,
                delPhoto
            ])
        }

        setPhotos(uploadPhotos);
    };


    return (
        <li className='border__bottom border__default pt-3 pb-4'>
            <div className='d-flex align-items-center justify-content-between mb-2'>
                <p className='mb-0 weight-700'>{label}</p>
                <button className='btn btn-sm btn-secondary' disabled={disabled} onClick={() => setEdit(!edit)}>{!edit ? t("commons.buttons.edit_btn") : t("commons.buttons.cancel_btn")}</button>
            </div>
            {
                edit ?
                    <div className='mt-4 mt-md-5'>
                        <div className='w-100 mxw-328px'>
                            <FormDropZone
                                type={name}
                                label={label}
                                photos={photos}
                                onChange={(type, uploadsPhotos, deletedName) => handleChange(type, uploadsPhotos, deletedName)}
                            />
                        </div>
                        <button className='btn btn-primary text-uppercase btn-xs-block' onClick={() => handleSave()}>{t("commons.buttons.save_btn")}</button>
                    </div>
                    :
                    <p className='text__grey-dark mb-0'>{empty_message}</p>
            }
        </li>
    );
};

export default FormCarInputBoxPicture;
