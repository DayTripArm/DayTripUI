import React from 'react';
import Input from 'shared/components/Input';
import SelectDefault from 'shared/components/SelectDefault';
import UploadFile from './UploadFile';
import { IconEye, IconZoom } from 'shared/components/Icons';
import SelectCustom from 'shared/components/SelectCustom';

const Inputs = () => (
  <>
    <div className='row'>
      <div className='col-md-6 col-lg-4'>
        <Input type='text' name='field1' label='Label' placeholder='With Label' />
      </div>
      <div className='col-md-6 col-lg-4'>
        <Input type='text' name='field2' placeholder='Without Label' />
      </div>
    </div>
    <div className='row'>
      <div className='col-md-6 col-lg-4'>
        <Input type='text' name='field3' label='Label' value='Value' placeholder='Placeholder' />
      </div>
      <div className='col-md-6 col-lg-4'>
        <Input
          type='text'
          name='field4'
          label='Label'
          value='Input Error'
          placeholder='Placeholder'
          isError
        />
      </div>
      <div className='col-md-6 col-lg-4'>
        <Input
          type='text'
          name='field5'
          label='Label'
          value='With Message'
          placeholder='Placeholder'
          isError
          message='Error Message'
        />
      </div>
      <div className='col-md-6 col-lg-4'>
        <Input
          type='text'
          name='field6'
          label='Label'
          value='Input Success'
          placeholder='Placeholder'
          isSuccess
        />
      </div>
      <div className='col-md-6 col-lg-4'>
        <Input
          type='text'
          name='field7'
          label='Label'
          value='With Message'
          placeholder='Placeholder'
          isSuccess
          message='Error Message'
        />
      </div>
      <div className='col-md-6 col-lg-4'>
        <Input
          type='text'
          name='field8'
          label='Label'
          value='With Long Message'
          placeholder='Placeholder'
          isSuccess
          message='Success Message message with long text. Lorem ipsum dolor sit amet conceptetur adisting elit.'
        />
      </div>
    </div>
    <div className='row'>
      <div className='col-md-6 col-lg-4'>
        <Input
          type='text'
          name='field9'
          label='Label'
          placeholder='With Left Icon'
          icon={IconEye}
          iconPosition='left'
        />
      </div>
      <div className='col-md-6 col-lg-4'>
        <Input
          type='text'
          name='field10'
          label='Label'
          placeholder='With Right Icon'
          icon={IconEye}
          iconPosition='right'
        />
      </div>
    </div>
    <div className='row'>
      <div className='col-md-6 col-lg-4'>
        <Input
          type='search'
          name='field9'
          label='Search'
          className='border-0'
          placeholder='Without border'
          icon={IconZoom}
          iconPosition='left'
        />
      </div>
      <div className='col-md-6 col-lg-4'>
        <Input
          type='search'
          name='field9'
          label='Search'
          value='Search Text with value'
          className='border-0'
          placeholder='Without border'
          icon={IconZoom}
          iconPosition='left'
        />
      </div>
      <div className='col-md-6 col-lg-4'>
        <Input
          type='search'
          name='field9'
          label='Search'
          value='Search Text with clear icon'
          showClearIcon
          className='border-0'
          placeholder='Without border'
          icon={IconZoom}
          iconPosition='left'
        />
      </div>
    </div>
    <div className='row'>
      <div className='col-md-6 col-lg-4'>
        <SelectDefault
          name='field11'
          label='Select'
          placeholder='Select With Placeholder'
          value=''
          iconPosition='left'
          options={[
            { label: 'Option1', value: '1' },
            { label: 'Option2', value: '2' },
            { label: 'Option3', value: '3' },
          ]}
        />
      </div>
      <div className='col-md-6 col-lg-4'>
        <SelectDefault
          name='field12'
          label='Select'
          placeholder='Search'
          value='1'
          iconPosition='left'
          options={[
            { label: 'Option1', value: '1' },
            { label: 'Option2', value: '2' },
            { label: 'Option3', value: '3' },
          ]}
          isSuccess
          message='Success Message'
        />
      </div>
      <div className='col-md-6 col-lg-4'>
        <SelectDefault
          name='field13'
          label='Select'
          placeholder='Select'
          value='2'
          iconPosition='left'
          options={[
            { label: 'Option1', value: '1' },
            { label: 'Option2', value: '2' },
            { label: 'Option3', value: '3' },
          ]}
          isError
          message='Error Message'
        />
      </div>
    </div>
    <div className='row'>
      <div className='col-md-6 col-lg-4'>
        <SelectCustom
          name='field111'
          label='Select Custom'
          placeholder='Select With Placeholder'
          borderWidth='0'
          value={{
            label: (
              <div className='list-item list-item__hover text-ellipsis'>
                <img
                  width='38'
                  height='32'
                  src='https://d31qtdfy11mjj9.cloudfront.net/places/1511524295874407964.jpg'
                  className='object-pos-center object-fit-cover bg__grey rounded__4 mr-2'
                  alt='garni'
                />
                Item 1 with very long text lorem ipsum dolor sit amet conseptetur adisti...
              </div>
            ),
            value: '1',
          }}
          options={[
            {
              label: (
                <div className='list-item list-item__hover text-ellipsis'>
                  <img
                    width='38'
                    height='32'
                    src='https://d31qtdfy11mjj9.cloudfront.net/places/1511524295874407964.jpg'
                    className='object-pos-center object-fit-cover bg__grey rounded__4 mr-2'
                    alt='garni'
                  />
                  Item 1 with very long text lorem ipsum dolor sit amet conseptetur adisti...
                </div>
              ),
              value: '1',
            },
            {
              label: (
                <div className='list-item list-item__hover text-ellipsis'>
                  <img
                    width='38'
                    height='32'
                    src='https://d31qtdfy11mjj9.cloudfront.net/places/1511524295874407964.jpg'
                    className='object-pos-center object-fit-cover bg__grey rounded__4 mr-2'
                    alt='garni'
                  />
                  Item 2
                </div>
              ),
              value: '2',
            },
            {
              label: (
                <div className='list-item list-item__hover text-ellipsis'>
                  <img
                    width='38'
                    height='32'
                    src='https://d31qtdfy11mjj9.cloudfront.net/places/1511524295874407964.jpg'
                    className='object-pos-center object-fit-cover bg__grey rounded__4 mr-2'
                    alt='garni'
                  />
                  Item 3
                </div>
              ),
              value: '3',
            },
          ]}
        />
      </div>
    </div>
    <div className='row'>
      <div className='col-md-6 col-lg-4'>
        <SelectCustom
          name='field111'
          label='Select Custom'
          placeholder='Select With Placeholder'
          value={{ label: 'Option1', value: '1' }}
          options={[
            { label: 'Option1', value: '1' },
            { label: 'Option2', value: '2' },
            { label: 'Option3', value: '3' },
          ]}
        />
      </div>
      <div className='col-md-6 col-lg-4'>
        <SelectCustom
          name='field112'
          label='Select Custom'
          placeholder='Search'
          value=''
          options={[
            { label: 'Option1', value: '1' },
            { label: 'Option2', value: '2' },
            { label: 'Option3', value: '3' },
          ]}
          isSuccess
          message='Success Message'
        />
      </div>
      <div className='col-md-6 col-lg-4'>
        <SelectCustom
          name='field113'
          label='Select'
          placeholder='Select Custom'
          value={{ label: 'Option2', value: '2' }}
          options={[
            { label: 'Option1', value: '1' },
            { label: 'Option2', value: '2' },
            { label: 'Option3', value: '3' },
          ]}
          isError
          message='Error Message'
        />
      </div>
    </div>
    <div className='row'>
      <div className='col-md-6 col-lg-4'>
        <UploadFile name='photo' label='Upload Photos' multiple />
      </div>
      <div className='col-md-6 col-lg-4'>
        <UploadFile size='sm' name='photo' label='Upload Photos' multiple />
      </div>
    </div>
  </>
);

export default Inputs;
