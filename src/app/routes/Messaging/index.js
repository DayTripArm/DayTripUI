import React, {useEffect, useState, useRef } from 'react';
import Input from 'shared/components/Input';
import {
    IconArrowLeft,
    IconDestination,
    IconSmileOutlined,
    IconZoom,
    IconSend,
} from 'shared/components/Icons';
import ContactList from './components/ContactList';
import ChatContent from './components/ChatContent';
import TripDetailsModal from './components/TripDetailsModal';
import NoResults from './components/NoResults';
import actions from "../../../actions";
import {HOST_URL} from "../../../constants";
import Cable from 'actioncable';
import { useTranslation } from 'react-i18next';
import {useDispatch, useSelector} from "react-redux";
import moment from "moment";
import _ from "lodash";

const Messaging = () => {
    const dispatch = useDispatch();
    const ref = useRef();
    const { t } = useTranslation();
    const {config} = useSelector(state => state);
    const {conversations={}, messages=[]} = config;
    const {conversations_list} = conversations;
    const dataLength = conversations_list ? conversations_list.length : 0;
    const [chatActive, setChatActive] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [conversation, setConversation] = useState(undefined);
    const [currentMessage, setCurrentMessage] = useState("");
    const [channel, setChannel] = useState(null)
    const locale = localStorage.getItem('lang') || 'en';
    let cable = Cable.createConsumer(process.env.NODE_ENV === "development" ? HOST_URL+'/cable' : 'http://104.197.178.29/cable');

    useEffect (() => {
        dispatch(actions.conversationsListRequest(Number(localStorage.id)));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect (() => {
        ref.current = [...messages];
        // Scroll down if message list has been changed.
        var container = document.getElementById("chat");
        if (container!=null){
            container.scrollTop = container.scrollHeight;;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [messages]);

    useEffect (() => {
        if (conversation && conversation.id > 0) {

            dispatch(actions.getConversationMessagesRequest(conversation.id, Number(localStorage.id)));
            const channel = cable.subscriptions.create({channel: `ConversationChannel`, conversation_id: conversation.id},  {
                connected: () => {},
                received: (data) => {
                    getResponseMessage(data);
                },
                create: function(chatContent) {
                    this.perform('create', {
                        body: chatContent,
                        conversation_id: conversation.id,
                        login_id: Number(localStorage.id)
                    });
                }
            });
            setChannel(channel)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [conversation]);


    const searchByAuthor = (e) => {
        const contact_name = e.target ? e.target.value : null;
        dispatch(actions.conversationsListRequest(Number(localStorage.id), contact_name));
    };

    //User types in new message in chat box
    const handleNewUserMessage = (newMessage) => {
        // Now send the message to the backend API
        channel.create(newMessage);
        //Update the state of current message
        setCurrentMessage(newMessage);
    }

    const getResponseMessage=(message) =>{
        let list = [];

        //Make sure not to display own message in chat logs
        if (currentMessage === message) {

            //Reset the current message to null and return empty string
            setCurrentMessage('');
            return '';
        } else {
            list = ref.current
            //If it's not an own message, add to the chat log
            list.push(message);
            dispatch(actions.getConversationMessagesRecieve(list));

            //Reset the current message to null
            setCurrentMessage('');
        }
    }

    const onKeyDown = (event, message) => {
        if (event.key === "Enter" || event.key === "NumpadEnter") {
            handleNewUserMessage(message);
        }
    }

    const onChatClick =(conversation)=>{
        setConversation(conversation);
        dispatch(actions.getBookedTripRequest(conversation.booked_trip_id, Number(localStorage.userType)));
        setChatActive(true);
    }

    return (
        <>
            <div className='container'>
                <h2 className='text__blue mt-6 mt-md-9 mb-md-6 mt-xl-11 mt-xxl-13'>{t("messages_page.title")}</h2>
                <div className={`messaging-container rounded__4 d-flex${chatActive ? ' active' : ''}`}>
                    {/* Contacts Area */}
                    <div className='flex-fill'>
                        <div className='pt-3 pb-md-3 px-md-4'>
                            <Input
                                type='search'
                                name='search'
                                placeholder={t("messages_page.search_for_author")}
                                icon={IconZoom}
                                onChange={(e) => searchByAuthor(e)}
                                iconPosition='left'
                                className='search-bordered'
                                containerClass='mb-4 mb-md-0'
                            />
                        </div>
                        <hr className='border__top border__default d-none d-md-block my-0' />
                        <div>{
                            dataLength===0 ?
                                <NoResults message={t("messages_page.no_messages_text")} short_desc={t("messages_page.short_desc")} />
                                :
                                <ContactList conversations={conversations_list} onClick={(item) => onChatClick(item)} />
                        }
                        </div>
                    </div>
                    {/* Chat Area */}
                    <div className='chat-area d-md-flex flex-column'>
                        <div className='py-2 px-2 py-md-3 border__bottom border__default d-flex align-items-center justify-content-between'>
                            <div className='d-flex'>
                                <button
                                    className='btn btn-circle size-fixed border-0 mr-4'
                                    onClick={() => setChatActive(false)}
                                >
                                    <IconArrowLeft />
                                </button>
                                <div>
                                    <p className='weight-500 pt-2 mb-0 text-sm'>{conversation && conversation.recipient_name}</p>
                                    <p className='mb-0 text-xs text__grey-dark'>{conversation && _.startCase(moment(conversation.created_at).locale(locale === "am" ? "hy-am" : locale).format("MMMM Do"))}</p>
                                </div>
                            </div>
                            <button className='btn btn-secondary btn-sm' onClick={() => {setOpenModal(true); window.location.hash = "modal"}}>
                                {t("messages_page.trip_details")}
                            </button>
                        </div>
                        <div className='flex-fill d-flex flex-column'>
                            <ChatContent messages={messages}/>
                            <div className='d-flex border__top border__default'>
                                <div className='border__right border__default'>
                                    <button className='btn btn-circle size-fixed border-0'>
                                        <IconDestination />
                                    </button>
                                </div>
                                <Input
                                    type='text'
                                    name='currentMessage'
                                    value={currentMessage}
                                    placeholder={t("messages_page.type_msg")}
                                    icon={IconSmileOutlined}
                                    iconPosition='right'
                                    className='border-0'
                                    containerClass='chat-input w-100 mb-0'
                                    onChange={(e) => setCurrentMessage(e.target ? e.target.value : e)}
                                    onKeyDown={(e) => onKeyDown(e, currentMessage)}
                                />
                                <div className='border__left border__default'>
                                    <button className='btn btn-circle size-fixed border-0' onClick={() => {handleNewUserMessage(currentMessage)}}>
                                        <IconSend />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {openModal && <TripDetailsModal hideContact={true} onClose={() => setOpenModal(false)} />}
        </>
    );
};

export default Messaging;
