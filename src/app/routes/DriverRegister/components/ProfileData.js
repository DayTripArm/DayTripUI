import React, { useState } from 'react';
import SelectCustom from 'shared/components/SelectCustom';
import Textarea from 'shared/components/Textarea';
import Input from 'shared/components/Input';
import Chips from 'shared/components/Chips';

const languages = ['English', 'Russian', 'French', 'Armenian', 'Deuch', 'Espanol'];

const ProfileData = () => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [selectedLanguages, setSelectedLanguages] = useState(['English', 'Russian', 'French']);

  return (
    <>
      <h4 className='text__blue mb-6'>Let’s Make Your Profile Looks Better</h4>
      <SelectCustom
        type='text'
        name='field1'
        label='Choose your Gender'
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
        name='field2'
        label='Date of Birth'
        placeholder='Choose'
        value=''
        containerClass='mb-4'
        options={[
          { label: 'Option1', value: '1' },
          { label: 'Option2', value: '2' },
          { label: 'Option3', value: '3' },
        ]}
      />
      <div className='d-flex mxw-328px'>
        <div className='pr-2 flex-fill d-flex'>
          <SelectCustom
            type='text'
            name='field3'
            label='Date of Birth'
            placeholder='Choose'
            value=''
            containerClass='field-flexible flex-fill mb-4'
            options={[
              { label: 'Option1', value: '1' },
              { label: 'Option2', value: '2' },
              { label: 'Option3', value: '3' },
            ]}
          />
        </div>
        <div className='pl-2 flex-fill d-flex'>
          <SelectCustom
            type='text'
            name='field4'
            label='Date of Birth'
            placeholder='Choose'
            value=''
            containerClass='field-flexible flex-fill mb-4'
            options={[
              { label: 'Option1', value: '1' },
              { label: 'Option2', value: '2' },
              { label: 'Option3', value: '3' },
            ]}
          />
        </div>
      </div>
      <div className='form-field'>
        <label>Languages/Speaks</label>
        <div
          className={`rounded__4 border-style border__default pt-3${
            languages.length === selectedLanguages.length ? ' pb-3' : ''
          }`}
        >
          <div className='px-4'>
            {selectedLanguages.map(item => (
              <Chips
                name={item}
                key={item}
                className='mr-1 mb-1'
                removable
                onRemove={() => setSelectedLanguages(selectedLanguages.filter(v => v !== item))}
              />
            ))}
          </div>
          {languages.length !== selectedLanguages.length && (
            <div className='position-relative d-inline-flex'>
              <Input
                type='text'
                name='field'
                className='border-0'
                containerClass='mb-0'
                placeholder='Choose'
                onFocus={() => setOpenDropdown(true)}
                onBlur={() => setOpenDropdown(false)}
              />
              <div className={`dropdown${openDropdown ? ' active' : ''}`}>
                <ul className='dropdown-list no-list-style py-2 mb-0'>
                  {languages
                    .filter(v => !selectedLanguages.includes(v))
                    .map(item => (
                      <li
                        className='list-item list-item__hover py-2 px-4 text-ellipsis'
                        key={item}
                        onClick={() =>
                          setSelectedLanguages([...selectedLanguages.filter(v => v !== item), item])
                        }
                        role='presentation'
                      >
                        {item}
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
      <Textarea
        name='field5'
        label='About'
        placeholder='Write about you'
        value=''
        className='h-152px'
      />
      <Textarea name='field5' label='Work' placeholder='Write about your experience' value='' />
    </>
  );
};

export default ProfileData;
