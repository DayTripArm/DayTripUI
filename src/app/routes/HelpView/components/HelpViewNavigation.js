import React from 'react';
import { NavLink } from 'react-router-dom';
import { IconTimes } from 'shared/components/Icons';


const HelpViewNavigation = ({ open, onClose, helpContentList, params_id }) => {
  return (
    <div className={`menu-vertical bg-white px-1 px-md-0 d-${open ? 'block' : 'none'} d-md-block`}>
      <div className='p-4 text-right d-md-none'>
        <button className='btn btn-circle border-0' onClick={onClose}>
          <IconTimes />
        </button>
      </div>
      <ul className='no-list-style mb-0'>
        {
          helpContentList?.map((content, i) => {
               return (
                   content.tips ?
                   <li className='pl-3' key={content.id}>
                    <span className='weight-700 pb-2'>{content.title}</span>
                    <ul className='no-list-style mb-0'>
                        {
                            content?.map((tip, i) => {
                                return (
                                    <li>
                                        <NavLink to={`/help/${tip.id}`} className='pl-3 py-2'></NavLink>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </li> :
                <li key={content.id}>
                    <NavLink to={`/help/${content.id}`} className={`pl-3 py-2 ${params_id === content.id ? "active": ""}`} dangerouslySetInnerHTML={{__html: content.title}}></NavLink>
                </li> )

          })
        }
      </ul>
    </div>
  );
};

export default HelpViewNavigation;
