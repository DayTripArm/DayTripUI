import React from 'react';
import moment from "moment";
import {
    IconBullet
} from 'shared/components/Icons';

const ContactList = ({ conversations, onClick }) => (
    <ul className='contacts-list no-list-style mb-0 overflow-auto py-5'>
        {
            conversations && conversations.map((conversation, index) => {
                return (
                    <React.Fragment key={index}>
                        <li>
                            <hr className='border__top border__default my-0'/>
                        </li>
                        <li
                            className='p-4 d-flex align-items-center justify-content-between clickable'
                            tabIndex='0'
                            onClick={() => onClick(conversation)}
                            role='presentation'
                        >
                            <div className='d-flex col-xl-3'>
                                <img
                                    width='56'
                                    height='56'
                                    src={process.env.NODE_ENV === "development" ? "http://localhost:3000" + conversation.recipient_img: conversation.recipient_img}
                                    alt='user'
                                    className='rounded__50 object-pos-center object-fit-cover mr-3'
                                />
                                <div>
                                    <p className='weight-500 pt-2 mb-0 text-sm text-overflow_hidden'>{conversation.recipient_name}</p>
                                    <p className='mb-0 text-xs text__grey-dark'>{moment(conversation.trip_day).isSameOrAfter(moment(), 'day') ? "Upcoming" : "Past"}</p>
                                </div>
                            </div>
                            <div className='dsc-text col-6 col-lg-4 col-xl-3 text__grey-dark weight-700 d-none d-md-block'>
                                {conversation.title}
                            </div>
                            <div className='dsc-text col-4 col-xl-5 col-xxl-4 text__grey-dark d-none d-lg-block'>
                                {`${conversation.pickup_location}, (${moment(conversation.trip_day).format("D MMMM")} - ${moment(conversation.pickup_time).format("HH:SS")}) `}
                            </div>
                            <span className='weight-500 text-xs'>
                                <IconBullet  fill={conversation.unread_messages > 0 ? "#FE4C30" : ""} className='card-star mx-1 pull-t-1'/>
                            </span>
                        </li>
                        {index === conversations.length-1 &&
                        <li>
                            <hr className='border__top border__default my-0'/>
                        </li>
                        }
                    </React.Fragment>)
            })
        }
    </ul>
);

export default ContactList;
