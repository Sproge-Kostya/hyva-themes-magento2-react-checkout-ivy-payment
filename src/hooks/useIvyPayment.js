import { useCallback } from 'react';

import createIvyCheckoutSession from '../api/cart/createIvyCheckoutSession';
import useIvyPaymentAppContext from './useIvyPaymentAppContext';
import { __ } from '../../../../i18n';

export default function useIvyPayment() {
  const { setPageLoader, appDispatch, setErrorMessage } =
    useIvyPaymentAppContext();

  const placeOrder = useCallback(async () => {
    try {
      setPageLoader(true);
      /* eslint-disable no-console */
      console.log('setPageLoader');
      /* eslint-enable no-console */
      const response = await createIvyCheckoutSession(appDispatch, false);
      /* eslint-disable no-console */
      console.log(response);
      /* eslint-enable no-console */
      if (response.redirectUrl !== '') {
        if(window.hasOwnProperty('startIvyCheckout')){
          /* eslint-disable no-console */
          console.log('startIvyCheckout');
          /* eslint-enable no-console */
          window.startIvyCheckout(response.redirectUrl, 'popup');
        }else{
          setErrorMessage(__('not loading CDN for IvyCheckout'));
        }
      } else {
        setErrorMessage(__(response.errorMessage));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setPageLoader(false);
    }
  }, [setPageLoader, appDispatch, setErrorMessage]);

  return {
    placeOrder,
  };
}
