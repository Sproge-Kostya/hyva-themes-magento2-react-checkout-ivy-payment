import { useContext } from 'react';
import AppContext from '../../../../context/App/AppContext';

export default function useIvyPaymentAppContext() {
  const [
    { dispatch: appDispatch, isLoggedIn, checkoutAgreements },
    { setErrorMessage, setPageLoader },
  ] = useContext(AppContext);

  return {
    isLoggedIn,
    appDispatch,
    setPageLoader,
    setErrorMessage,
    checkoutAgreements,
  };
}
