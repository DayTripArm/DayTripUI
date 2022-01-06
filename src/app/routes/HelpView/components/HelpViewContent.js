import React from 'react';
import {unescapeHTML} from '../../../../helper';

const HelpViewContent = ({item}) => {
  return (
    <div dangerouslySetInnerHTML={{__html: unescapeHTML(item?.description)}}></div>
  );
};

export default HelpViewContent;
