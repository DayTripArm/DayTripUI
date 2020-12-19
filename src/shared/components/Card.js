import React, {useState} from 'react';
import { IconStar, IconHeartOutlined, IconHeartFilled } from 'shared/components/Icons';
import actions from "../../actions";
import {useDispatch} from "react-redux";
import {isAuthorized} from "../../helper";
import {Link} from "react-router-dom";

// Size 'lg' or 'sm'
const Card = (props) => {
    const dispatch = useDispatch();

    const [hover, setHover] = useState(false);

    const {
        size = 'lg',
        favorite=false,
        imageUrl,
        title="Garni Temple and Geghard Monastery",
        trip_duration="8",
        review_stats,
        id
    } = props;

    const favoriteHandle = () => {

        if (!isAuthorized()) {
            dispatch(actions.showHideSignIn(true));
        } else {
            dispatch(actions.saveTrip(!favorite, id));
        }
    };

    return (
        <div className={`card-item card-item__${size}`}>
            <div className='image-container mb-4'>
                <Link to={`tour/${id}`} className='link-static text__black pointer'>
                    <img
                        src={imageUrl}
                        className='object-pos-center object-fit-cover bg__grey-dark rounded__10'
                        alt='img'
                    />
                </Link>
                <button
                    className={`btn btn-favorite btn-circle btn-static border-0 btn-${size} btn-sarixach`}
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
                    onClick={() => favoriteHandle()}
                >
                    {favorite ?
                        <IconHeartFilled fill='#FE4C30'/>
                        :
                        hover ? <IconHeartFilled fill='#FE4C30'/> : <IconHeartOutlined/>
                    }
                </button>
            </div>
            {size === 'sm' ? (
                <Link to={`tour/${id}`} className='link-static text__black pointer'>
                    <p className='mb-2 weight-700'>{title}</p>
                </Link>
            ) : (
                <Link to={`tour/${id}`} className='link-static text__black pointer'>
                    <h4 className='mb-2'>{title}</h4>
                </Link>
            )}
            <p className='text__grey-dark weight-700 mb-2'>Trip duration : {trip_duration} hours</p>
            <p className='mb-0'>
                <span className='weight-700'>{review_stats?.rate || 'No reviews yet'}</span>
                <IconStar className='card-star mx-1 pull-t-1'/>
                {review_stats?.rate && <span className='text-sm text__grey-dark'>({review_stats.count} reviews)</span>}
            </p>
        </div>
    )
};

export default Card;
