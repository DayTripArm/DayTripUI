import React from 'react';

const HelpViewContent = ({item}) => {
  return (
    <div dangerouslySetInnerHTML={{__html: item?.description}}></div>
  );
};

export default HelpViewContent;
