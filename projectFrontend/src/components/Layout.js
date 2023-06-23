import React from 'react';

const Layout = ({ children }) => {
  return (
    <div className='mt-10 mb-10'>
      <div className="max-w-6xl mx-auto">{children}</div>
    </div>
  );
};

export default Layout;
