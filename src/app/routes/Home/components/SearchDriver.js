import React from 'react';
import Input from 'shared/components/Input';
import { Link } from 'react-router-dom';
import {useSelector} from "react-redux";

const SearchDriver = () => {
    const {travelerData={}} = useSelector(state => state);
    const {hit_the_road={}} = travelerData;
    const {
        title,
        description,
        image={}
    } = hit_the_road;

    const src = process.env.NODE_ENV === "development" ? "http://localhost:3000" + image.url : image.url;

    return(
        <>
            <h2 className='text__blue'> Hit The Road </h2>
            <div className='home-search-driver box-overlay rounded__10 overflow-hidden'>
                <img src={src} alt='home' className='w-100 object-pos-center object-fit-cover'/>
                <div className='overlay d-flex align-items-center justify-content-center'>
                    <div className='d-flex flex-column align-items-center'>
                        <div className='text-white text-center px-4 px-lg-5'>
                            <h2 className='h1 mb-4'>{title}</h2>
                            <h4 className='mb-5 weight-300' dangerouslySetInnerHTML={{__html: description}}></h4>
                        </div>
                        <div
                            className='bg-white rounded__10 px-4 px-lg-5 pb-5 pt-4 d-flex flex-column flex-lg-row align-items-end'>
                            <Input
                                type='text'
                                name='field1'
                                label='Date *'
                                placeholder='Select your Date'
                                containerClass='mr-lg-4 mb-lg-0'
                            />
                            <Input
                                type='number'
                                name='field1'
                                label='Travelers *'
                                placeholder='Count'
                                containerClass='mr-lg-4 mb-lg-0'
                                hideApperance
                            />
                            <Link to='/drivers' className='btn btn-primary btn-block__md'>
                                Search for Driver
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default SearchDriver;
