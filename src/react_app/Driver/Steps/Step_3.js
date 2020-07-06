import React, {useEffect, useState} from 'react';
import FormButton from "../../Form/FormButton";
import {makeStyles} from "@material-ui/core/styles";
import Fade from '@material-ui/core/Fade';
import {useDropzone} from 'react-dropzone'
import _ from "lodash";
//import axios from "axios";
//import FormData from "form-data";

const useStyles = makeStyles((theme) => ({
    next: {
        backgroundColor: '#FE4C30',
        borderRadius: "4px",
        width: "91px",
        height: "48px",
        fontSize: "16px",
        fontWeight: "bold",
        color: "#FFFFFF",
        float: "right",
        marginBottom: "100px",
        letterSpacing: "0.05em",
        textTransform: "uppercase",
        marginTop: "32px",
        '&:hover': {
            backgroundColor: '#E24432'
        },
        '&:active': {
            boxShadow: 'none'
        }
    }

}));

function Step_3(props) {
    const classes = useStyles();
    const {step, setStep} = props;

    //let data = new FormData();

    const [attachedFiles, setFiles] = useState([]);
    const [show, setShow] = useState(false);

    // const onDrop = useCallback(files => {
    //     files.forEach(file => {
    //         const reader = new FileReader();
    //
    //         reader.onloadend = () => {
    //             const binaryStr = reader.result;
    //
    //         };
    //
    //         reader.readAsDataURL(file);
    //     });
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []);

    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        onDrop: acceptedFiles => {
            setFiles(attachedFiles.concat(acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            }))));
        },
        accept: "image/*",
        noKeyboard: true
    });

    const handleImgDelete = (name) => {
        console.log(" name ", name);
        setFiles(_.reject(attachedFiles, file => file.name === name));
    };

    const handleHelp = () => {
        setShow(!show);
    };


    // attachedFiles && attachedFiles.map(file => {
    //     data.append(file.name, file);
    //
    //     axios.post("http://localhost:3000/api/profile_info/1", data, {
    //         headers: {
    //             'Content-Type': 'multipart/form-data;',
    //         }
    //     })
    // });


    useEffect(() => {
        document.documentElement.scrollTop = 0;
        attachedFiles.forEach(file => URL.revokeObjectURL(file.preview));
    }, [attachedFiles]);

    return (
        <div className="driver-preregistration">
            <span className="title">Add photos of your car <i className="help-icon" onClick={() => handleHelp()}> </i></span>
            <span className="text">Photos help travelers imagine their future ride. Upload photos that clearly show your car, and you can add more after you publish.</span>
            <Fade in={show} timeout={500}>
                <div className="trips-container">
                    <div className="trips-overlay"> </div>
                    <div className="trips">
                        <header>
                            <span className="text">Trips</span>
                            <span className="icon" onClick={() => handleHelp()}> </span>
                        </header>
                        <div className="trips-content">
                            <h4 className="title">Tips to Get Great Photos of Your Car</h4>
                            <div className="ul-content">
                                <span className="ul-header">Shoot on the right time of day</span>
                                <span className="ul-text">Most car shoots take place outdoors, so make sure you're shooting at the right time of the day. Overcast days are great for car photography, as it keeps the light relatively flat, minimizing reflections caused by harsh sunlight.</span>
                            </div>

                            <div className="ul-content">
                                <span className="ul-header">Keep it clean</span>
                                <span className="ul-text">His will save you a ton of potential post-production work, and keep your clients happy. No one wants to promote a dirty car. We suggest carrying an extra rag and a car spray to wipe off any marks when you get to your location.</span>
                            </div>

                            <div className="ul-content">
                                <span className="ul-header">Capture all the angles</span>
                                <span className="ul-text">Move around your entire car, and capture every angle before you start your shoot. This ensures that you don’t miss anything, as you’ll have at least one photograph of every angle of the car.</span>
                            </div>
                        </div>
                    </div>
                </div>
            </Fade>

            <div className="car-photos">
                <div {...getRootProps({className: `${attachedFiles.length > 0 ? "upload-icon-small" : "upload-icon-big"}`})} >
                    <input {...getInputProps()} />
                    {
                        isDragActive && <p>Drop the files here...</p>
                    }
                </div>
                {
                    _.uniqBy(attachedFiles, 'name').map(file => (
                        <div className="thumb" key={file.name} >
                            <span className="delete" onClick={() => handleImgDelete(file.name)}> </span>
                            <div className="thumb-inner">
                                <img alt="Upload file" src={file.preview} className="thumb-img" />
                            </div>
                        </div>
                    ))
                }
            </div>


            <div className="clear"> </div>
            <div className="back" onClick={() => {
                step > 1 && setStep(step - 1);
            }}>Back</div>
            <FormButton
                customClass={classes.next}
                label="NEXT"
                onClick={() => step < 2 && setStep(step + 1)}
            />
            <div className="clear"> </div>
        </div>
    );
}

export default Step_3;