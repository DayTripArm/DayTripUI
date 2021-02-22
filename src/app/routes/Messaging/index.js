import React, {useEffect, useState } from 'react';
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
import {useDispatch, useSelector} from "react-redux";

const Messaging = () => {
  const dispatch = useDispatch();
  const {config} = useSelector(state => state);
  const {conversations={}, messages=[]} = config;
  const {conversations_list} = conversations;
  const dataLength = conversations_list && conversations_list.length;
  const [chatActive, setChatActive] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [conversation, setConversation] = useState(undefined);
  const [messageText, setMessageText] = useState("");
  const [newMessage, setNewMessage] = useState("");

    useEffect (() => {
        dispatch(actions.conversationsListRequest(Number(localStorage.id)));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect (() => {
        conversation && conversation.id > 0 && dispatch(actions.getConversationMessagesRequest(conversation.id));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [conversation, newMessage]);

    const searchByAuthor = (e) => {
        const contact_name = e.target ? e.target.value : null;
        dispatch(actions.conversationsListRequest(Number(localStorage.id), contact_name));
    };

    const onChatClick =(conversation)=>{
        setConversation(conversation);
        dispatch(actions.getBookedTripRequest(conversation.booked_trip_id, Number(localStorage.userType)));
        setChatActive(true);
    }
    const sendMessage =()=>{
        setNewMessage(messageText);
        const body = {
            login_id: Number(localStorage.id),
            body: messageText
        }
        const conversationId = conversation.id || 0;
        dispatch(actions.sendMessageRequest(conversationId, body));
    }

    if (dataLength && dataLength===0) return <NoResults message={`There aren't Any Messages Yet`}/>;
  return (
    <>
      <div className='container'>
        <h2 className='text__blue mt-6 mt-md-9 mb-md-6 mt-xl-11 mt-xxl-13'>Messages</h2>
        <div className={`messaging-container rounded__4 d-flex${chatActive ? ' active' : ''}`}>
          {/* Contacts Area */}
          <div className='flex-fill'>
              <div className='pt-3 pb-md-3 px-md-4'>
                  <Input
                      type='search'
                      name='search'
                      placeholder='Search for author'
                      icon={IconZoom}
                      onChange={(e) => searchByAuthor(e)}
                      iconPosition='left'
                      className='search-bordered'
                      containerClass='mb-4 mb-md-0'
                  />
              </div>
              <hr className='border__top border__default d-none d-md-block my-0' />
            <div>
                <ContactList conversations={conversations_list} onClick={(item) => onChatClick(item)} />
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
                  <p className='mb-0 text-xs text__grey-dark'>Yesterday</p>
                </div>
              </div>
              <button className='btn btn-secondary btn-sm' onClick={() => {setOpenModal(true); window.location.hash = "modal"}}>
                Trip Details
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
                  name='messageText'
                  value={messageText}
                  placeholder='Type a message'
                  icon={IconSmileOutlined}
                  iconPosition='right'
                  className='border-0'
                  containerClass='chat-input w-100 mb-0'
                  onChange={(e) => setMessageText(e.target ? e.target.value : e)}
                />
                <div className='border__left border__default'>
                  <button className='btn btn-circle size-fixed border-0' name={newMessage} onClick={() => {sendMessage()}}>
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
