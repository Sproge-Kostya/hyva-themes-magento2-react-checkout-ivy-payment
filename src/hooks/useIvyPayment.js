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
      const response = await createIvyCheckoutSession(appDispatch, false);
      if (response.redirectUrl !== '') {
        if (Object.prototype.hasOwnProperty.call(window, 'startIvyCheckout')) {
          window.startIvyCheckout(response.redirectUrl, 'popup');
        } else {
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
