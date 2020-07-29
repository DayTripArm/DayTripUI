import React, {useEffect, useState} from 'react';
import SelectCustom from 'shared/components/SelectCustom';
import Textarea from 'shared/components/Textarea';
import Input from 'shared/components/Input';
import Chips from 'shared/components/Chips';
import {useDispatch, useSelector} from "react-redux";
import actions from "../../../../actions";
import {DAYS, GENDER_LIST, GET_DATE_YEARS, LANGUAGES, MONTH_LIST} from "../../../../constants";
import _ from "lodash";

const ProfileData = () => {

    const [openDropdown, setOpenDropdown] = useState(false);

    const dispatch = useDispatch();

    const {driverData} = useSelector(state => state);
    const {preregistered_info} = driverData;
    const {
        gender,
        birthMonth,
        birthDay,
        birthYear,
        about,
        work,
        languages=""
    } = preregistered_info;

    const [selectedLanguages, setSelectedLanguages] = useState(languages.split(!_.isEmpty(languages) ? languages.split(',') : []));


    useEffect(() => {
        document.documentElement.scrollTop = 0;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const selectOnChange = (value, name) => {

        if (name === "languages") {
            console.log(" selectedLanguages ", selectedLanguages);
            console.log(" value ", value);
            console.log(" name ", name);
            // let langString = "";
            //
            // event && event.map(item => langString += item.value + ",");
            // value = langString.slice(0, -1);
        }

        dispatch(actions.setPreregisteredDriverProperty(name, value));
    };

    // const languageList = LANGUAGES.map(item => {return {label: item, value: item}});
    const genderList   = GENDER_LIST.map(item => {return {label: item, value: item}});
    const monthList    = MONTH_LIST.map((month, i) => {return {label: month, value: i}});
    const days         = DAYS.map(i => {return {label: i, value: i}});
    const yearList     = GET_DATE_YEARS().map(i => {return {label: i, value: i}});

    // let languageValue = [];
    // languages.split(",").map(i => languageValue.push(_.find(languageList, lang => lang.value === i)));

  return (
      <>
          <h4 className='text__blue mb-6'>Let’s Make Your Profile Looks Better</h4>
          <SelectCustom
              type='text'
              name='gender'
              label='Choose your Gender'
              placeholder='Choose'
              onChange={(event, opt) => selectOnChange(event.value, opt.name)}
              value={_.find(genderList, i => i.value === gender)}
              options={genderList}
          />

          <SelectCustom
              type='text'
              name='birthMonth'
              label='Date of Birth'
              placeholder='Choose'
              onChange={(event, opt) => selectOnChange(event.value, opt.name)}
              value={_.find(monthList, i => i.value === birthMonth)}
              options={monthList}
          />

          <div className='d-flex mxw-328px'>
              <div className='pr-2 flex-fill d-flex'>
                  <SelectCustom
                      type='text'
                      name='birthDay'
                      placeholder='Day'
                      onChange={(event, opt) => selectOnChange(event.value, opt.name)}
                      value={_.find(days, i => i.value === birthDay)}
                      options={days}
                      containerClass='field-flexible flex-fill mb-4'
                  />
              </div>
              <div className='pr-2 flex-fill d-flex'>
                  <SelectCustom
                      type='text'
                      name='birthYear'
                      placeholder='Year'
                      onChange={(event, opt) => selectOnChange(event.value, opt.name)}
                      value={_.find(yearList,i => i.value === birthYear)}
                      options={yearList}
                      containerClass='field-flexible flex-fill mb-4'
                  />
              </div>
          </div>

          <div className='form-field'>
              <label>Languages/Speaks</label>
              <div className={`rounded__4 border-style border__default pt-3${LANGUAGES.length === selectedLanguages.length ? ' pb-3' : ''}`}>
                  <div className='px-4'>
                      {selectedLanguages.map(item => (
                          <Chips
                              name={item}
                              key={item}
                              className='mr-1 mb-1'
                              removable
                              onRemove={() => {
                                  setSelectedLanguages(selectedLanguages.filter(v => v !== item));
                              }}
                          />
                      ))}
                  </div>

                  {LANGUAGES.length !== selectedLanguages.length && (
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
                                  {LANGUAGES.filter(v => !selectedLanguages.includes(v)).map(item => (
                                      <li
                                          className='list-item list-item__hover py-2 px-4 text-ellipsis'
                                          key={item}
                                          onClick={() => {
                                              setSelectedLanguages([...selectedLanguages.filter(v => v !== item), item]);
                                          }}
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
            name='about'
            label='About'
            placeholder="Tell travelers about yourself, your interest and hobbies."
            value={about}
            onChange={event => selectOnChange(event.target.value, "about")}
            className='h-152px'
          />

          <Textarea
              name='work'
              label='Work/Specialty'
              placeholder='What is your specialty?'
              onChange={event => selectOnChange(event.target.value, "work")}
              value={work}
          />
      </>
  );
};

export default ProfileData;
