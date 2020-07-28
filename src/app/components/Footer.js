/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Link } from 'react-router-dom';
import { IconFbFilled, IconTwitter, IconInstagramOutlined } from 'shared/components/Icons';

const Footer = () => {
  // Conditionally
  const isAuthenticated = true;

  // For page or pages which contains sticky panel on the bottom (e.g. /individuals/driver or /tour)
  const pageContainsStickyPanel = /individuals|tour/.test(window.location.pathname);

  return (
    <footer
      className={`footer border__top border__default py-5${
        isAuthenticated ? ' footer-spaced' : ''
      }${pageContainsStickyPanel ? '' : ' mt-15'}`}
    >
      <div className='container'>
        <div className='d-flex flex-column flex-md-row align-items-center justify-content-between'>
          <p className='mb-0 order-2 order-md-0'>&copy; Daytrip. All rights reserved.</p>
          <div className='d-flex align-items-center flex-column flex-md-row'>
            <div className='mb-5 mb-md-0'>
              <Link to='/terms' className='text__grey-dark mr-4 mr-md-8'>
                Terms & Conditions
              </Link>
              <Link to='/help' className='text__grey-dark mr-md-8'>
                Help
              </Link>
            </div>
            <div className='mb-5 mb-md-0'>
              <a href='#' className='mr-4'>
                <IconFbFilled />
              </a>
              <a href='#' className='mr-4'>
                <IconInstagramOutlined />
              </a>
              <a href='#' className='mr-4'>
                <IconTwitter />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
