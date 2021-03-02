import React from 'react';
import moment from "moment";

const ChatContent = ({messages}) => (
  <>
  <div className='chat-content d-flex flex-fill pt-5 pl-2 pl-md-5 pb-2'>
    <ul id="chat" className='w-100 no-list-style mb-0 d-flex flex-column overflow-auto'>
      {messages && messages.map((message, index) => {
      return (
          <React.Fragment key={index}>
              <li className='mb-4 align-self-center text-xs'>{moment(message.created_at).format("DD MMM HH:mm")}</li>
              <li className={`mb-4 mr-2 mr-md-5  py-3 px-4 text-xs rounded__30 ${message.login_id === Number(localStorage.id) ? "bg-primary text-white align-self-end" : "bg__grey-light align-self-start"}`} >
                  {message.body}
              </li>
          </React.Fragment>
      )}
      )}
    </ul>
  </div>
  </>
);

export default ChatContent;
