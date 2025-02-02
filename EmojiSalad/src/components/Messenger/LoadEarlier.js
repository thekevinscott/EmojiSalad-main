import React from 'react';

import { LaddaButton } from '../LaddaButton';
//import moment from 'moment';

export default function LoadEarlier({
  isLoading,
  handleLoadEarlier,
  //updated,
}) {
  //const updatedString = moment(updated).format('Do h:mm:ss a');
  return (
    <LaddaButton
      onLoadEarlier={handleLoadEarlier}
      isLoading={isLoading}
    >
      Load Earlier
    </LaddaButton>
  );
}

