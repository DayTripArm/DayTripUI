import React, { useState } from 'react';
import Input from 'shared/components/Input';
import {
  IconZoom,
  IconArrowLeft,
  IconLink,
  IconSmileOutlined,
  IconSend,
} from 'shared/components/Icons';
import ContactList from './components/ContactList';
import ChatContent from './components/ChatContent';
import TripDetailsModal from './components/TripDetailsModal';
import NoResults from './components/NoResults';

const Messaging = () => {
  const dataLength = true;
  const [chatActive, setChatActive] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  if (!dataLength) return <NoResults />;

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
                placeholder='Search for messages'
                icon={IconZoom}
                iconPosition='left'
                className='search-bordered'
                containerClass='mb-4 mb-md-0'
              />
            </div>
            <hr className='border__top border__default d-none d-md-block my-0' />
            <div>
              <ContactList onClick={() => setChatActive(true)} />
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
                    <IconLink />
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
      {openModal && <TripDetailsModal onClose={() => {setOpenModal(false); window.location.hash = "modal"}} />}
    </>
  );
};

export default Messaging;
