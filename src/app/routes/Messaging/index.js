import React, {useEffect, useState } from 'react';
import Input from 'shared/components/Input';
import {
  IconArrowLeft,
  IconDestination,
  IconSmileOutlined,
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
  const {conversations={}} = config;
  const {conversations_list} = conversations;
  const dataLength = conversations_list && conversations_list.length;
  const [chatActive, setChatActive] = useState(false);
  const [openModal, setOpenModal] = useState(false);



    useEffect (() => {
        dispatch(actions.conversationsListRequest(Number(localStorage.id)));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (dataLength && dataLength===0) return <NoResults message={`There aren't Any Messages Yet`}/>;
  return (
    <>
      <div className='container'>
        <h2 className='text__blue mt-6 mt-md-9 mb-md-6 mt-xl-11 mt-xxl-13'>Messages</h2>
        <div className={`messaging-container rounded__4 d-flex${chatActive ? ' active' : ''}`}>
          {/* Contacts Area */}
          <div className='flex-fill'>
            <div>
                <ContactList conversations={conversations_list} onClick={() => setChatActive(true)} />
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
                  <p className='weight-500 pt-2 mb-0 text-sm'>Nane Minasyan</p>
                  <p className='mb-0 text-xs text__grey-dark'>Yesterday</p>
                </div>
              </div>
              <button className='btn btn-secondary btn-sm' onClick={() => {setOpenModal(true); window.location.hash = "modal"}}>
                Trip Details
              </button>
            </div>
            <div className='flex-fill d-flex flex-column'>
              <ChatContent />
              <div className='d-flex border__top border__default'>
                <div className='border__right border__default'>
                  <button className='btn btn-circle size-fixed border-0'>
                    <IconDestination />
                  </button>
                </div>
                <Input
                  type='text'
                  name='chat'
                  placeholder='Type a message'
                  icon={IconSmileOutlined}
                  iconPosition='right'
                  className='border-0'
                  containerClass='chat-input w-100 mb-0'
                />
                <div className='border__left border__default'>
                  <button className='btn btn-circle size-fixed border-0'>
                    <IconSend />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {openModal && <TripDetailsModal onClose={() => setOpenModal(false)} />}
    </>
  );
};

export default Messaging;
