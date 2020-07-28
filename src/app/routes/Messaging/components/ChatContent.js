import React from 'react';

const ChatContent = () => (
  <div className='chat-content d-flex flex-fill pt-5 pl-2 pl-md-5 pb-2'>
    <ul className='w-100 no-list-style mb-0 d-flex flex-column-reverse overflow-auto'>
      <li className='mb-4 mr-2 mr-md-5 bg__grey-light py-3 px-4 text-xs rounded__30 align-self-start'>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </li>
      <li className='mb-4 mr-2 mr-md-5 bg-primary text-white py-3 px-4 text-xs rounded__30 align-self-end'>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </li>
      <li className='mb-4 align-self-center text-xs'>19:47</li>
      <li className='mb-4 mr-2 mr-md-5 bg__grey-light py-3 px-4 text-xs rounded__30 align-self-start'>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </li>
    </ul>
  </div>
);

export default ChatContent;
