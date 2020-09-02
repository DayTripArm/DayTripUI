import React from "react";
import {useDispatch} from "react-redux";
import {useDropzone} from "react-dropzone";
import { IconTimes, IconUpload } from 'shared/components/Icons';
import _ from "lodash";
import actions from "../../actions";


function FormDropZone(props) {
    const dispatch = useDispatch();
    const {
        type,
        label,
        photos=[],
        onChange=undefined,
    } = props;

    const {getRootProps, getInputProps} = useDropzone({
        onDrop: acceptedFiles => {
            let uploadedPhotos = [];

            acceptedFiles.map(file => Object.assign(file, {preview: URL.createObjectURL(file)}));
            uploadedPhotos = _.uniqBy(photos.concat(acceptedFiles), "name");

            if (onChange) {
                onChange(type, uploadedPhotos);
            } else {
                // store photos in redux store
                dispatch(actions.driverUploadPhotos(`${type}`, uploadedPhotos));
            }

        },
        accept: "image/*",
        noKeyboard: true
    });

    const handleImgDelete = (name) => {
        if (onChange) {
            onChange(type, _.reject(photos, file => file.name === name), _.filter(photos, file => file.name === name)[0]);
        } else {
            // store photos in redux store
            dispatch(actions.driverUploadPhotos(`${type}`, _.reject(photos, file => file.name === name)));
        }
    };

    return (
        <div className={`${photos.length === 0 ? "" : "row row-2"}`}>
            <div className={`${photos.length === 0 ? "" : "col-6 px-2"}`}>
                <label
                    htmlFor={type}
                    tabIndex='0'
                    {
                        ...getRootProps({className: `upload-label rounded__4 border-style border__dashed border__default text__grey-dark d-flex flex-column align-items-center justify-content-center${
                            photos.length > 0 ? ' upload-label__sm' : ''
                        }`})
                    }
                >
                    <IconUpload fill='#757575' />
                    {photos.length === 0 && <span className='text-sm weight-500'>{label}</span>}
                    <input name={type} {...getInputProps()} />
                </label>
            </div>

            {
                photos.map(file => (
                    <div className='box-removable col-6 px-2' key={file.name}>
                        <img
                            className='upload-img rounded__4 object-fit-contain object-position-center bg__grey mb-4'
                            src={file.preview}
                            alt='Upload file'
                        />
                        <button className='remove-btn position-absolute t-8 r-16 btn btn-circle btn-sm border-0' onClick={() => handleImgDelete(file.name)}>
                            <IconTimes />
                        </button>
                    </div>
                ))
            }
        </div>
    );
}



export default FormDropZone;
