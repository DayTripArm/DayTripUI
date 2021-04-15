import React, {useEffect, useState} from 'react';
import { IconQuestionOutlined } from 'shared/components/Icons';
import ModalAside from 'shared/components/ModalAside';
import FormDropZone from 'shared/components/FormDropZone';
import {useDispatch, useSelector} from "react-redux";
import { useTranslation } from 'react-i18next';
import actions from "../../../../actions";
import _ from "lodash";

const CarRegistration = (props) => {
    const [openModal, setOpenModal] = useState(false);
    const {driverData} = useSelector(state => state);
    const {preregistered_info} = driverData;
    const { t } = useTranslation();
    const {invalidFields} = props;

    const {
        car_photos=[],
        tips={},
    } = preregistered_info;
    const title = t("driver_signup.step3.title");
    const dispatch = useDispatch();

    const carTips = tips[1]; // type = 1

    useEffect(() => {
        document.documentElement.scrollTop = 0;
        dispatch(actions.tipsRequest(1));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


  return (
      <>
          <h4 className='text__blue mb-4'>
              <span className={_.includes(invalidFields, "car_photos") ? "text-danger" : ""}>{_.includes(invalidFields, "car_photos") ? title + "*" : title}</span>
              <button className='btn btn-circle btn-sm border-0 pull-t-5' onClick={() => {
                  setOpenModal(true);
                  window.location.hash = "modal"
              }}>
                  <IconQuestionOutlined fill='#757575' />
              </button>
          </h4>
          <p className='text__grey-dark'>{t("driver_signup.step3.text")}</p>

          <FormDropZone
              type="car_photos"
              label={t("commons.upload_box_title")}
              photos={car_photos}
          />

          {openModal && (
              <ModalAside title={t("driver_signup.step3.help_slider_title")} onClose={() => setOpenModal(false)}>
                  <h4 className='text__blue'>{!_.isEmpty(carTips) && carTips.title}</h4>

                  {
                      !_.isEmpty(carTips) && carTips.tips.map((tip, i) => {
                          return(
                              <div key={i}>
                                  <p className='weight-500 mb-3'>
                                      <span className='bullet bg__black mr-2 mb-01' />
                                      {tip.title}
                                  </p>
                                  <p className='mb-5' dangerouslySetInnerHTML={{__html: tip.description}}></p>
                              </div>
                          );
                      })
                  }
              </ModalAside>
          )}
      </>
  );
};

export default CarRegistration;
