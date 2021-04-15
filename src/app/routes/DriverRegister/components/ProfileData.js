import React, {useEffect} from 'react';
import SelectCustom from 'shared/components/SelectCustom';
import Textarea from 'shared/components/Textarea';
import MultiSelect from 'shared/components/MultiSelect';
import {useDispatch, useSelector} from "react-redux";
import { useTranslation } from 'react-i18next';
import actions from "../../../../actions";
import {DAYS, GENDER_LIST, GET_DATE_YEARS, LANGUAGES, MONTH_LIST} from "../../../../constants";
import _ from "lodash";

const ProfileData = (props) => {
    const dispatch = useDispatch();
    const {invalidFields} = props;
    const { t } = useTranslation();
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

    useEffect(() => {
        document.documentElement.scrollTop = 0;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const selectOnChange = (value, name) => {

        if (name === "languages") {
            let langString = "";

            value && value.map(item => langString += item.value + ", ");
            value = langString.slice(0, -2);
        }

        dispatch(actions.setPreregisteredDriverProperty(name, value));
    };

    const languageList = LANGUAGES.map(item => {return {label: item, value: item}});
    const genderList   = GENDER_LIST.map(item => {return {label: t(`commons.gender.${item}`), value: t(`commons.${item}`)}});
    const monthList    = MONTH_LIST.map((month, i) => {return {label: t(`commons.months.${month}`), value: i}});
    const days         = DAYS.map(i => {return {label: i, value: i}});
    const yearList     = GET_DATE_YEARS().map(i => {return {label: i, value: i}});

    let languageValue = [];
    languages.split(", ").map(i => languageValue.push(_.find(languageList, lang => lang.value === i)));

  return (
      <>
          <h4 className='text__blue mb-6'>{t("driver_signup.step7.page_title")}</h4>
          <SelectCustom
              type='text'
              name='gender'
              label={t("driver_signup.step7.gender")}
              placeholder={t("commons.select_pholder")}
              onChange={(event, opt) => selectOnChange(event.value, opt.name)}
              value={_.find(genderList, i => i.value === gender)}
              options={genderList}
              noOptionsMessage={t("commons.no_options")}
              message={_.includes(invalidFields, "gender") ? t("commons.error_msgs.required_field") : ""}
              isError={_.includes(invalidFields, "gender")}
          />

          <SelectCustom
              type='text'
              name='birthMonth'
              label='Date of Birth'
              placeholder={t("commons.select_pholder")}
              noOptionsMessage={t("commons.no_options")}
              onChange={(event, opt) => selectOnChange(event.value, opt.name)}
              value={_.find(monthList, i => i.value === birthMonth)}
              options={monthList}
              message={_.includes(invalidFields, "birthMonth") ? t("commons.error_msgs.required_field") : ""}
              isError={_.includes(invalidFields, "birthMonth")}

          />

          <div className='d-flex mxw-328px'>
              <div className='pr-2 flex-fill d-flex'>
                  <SelectCustom
                      type='text'
                      name='birthDay'
                      placeholder={t("driver_signup.step7.birthday")}
                      onChange={(event, opt) => selectOnChange(event.value, opt.name)}
                      value={_.find(days, i => i.value === birthDay)}
                      options={days}
                      noOptionsMessage={t("commons.no_options")}
                      containerClass='field-flexible flex-fill mb-4'
                      message={_.includes(invalidFields, "birthDay") ? t("commons.error_msgs.required_field") : ""}
                      isError={_.includes(invalidFields, "birthDay")}
                  />
              </div>
              <div className='pr-2 flex-fill d-flex'>
                  <SelectCustom
                      type='text'
                      name='birthYear'
                      placeholder={t("driver_signup.step7.birthyear")}
                      onChange={(event, opt) => selectOnChange(event.value, opt.name)}
                      value={_.find(yearList,i => i.value === birthYear)}
                      options={yearList}
                      noOptionsMessage={t("commons.no_options")}
                      containerClass='field-flexible flex-fill mb-4'
                      message={_.includes(invalidFields, "birthYear") ? t("commons.error_msgs.required_field") : ""}
                      isError={_.includes(invalidFields, "birthYear")}
                  />
              </div>
          </div>

          <MultiSelect
              isMulti={true}
              name='languages'
              label={t("driver_signup.step7.langs_label")}
              placeholder={t("driver_signup.step7.langs_pholder")}
              onChange={event => selectOnChange(event, "languages")}
              value={languageValue}
              options={languageList}
              message={_.includes(invalidFields, "languages") ? t("commons.error_msgs.required_field") : ""}
              isError={_.includes(invalidFields, "languages")}
          />

          <Textarea
            name='about'
            label={t("driver_signup.step7.about_label")}
            placeholder={t("driver_signup.step7.about_pholder")}
            value={about}
            onChange={event => selectOnChange(event.target.value, "about")}
            className='h-152px'
          />

          <Textarea
              name='work'
              label={t("driver_signup.step7.occupation")}
              placeholder={t("driver_signup.step7.occupation_pholder")}
              onChange={event => selectOnChange(event.target.value, "work")}
              value={work}
          />
      </>
  );
};

export default ProfileData;
