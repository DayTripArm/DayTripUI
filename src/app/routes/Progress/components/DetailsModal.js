import React from 'react';
import ModalAside from 'shared/components/ModalAside';
import Input from 'shared/components/Input';
import { IconZoom } from 'shared/components/Icons';

const DetailsModal = ({ onClose, title = 'Reviews' }) => (
  <ModalAside title={title} onClose={onClose}>
    <Input
      type='search'
      name='search'
      placeholder='Search'
      icon={IconZoom}
      iconPosition='left'
      className='search-bordered'
      containerClass='mb-4 mb-md-0'
    />
    <div className='text-separator my-5'>
      <span className='separator-content text-xs text__grey-dark py-1 px-2'>January, 2020</span>
    </div>
    <div>
      <div className='d-flex mb-4'>
        <img
          width='48'
          height='48'
          src='https://cdn1.iconfinder.com/data/icons/user-pictures/100/female1-512.png'
          alt='user'
          className='rounded__50 object-pos-center object-fit-cover mr-3'
        />
        <div>
          <div>
            <p className='weight-500 text-sm pt-1 mb-0'>Julia</p>
            <p className='text__grey text-xs mb-0'>January, 2020</p>
          </div>
        </div>
      </div>
      <p className='text-sm mb-0'>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Rhoncus volutpat libero amet, nec
        egestas tempus orci. Eget sapien hac blandit id ipsum, nulla vitae enim. Odio lorem pretium
        nibh nulla. Aenean tellus quis in ornare non pellentesque. Id pretium urna, nibh eget tortor
        amet. Sed auctor tellus lectus senectus. Mauris amet, adipiscing ipsum urna, sed sagittis
        auctor. Semper sem morbi gravida mattis. Eget eget neque, quis auctor.
      </p>
    </div>
    <hr className='border__top border__default my-4' />
    <div>
      <div className='d-flex mb-4'>
        <img
          width='48'
          height='48'
          src='https://cdn1.iconfinder.com/data/icons/user-pictures/100/female1-512.png'
          alt='user'
          className='rounded__50 object-pos-center object-fit-cover mr-3'
        />
        <div>
          <div>
            <p className='weight-500 text-sm pt-1 mb-0'>Julia</p>
            <p className='text__grey text-xs mb-0'>January, 2020</p>
          </div>
        </div>
      </div>
      <p className='text-sm mb-0'>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Rhoncus volutpat libero amet, nec
        egestas tempus orci. Eget sapien hac blandit id ipsum, nulla vitae enim. Odio lorem pretium
        nibh nulla. Aenean tellus quis in ornare non pellentesque. Id pretium urna, nibh eget tortor
        amet. Sed auctor tellus lectus senectus. Mauris amet, adipiscing ipsum urna, sed sagittis
        auctor. Semper sem morbi gravida mattis. Eget eget neque, quis auctor.
      </p>
    </div>
    <div className='text-separator my-5'>
      <span className='separator-content text-xs text__grey-dark py-1 px-2'>January, 2020</span>
    </div>
    <div>
      <div className='d-flex mb-4'>
        <img
          width='48'
          height='48'
          src='https://cdn1.iconfinder.com/data/icons/user-pictures/100/female1-512.png'
          alt='user'
          className='rounded__50 object-pos-center object-fit-cover mr-3'
        />
        <div>
          <div>
            <p className='weight-500 text-sm pt-1 mb-0'>Julia</p>
            <p className='text__grey text-xs mb-0'>January, 2020</p>
          </div>
        </div>
      </div>
      <p className='text-sm mb-0'>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Rhoncus volutpat libero amet, nec
        egestas tempus orci.
      </p>
    </div>
  </ModalAside>
);

export default DetailsModal;
