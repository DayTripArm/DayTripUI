import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useDropzone} from "react-dropzone";
import ReactCrop from 'react-image-crop';
import Modal from 'shared/components/Modal';
import 'scss/packages/_react-image-crop-custom.scss';
import { IconUser } from 'shared/components/Icons';
import _ from "lodash";

import {
    image64toCanvasRef,
    base64StringtoFile,
} from '../../helper';

import actions from "../../actions";


const CropContainer = ({setShowCropContainer, profilePhoto}) => {
    const dispatch = useDispatch();

    const {travelerData, driverData} = useSelector(state => state);

    const {profile:profileData} = !_.isEmpty(travelerData.profile) ? travelerData : driverData;
    const {id} = profileData;

    const imagePreviewCanvasRef = React.createRef();
    const [imgSrc, setImgSrc] = useState({});
    const [crop, setCrop] = useState({
        unit: '%',
        aspect: 1,
        width: 30,
        height: 30,
        x: 10,
        y: 10,
    });

    const handleOnCropComplete = (crop, pixelCrop) => {
        image64toCanvasRef(imagePreviewCanvasRef.current, profilePhoto.src, crop, imgSrc);
    };

    const handleOnCrop = (crop) => {
        setCrop(crop);
    };

    const handleImageLoaded = (image) => {
        setImgSrc({
            width: image.width,
            height: image.height,
            naturalHeight: image.naturalHeight,
            naturalWidth: image.naturalWidth,
        })
    };

    const handleSave = () => {
        const canvasRef = imagePreviewCanvasRef.current;
        const {name} = profilePhoto;

        const imageData64 = canvasRef.toDataURL();

        const newFile = base64StringtoFile(imageData64, name);

        const data = {
            profile: "personal",
            profile_photos: newFile
        };

        dispatch(actions.updateProfileInfo(id, data));
        setShowCropContainer(false);
    };

    return (
        <Modal title='Crop the Profile Picure' showDismissButton onClose={() => setShowCropContainer(false)}>
            <div className='py-4 px-0 px-md-8'>
                <ReactCrop
                    src={profilePhoto.src}
                    onComplete={handleOnCropComplete}
                    crop={crop}
                    onImageLoaded={handleImageLoaded}
                    onChange={handleOnCrop}
                    handleOnCrop={handleOnCrop}
                />

                <canvas style={{display: 'none'}} ref={imagePreviewCanvasRef}> </canvas>

                <div className='d-flex align-items-center justify-content-end'>
                    <button className='btn btn-secondary text-uppercase' onClick={() => handleSave()}>Save</button>
                </div>
            </div>
        </Modal>
    );
};

const FormDropZoneInlineText = (props) => {
    const {
        type,
        profile_photo_src,
    } = props;

    const [profilePhoto, setProfilePhoto] = useState({});
    const [showCropContainer, setShowCropContainer] = useState(false);

    const {getRootProps, getInputProps, open} = useDropzone({
        onDrop: acceptedFiles => {
            const currentFile = acceptedFiles[0];
            const reader = new FileReader();

            reader.addEventListener("load", () => {
                setProfilePhoto({
                    src: reader.result,
                    name: currentFile.name,
                });

                setShowCropContainer(true);
            }, false);

            reader.readAsDataURL(currentFile);
        },
        accept: "image/*",
        noKeyboard: true,
        noClick: true,
        multiple: false
    });

    return (
        <>
            <div {...getRootProps({className: 'd-flex flex-column align-items-center mb-5'})}>
                {
                    profile_photo_src ?
                        <img className="rounded__50" src={process.env.NODE_ENV === "development" ? "http://localhost:3000" + profile_photo_src : profile_photo_src} alt="" />
                        :
                        <IconUser width='72' height='72' fill='#757575' className='mb-4 op-5' />
                }
                <label className='btn btn-sm text__grey-dark mb-0' onClick={open}>Upload</label>
                <input name={type} id='file' {...getInputProps({className: 'd-none'})} />
            </div>

            {showCropContainer && <CropContainer
                setShowCropContainer={setShowCropContainer}
                profilePhoto={profilePhoto}
            />}
       </>
    );
};



export default FormDropZoneInlineText;
