import React from "react";
import {useDispatch} from "react-redux";
import {useDropzone} from "react-dropzone";
import _ from "lodash";
import actions from "../actions";


function FormDropZone(props) {
    const dispatch = useDispatch();
    const {
        type,
        photos=[]
    } = props;

    const {getRootProps, getInputProps} = useDropzone({
        onDrop: acceptedFiles => {
            let uploadedPhotos = [];

            acceptedFiles.map(file => Object.assign(file, {preview: URL.createObjectURL(file)}));
            uploadedPhotos = _.uniqBy(photos.concat(acceptedFiles), "name");

            // store photos in redux store
            dispatch(actions.driverUploadPhotos(`${type}`, uploadedPhotos));

        },
        accept: "image/*",
        noKeyboard: true
    });

    const handleImgDelete = (name) => {
        // store photos in redux store
        dispatch(actions.driverUploadPhotos(`${type}`, _.reject(photos, file => file.name === name)));
    };

    return(
        <div className="photos">
            <div {...getRootProps({className: `${photos.length > 0 ? "upload-icon-small" : "upload-icon-big"}`})} >
                <input {...getInputProps()} />
            </div>
            {
                photos.map(file => (
                    <div className="thumb" key={file.name} >
                        <span className="delete" onClick={() => handleImgDelete(file.name)}> </span>
                        <div className="thumb-inner">
                            <img alt="Upload file" src={file.preview} className="thumb-img" />
                        </div>
                    </div>
                ))
            }
        </div>
    );
}



export default FormDropZone;