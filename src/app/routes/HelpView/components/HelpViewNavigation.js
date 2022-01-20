import React from 'react';
import { NavLink } from 'react-router-dom';


const HelpViewNavigation = ({ open, onClose, helpContentList, params_id }) => {
  return (
    <div className={`menu-vertical bg-white px-1 px-md-0 d-${open ? 'block' : 'none'} d-md-block`}>
      <ul className='no-list-style mb-0'>
        {
          helpContentList?.map((content, i) => {
            return (
                     <li className='pl-3' key={content.id}>
                         <NavLink to={`/help/${content.id}`} className={`pl-2 pb-2 ${content.parent_content_id === null ? "weight-700": ""}`}>{content.title}</NavLink>
                         <ul className='no-list-style mb-0'>
                        {
                            content.tips && content.tips.map((list_item, i) => {
                                return (
                                    <li key={list_item.id}>
                                        <NavLink to={`/help/${list_item.id}`} className={`pl-4 py-2 ${parseInt(params_id) === list_item.id ? "active": ""}`} dangerouslySetInnerHTML={{__html: list_item.title}}></NavLink>
                                    </li>
                                )
                            })
                        }
                        </ul>
                    </li>
                )
          })
        }
      </ul>
    </div>
  );
};

export default HelpViewNavigation;
