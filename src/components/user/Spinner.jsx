import React from 'react';

const Spinner = () => (
  <div className="flex items-center justify-center h-screen">
  <div className="animate-bounce">
    <div className="w-12 h-12 border-t-4 border-b-4 border-purple-500 rounded-full"></div>
  </div>
</div>
);

export default Spinner;