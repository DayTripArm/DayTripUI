import React, {useState} from 'react';
import {STRING_NUMBERS} from "../../../../constants";
import InfoModal from "./InfoModal";

import _ from "lodash";

const Destinations = (props) => {
    const [openInfoModal, setOpenInfoModal] = useState(false);
    const [modalData, setModalData] = useState({
        description: "",
        image_url: ""
    });

    const {
        destinations=[]
    } = props;

    return(
        <>
            {
                destinations.map((dest, i) => {
                    const src = process.env.NODE_ENV === "development"
                        ? "http://localhost:3000" + dest.dest_image.url
                        : dest.dest_image.url;

                    return (
                        <div key={i} className={`step-vertical  ${!_.isEmpty(dest.dest_title) && "step-vertical__contained pb-6"}`}>
                            <h4 className='text__grey-dark mb-4 mb-md-5'>
                                {STRING_NUMBERS[i]} stop:{' '}
                                <span className='weight-400'>{dest.stop_title}</span>
                            </h4>
                            {!_.isEmpty(dest.dest_title) && <div className='row'>
                                <div className='col-12 col-md-5'>
                                    <img
                                        src={src}
                                        alt='garni'
                                        className='w-100 rounded__4 mb-5 mb-md-0'
                                    />
                                </div>
                                <div className='col-12 col-md-7 text-break'>
                                    <h4 className='mb-4'>{dest.dest_title}</h4>
                                    <p className='mb-0'>
                                        <span dangerouslySetInnerHTML={{__html: `${dest.dest_desc.substring(0, 300)}...`}}/>
                                        {dest.dest_desc.length >= 300 && <button className='btn btn-secondary btn-sm' onClick={() => {
                                            setModalData({
                                                description: dest.dest_desc,
                                                image_url: src
                                            });
                                            setOpenInfoModal(true);
                                        }}>Read More</button>}
                                    </p>
                                </div>
                            </div>
                            }
                        </div>
                    );
                })
            }
            {openInfoModal && <InfoModal
                onClose={() => setOpenInfoModal(false)}
                data={modalData}
            />}
        </>
    )
};

export default Destinations;
