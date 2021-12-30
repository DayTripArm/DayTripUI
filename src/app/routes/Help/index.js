import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {useDispatch, useSelector} from "react-redux";
import actions from "../../../actions";

const Help = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const {config} = useSelector(state => state);
  const {helpContentList} = config;
  const locale_code = localStorage.getItem('lang') || 'en';

  useEffect(() => {
      dispatch(actions.getHelpContentListRequest(5, locale_code));
     // eslint-disable-next-line react-hooks/exhaustive-deps
  },[locale_code]);

  return (
    <div className='container'>
     { helpContentList?.title &&
        <h1 className='mxw-700px text__grey-dark mt-6 mb-md-8 mt-md-9 mt-xl-11 mb-xl-9 mb-xxl-11 mt-xxl-13'>
            {helpContentList.title}
        </h1>
      }
      <ul className='no-list-style mb-0 row'>
        { helpContentList?.tips?.map((content, i) => {
            return (
                <li className='mb-5 mb-md-6 mb-xl-9 col-md-6 col-xl-4 col-xxl-3' key={content.id}>
                  <h4 className='text__blue mb-3'>{content.title}</h4>
                  <p dangerouslySetInnerHTML={{__html: content.description}}></p>
                  <Link to={`/help/${content.id}`} className='btn btn-secondary btn-sm'>
                    {t("commons.read_more")}
                  </Link>
                </li>
            )
          })
        }
      </ul>
    </div>
  );
};

export default Help;
