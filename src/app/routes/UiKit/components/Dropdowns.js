import React, { useState, useRef } from 'react';
import Input from 'shared/components/Input';
import useOutsideClick from 'shared/hooks/useOutsideClick';
import {
  IconPlus,
  IconMinus,
  IconZoom,
  IconArrowDown,
  IconTimes,
  IconArrowUp,
} from 'shared/components/Icons';

const Dropdowns = () => {
  const container = useRef();
  const [openDropdown1, setOpenDropdown1] = useState(false);
  const [openDropdown2, setOpenDropdown2] = useState(false);

  useOutsideClick(container, () => setOpenDropdown2(false));

  return (
    <div className='row'>
      <div className='col-4'>
        <div className='position-relative d-inline-flex'>
          <Input
            type='search'
            name='field'
            label='Search'
            value='Search Text with dropdown'
            className='border-0'
            containerClass='mb-0'
            placeholder='Without border'
            onFocus={() => setOpenDropdown1(true)}
            onBlur={() => setOpenDropdown1(false)}
            icon={IconZoom}
            iconPosition='left'
          />
          <div className={`dropdown${openDropdown1 ? ' active' : ''}`}>
            <ul className='dropdown-list no-list-style py-2 mb-0'>
              <li className='list-item list-item__hover py-2 px-4 text-ellipsis'>
                <img
                  width='38'
                  height='32'
                  src='https://d31qtdfy11mjj9.cloudfront.net/places/1511524295874407964.jpg'
                  className='object-pos-center object-fit-cover bg__grey rounded__4 mr-2'
                  alt='garni'
                />
                Item 1 with very long text lorem ipsum dolor sit amet conseptetur adisti...
              </li>
              <li className='list-item list-item__hover py-2 px-4 text-ellipsis'>
                <img
                  width='38'
                  height='32'
                  src='https://d31qtdfy11mjj9.cloudfront.net/places/1511524295874407964.jpg'
                  className='object-pos-center object-fit-cover bg__grey rounded__4 mr-2'
                  alt='garni'
                />
                Item 2
              </li>
              <li className='list-item list-item__hover py-2 px-4 text-ellipsis'>
                <img
                  width='38'
                  height='32'
                  src='https://d31qtdfy11mjj9.cloudfront.net/places/1511524295874407964.jpg'
                  className='object-pos-center object-fit-cover bg__grey rounded__4 mr-2'
                  alt='garni'
                />
                Item 3
              </li>
              <li className='list-item list-item__hover py-2 px-4 text-ellipsis active'>
                <img
                  width='38'
                  height='32'
                  src='https://d31qtdfy11mjj9.cloudfront.net/places/1511524295874407964.jpg'
                  className='object-pos-center object-fit-cover bg__grey rounded__4 mr-2'
                  alt='garni'
                />
                Item 4 (active)
              </li>
              <li className='list-item list-item__hover py-2 px-4 text-ellipsis'>
                <img
                  width='38'
                  height='32'
                  src='https://d31qtdfy11mjj9.cloudfront.net/places/1511524295874407964.jpg'
                  className='object-pos-center object-fit-cover bg__grey rounded__4 mr-2'
                  alt='garni'
                />
                Item 5
              </li>
              <li className='list-item list-item__hover py-2 px-4 text-ellipsis'>
                <img
                  width='38'
                  height='32'
                  src='https://d31qtdfy11mjj9.cloudfront.net/places/1511524295874407964.jpg'
                  className='object-pos-center object-fit-cover bg__grey rounded__4 mr-2'
                  alt='garni'
                />
                Item 6
              </li>
              <li className='list-item list-item__hover py-2 px-4 text-ellipsis'>
                <img
                  width='38'
                  height='32'
                  src='https://d31qtdfy11mjj9.cloudfront.net/places/1511524295874407964.jpg'
                  className='object-pos-center object-fit-cover bg__grey rounded__4 mr-2'
                  alt='garni'
                />
                Item 7
              </li>
              <li className='list-item list-item__hover py-2 px-4 text-ellipsis'>
                <img
                  width='38'
                  height='32'
                  src='https://d31qtdfy11mjj9.cloudfront.net/places/1511524295874407964.jpg'
                  className='object-pos-center object-fit-cover bg__grey rounded__4 mr-2'
                  alt='garni'
                />
                Item 8
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className='col-4'>
        <div ref={container} className='position-relative d-inline-flex'>
          <span
            className='pointer text-nowrap px-3'
            onClick={() => setOpenDropdown2(!openDropdown2)}
            role='presentation'
          >
            $ USD
            {openDropdown2 ? <IconArrowUp /> : <IconArrowDown />}
          </span>
          <div className={`dropdown${openDropdown2 ? ' active' : ''}`}>
            <ul className='dropdown-list no-list-style py-2 mb-0 text-center'>
              <li className='list-item list-item__hover py-2 px-4 text-ellipsis'>ENG</li>
              <li className='list-item list-item__hover py-2 px-4 text-ellipsis'>RUS</li>
              <li className='list-item list-item__hover py-2 px-4 text-ellipsis'>ARM</li>
            </ul>
          </div>
        </div>
      </div>
      <div className='col-4'>
        <div className='position-relative'>
          <div>Dropdown Header</div>
          <div className='dropdown dropdown-static py-2 active'>
            <ul className='dropdown-list no-list-style py-2 mb-0'>
              <li className='list-item py-2 px-4 d-flex align-items-center justify-content-between'>
                <span className='weight-700'>Adults</span>
                <div className='d-flex align-items-center'>
                  <button className='btn btn-circle border-0'>
                    <IconPlus />
                  </button>
                  <span className='mx-1'>1</span>
                  <button className='btn btn-circle border-0'>
                    <IconMinus />
                  </button>
                </div>
              </li>
            </ul>
            <div className='d-flex justify-content-between px-4'>
              <button className='btn btn-secondary btn-secondary__grey btn-sm'>Clean</button>
              <button className='btn btn-secondary btn-sm'>Save</button>
            </div>
          </div>
        </div>
      </div>
      <div className='col-4 mt-4'>
        <div className='position-relative'>
          <div>Dropdown Header</div>
          <div className='dropdown dropdown-static'>
            <ul className='dropdown-list no-list-style mb-0'>
              <li className='list-item list-item__hover border__bottom border__default text__grey-dark weight-500 py-4 px-5 text-ellipsis'>
                Profile
              </li>
              <li className='list-item list-item__hover border__bottom border__default text__grey-dark weight-500 py-4 px-5 text-ellipsis'>
                Account
              </li>
              <li className='list-item list-item__hover border__bottom border__default text__grey-dark weight-500 py-4 px-5 text-ellipsis'>
                Refer a friends
              </li>
              <li className='list-item list-item__hover border__bottom border__default text__grey-dark weight-500 py-4 px-5 text-ellipsis'>
                Switch to drive
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className='col-4 mt-4'>
        <div className='position-relative'>
          <div>Dropdown Header</div>
          <div className='dropdown dropdown-static'>
            <ul className='dropdown-list no-list-style mb-0'>
              <li className='list-item list-item__hover border__bottom border__default text__grey-dark weight-500 py-4 px-5 text-ellipsis'>
                Profile
              </li>
              <li className='list-item list-item__hover border__bottom border__default text__grey-dark weight-500 py-4 px-5 text-ellipsis active'>
                Account
              </li>
              <li className='list-item list-item__hover border__bottom border__default text__grey-dark weight-500 py-4 px-5 text-ellipsis'>
                Refer a friends
              </li>
              <li className='list-item list-item__hover border__bottom border__default text__grey-dark weight-500 py-4 px-5 text-ellipsis'>
                Switch to drive
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className='col-4 mt-4 mb-4'>
        <div className='position-relative'>
          <div>Dropdown Header</div>
          <div className='dropdown dropdown-static'>
            <ul className='dropdown-list no-list-style mb-0 px-5 py-1'>
              <li className='list-item border__bottom border__default py-4 d-flex align-items-center justify-content-between'>
                <span className='text__grey-dark weight-500'>Messages(0)</span>
                <button className='btn btn-secondary btn-sm'>View All</button>
              </li>
              <li className='list-item border__bottom border__default py-4 d-flex align-items-center justify-content-between'>
                <span className='text__grey-dark weight-500'>Notifications(0)</span>
                <button className='btn btn-secondary btn-sm'>View All</button>
              </li>
              <li className='list-item list-item__removable border__bottom border__default py-4 d-flex align-items-start justify-content-between'>
                <img
                  width='40'
                  height='40'
                  className='object-pos-center object-fit-cover rounded__50 mr-2'
                  src='data:image/png;base64,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'
                  alt='avatar'
                />
                <span className='text-xs'>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras at sed magna tortor
                  eget id quis tortor ornare
                </span>
                <button className='remove-btn btn btn-secondary btn-sm'>
                  <IconTimes />
                </button>
              </li>
              <li className='list-item list-item__removable border__bottom border__default py-4 d-flex align-items-start justify-content-between'>
                <img
                  width='40'
                  height='40'
                  className='object-pos-center object-fit-cover rounded__50 mr-2'
                  src='data:image/png;base64,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'
                  alt='avatar'
                />
                <span className='text-xs'>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras at sed magna tortor
                  eget id quis tortor ornare
                </span>
                <button className='remove-btn btn btn-secondary btn-sm'>
                  <IconTimes />
                </button>
              </li>
              <li className='list-item list-item__removable border__bottom border__default py-4 d-flex align-items-start justify-content-between'>
                <img
                  width='40'
                  height='40'
                  className='object-pos-center object-fit-cover rounded__50 mr-2'
                  src='data:image/png;base64,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'
                  alt='avatar'
                />
                <span className='text-xs'>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras at sed magna tortor
                  eget id quis tortor ornare
                </span>
                <button className='remove-btn btn btn-secondary btn-sm'>
                  <IconTimes />
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dropdowns;
