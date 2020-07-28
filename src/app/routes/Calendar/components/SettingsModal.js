import React from 'react';
import ModalAside from 'shared/components/ModalAside';
import SelectCustom from 'shared/components/SelectCustom';

const SettingsModal = ({ onClose, title = 'March 18' }) => (
  <ModalAside title={title} onClose={onClose}>
    <h4 className='text__blue'>Trip Tour</h4>
    <p className='weight-700'>How far into the future can travelers book?</p>
    <SelectCustom
      name='months'
      placeholder='3 months in advance'
      value=''
      options={[
        { label: 'Option1', value: '1' },
        { label: 'Option2', value: '2' },
        { label: 'Option3', value: '3' },
      ]}
    />
    <p className='weight-700'>How much notice do you need before a trip day?</p>
    <SelectCustom
      name='months'
      placeholder='At least 1 day’s notice'
      value=''
      options={[
        { label: 'Option1', value: '1' },
        { label: 'Option2', value: '2' },
        { label: 'Option3', value: '3' },
      ]}
    />
  </ModalAside>
);

export default SettingsModal;
