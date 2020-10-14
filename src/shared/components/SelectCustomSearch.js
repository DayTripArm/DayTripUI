import React, {useEffect, useState} from 'react';
import {IconZoom } from 'shared/components/Icons';
import Input from "./Input";
import Api from "../../Api";
import _ from 'lodash';
import { useHistory } from "react-router-dom";

const SelectCustomSearch = (props) => {
    let history = useHistory();

    const {
        mobileSearchActive,
        setOpenSearchDropdown,
        openSearchDropdown,
        searchContainer
    } = props;

    const [options, setOptions] = useState([]);

    const handleSearch = (e) => {
        const value = e.target ? e.target.value : "";

        setTimeout(async (value) => {
            let response = await Api.searchTrips(value || "");

            setOptions(response.response? response.response.data.slice(0, 30) : {}); // show first 30 items
        }, 300, value);
    };

    useEffect(() => {
        handleSearch(""); // get all trips in search options
    }, []);


    return (
        <div ref={searchContainer} className={`header-search py-3 py-lg-0 px-4 px-lg-0 d-lg-inline-flex${mobileSearchActive ? '' : ' d-none'}`}>
            <Input
                type='search'
                name='field'
                value=''
                className='border-0'
                containerClass='mb-0'
                placeholder='Search Destinations'
                onChange={(e) => handleSearch(e)}
                onFocus={() => setOpenSearchDropdown(true)}
                onBlur={() => {
                    setTimeout(() => {
                        setOpenSearchDropdown(false);
                    }, 100)
                }}
                icon={IconZoom}
                iconPosition='left'
            />
            <div className={`dropdown${openSearchDropdown ? ' active' : ''}`} >
                <ul className='dropdown-list no-list-style py-2 mb-0'>
                    {
                        !_.isEmpty(options) ? options.map(trip => {

                            const src = process.env.NODE_ENV === "development"
                                ? "http://localhost:3000" + trip.images[0].url
                                : trip.images[0].url;

                            return (
                                <li className='list-item list-item__hover py-2 px-4 text-ellipsis' onClick={() => history.push(`/tour/${trip.id}`)} key={trip.id.toString()}>
                                    <img
                                        width='38'
                                        height='32'
                                        src={src}
                                        className='object-pos-center object-fit-cover bg__grey rounded__4 mr-2'
                                        alt={trip.title}
                                    />
                                    {trip.title}
                                </li>
                                )
                        }) : <li className='list-item py-2 px-4 text-ellipsis'>No Options</li>
                    }
                </ul>
            </div>
        </div>
    );
};

export default SelectCustomSearch;
