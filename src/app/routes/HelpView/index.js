import React, { useState, useEffect } from 'react';
import {IconDots } from 'shared/components/Icons';
import HelpViewNavigation from './components/HelpViewNavigation';
import HelpViewContent from './components/HelpViewContent';
import { useParams } from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import { useTranslation } from 'react-i18next';
import actions from "../../../actions";
import Breadcrumbs from 'shared/components/Breadcrumbs';
const HelpView = ({ history }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const {config} = useSelector(state => state);
  const {helpContentList, individualContent} = config;

  const locale_code = localStorage.getItem('lang') || 'en';
  const { t } = useTranslation();
  const routes = [
        {
            route: '/help',
            name: t("home_page.top_menu.help"),
            isActive : false
        },
        {
            route: individualContent && `/help/${individualContent.id}}`,
            name: individualContent && `${individualContent.title}`,
            isActive : true
        },
  ];

  let { id } = useParams();
  useEffect(() => {
    dispatch(actions.getHelpContentListRequest(5, locale_code));
    dispatch(actions.getIndividualContentRequest(5, locale_code, id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[locale_code, id]);
  return (
    <div className='container'>
      <div className='pt-5 pb-6 d-flex justify-content-between'>
        <Breadcrumbs routes={routes} className='mt-4 mb-5 mt-xl-5 mb-xl-6' />
        <button
          className='btn btn-circle size-fixed border-0 d-md-none'
          onClick={() => setOpen(true)}
        >
          <IconDots />
        </button>
      </div>
      <div className='row'>
        <div className='col-md-4 col-lg-3 d-flex justify-content-xl-end'>
          <HelpViewNavigation open={open} onClose={() => setOpen(false)}  helpContentList={helpContentList?.tips} params_id={id} />
        </div>
        <div className='col-12 col-md-8 col-lg-9'>
          <HelpViewContent item={individualContent} />
        </div>
      </div>
    </div>
  );
};

export default HelpView;
