import React from 'react';

const Layout = ({ children }) => {
  return (
    <div className='mt-[100px] ml-[300px]'>
      <div className="max-w-6xl">{children}</div>
    </div>
  );
};

export default Layout;
