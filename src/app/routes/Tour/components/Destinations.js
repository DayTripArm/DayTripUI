import React from 'react';

const Destinations = (props) => {
    const {
        destinations=[],
        onOpenModal
    } = props;

    return(
        <>
            {
                destinations.map(dest => {
                    const src = process.env.NODE_ENV === "development"
                        ? "http://localhost:3000" + dest.image.url
                        : dest.image.url;

                    return (
                        <div key={dest.id} className='step-vertical step-vertical__contained pb-6'>
                            <h4 className='text__grey-dark mb-4 mb-md-5'>
                                First stop:{' '}
                                <span className='weight-400'>Garni Temple (Yerevan to Garni is 27,5 km, estimated time to explore Garni is 1 hour)</span>
                            </h4>
                            <div className='row'>
                                <div className='col-12 col-md-5'>
                                    <img
                                        src={src}
                                        alt='garni'
                                        className='w-100 rounded__4 mb-5 mb-md-0'
                                    />
                                </div>
                                <div className='col-12 col-md-7'>
                                    <h4 className='mb-4'>{dest.title}</h4>
                                    <p className='mb-0'>
                                        {`${dest.description.substring(0, 250)}...`}
                                        {dest.description.length >= 250 && <button className='btn btn-secondary btn-sm' onClick={() => onOpenModal()}>Read More</button>}
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                })
            }
        </>
    )
};

export default Destinations;
