import React from "react";
import {useDispatch} from "react-redux";
import {useDropzone} from "react-dropzone";
import { IconTimes } from 'shared/components/Icons';
import _ from "lodash";
import actions from "../../actions";


function FormDropZoneInlineText(props) {
    const dispatch = useDispatch();
    const {
        type,
        photos=[]
    } = props;

    const {getRootProps, getInputProps, open} = useDropzone({
        onDrop: acceptedFiles => {
            const newPhotos = [];

            const existingPhotoNames = _.reduce(photos, (memo, item) => {
                if (!memo) memo = [];
                memo.push(item.name);

                return memo;
            }, []);

            acceptedFiles.map(file => {
                if (!_.includes(existingPhotoNames, file.name)) {
                    Object.assign(file, {preview: URL.createObjectURL(file)});
                    newPhotos.push(file);
                }
            });

            if (!_.isEmpty(newPhotos)) {
                dispatch(actions.updateDriverInfosRequest({[type]: newPhotos}));
            }

        },
        accept: "image/*",
        noKeyboard: true,
        noClick: true,
    });

    const handleImgDelete = (name) => {
        const deleted_photo = _.find(photos, item => item.name === name);

        dispatch(actions.deleteDriverInfosRequest({photo: deleted_photo, login_id: Number(localStorage.id)}));
    };

    return (
        <>
            <div {...getRootProps({className: 'd-flex align-items-end justify-content-between mb-4'})}>
                <p className='weight-700 mb-0'>Car Image</p>
                <input name={type} {...getInputProps()} />
                <button type="button" className='btn btn-secondary btn-sm' onClick={open}>Add a new image</button>
            </div>


            <div className='row'>
                {
                    photos.map(file => (
                        <div className='box-removable col-6 col-md-4 mb-4' key={file.name}>
                            <img
                                src={file.preview}
                                alt='car'
                                className='upload-img-medium rounded__4 object-fit-contain object-position-center bg__grey mb-4'
                            />
                            <button className='remove-btn position-absolute t-8 r-16 btn btn-circle btn-sm border-0' onClick={() => handleImgDelete(file.name)}>
                                <IconTimes />
                            </button>
                        </div>
                    ))
                }
            </div>
       </>
    );
}



export default FormDropZoneInlineText;
