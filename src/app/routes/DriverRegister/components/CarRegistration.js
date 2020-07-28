import React from 'react';
import SelectCustom from 'shared/components/SelectCustom';

const CarRegistration = () => (
  <>
    <h4 className='text__blue mb-6'>What kind of car are you driving</h4>
    <SelectCustom
      type='text'
      name='field1'
      label='What is Your Car type?'
      placeholder='Choose'
      value=''
      options={[
        { label: 'Option1', value: '1' },
        { label: 'Option2', value: '2' },
        { label: 'Option3', value: '3' },
      ]}
    />
    <SelectCustom
      type='text'
      name='field1'
      label='What is Your Car Mark?'
      placeholder='Choose'
      value=''
      options={[
        { label: 'Option1', value: '1' },
        { label: 'Option2', value: '2' },
        { label: 'Option3', value: '3' },
      ]}
    />
    <SelectCustom
      type='text'
      name='field1'
      label='What is Your Car model?'
      placeholder='Choose'
      value=''
      options={[
        { label: 'Option1', value: '1' },
        { label: 'Option2', value: '2' },
        { label: 'Option3', value: '3' },
      ]}
    />
    <SelectCustom
      type='text'
      name='field1'
      label='Year'
      placeholder='Choose'
      value=''
      options={[
        { label: 'Option1', value: '1' },
        { label: 'Option2', value: '2' },
        { label: 'Option3', value: '3' },
      ]}
    />
    <SelectCustom
      type='text'
      name='field1'
      label='Color'
      placeholder='Choose'
      value=''
      options={[
        { label: 'Option1', value: '1' },
        { label: 'Option2', value: '2' },
        { label: 'Option3', value: '3' },
      ]}
    />
  </>
);

export default CarRegistration;
