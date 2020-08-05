import React, {useState} from 'react';
import { IconStar, IconHeartOutlined, IconHeartFilled } from 'shared/components/Icons';
import actions from "../../actions";
import {useDispatch} from "react-redux";
import {useHistory} from "react-router";

// Size 'lg' or 'sm'
const Card = (props) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const {
        size = 'lg',
        favorite=false,
        imageUrl,
        title="Garni Temple and Geghard Monastery",
        trip_duration="8",
        id
    } = props;

    const [isSaved, setSaved] = useState(favorite);

    const favoriteHandle = () => {
        dispatch(actions.saveTrip(!isSaved, id));

        setSaved(!isSaved);
    };

    const cardClick = () => {
        history.push(`/tour/${id}`);
    };

    return (
        <div className={`card-item card-item__${size}`}>
            <div className='image-container mb-4'>
                <img
                    src={imageUrl}
                    className='object-pos-center object-fit-cover bg__grey-dark rounded__10'
                    alt='img'
                />
                <button className={`btn btn-favorite btn-circle btn-static border-0 btn-${size}`} onClick={() => favoriteHandle()}>
                    {isSaved ? <IconHeartFilled fill='#FE4C30'/> : <IconHeartOutlined/>}
                </button>
            </div>
            {size === 'sm' ? (
                <p className='mb-2 weight-700' onClick={() => cardClick()}>{title}</p>
            ) : (
                <h4 className='mb-2' onClick={() => cardClick()}>{title}</h4>
            )}
            <p className='text__grey-dark weight-700 mb-2'>Trip duration : {trip_duration} hours</p>
            <p className='mb-0'>
                <span className='weight-700'>5.0</span>
                <IconStar className='card-star mx-1 pull-t-1'/>
                <span className='text-sm text__grey-dark'>(125 reviews)</span>
            </p>
        </div>
    )
};

export default Card;
