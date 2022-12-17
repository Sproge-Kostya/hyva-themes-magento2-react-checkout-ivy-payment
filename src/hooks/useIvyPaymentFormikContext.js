import { useContext } from 'react';

import { PaymentMethodFormContext } from '../../../../context/Form';

export default function useIvyPaymentFormikContext() {
  return useContext(PaymentMethodFormContext);
}
