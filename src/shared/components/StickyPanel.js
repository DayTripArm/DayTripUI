import React from 'react';
import {useSelector} from "react-redux";

const StickyPanel = ({ children, className = '' }) => {
    const {config={}} = useSelector(state => state);
    const {isAuthenticated} = config;

    return (
        <div className={`sticky-panel${!isAuthenticated ? ' stick-bottom' : ''} bg-white ${className}`}>
            {children}
        </div>
    )
};

export default StickyPanel;
