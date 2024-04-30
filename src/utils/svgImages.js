import * as React from 'react';
import { SvgCssUri } from 'react-native-svg/css';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
const SvgComponent=(params) =>{
  return (
    <>
      <SvgCssUri
        width={hp('6%')}
        height={hp('6%')}
        uri={params.uri}
      />
    </>
  );
}

export default SvgComponent;