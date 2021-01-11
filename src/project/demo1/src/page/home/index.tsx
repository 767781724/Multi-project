import React from 'react';
import './index.scss';

const PREFIX = 'home';


/**
 * 首页
 * @return {JSX.Element}
 */
function HomePage() {
  return (
    <div className={PREFIX}>
      <div className={`${PREFIX}-main`}>
        <h1> Hello world! </h1>
      </div>
    </div>
  );
}

export default HomePage;
