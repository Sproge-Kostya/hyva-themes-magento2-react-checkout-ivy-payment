import { useCallback } from 'react';

import createIvyCheckoutSession from '../api/cart/createIvyCheckoutSession';
import useIvyPaymentAppContext from "./useIvyPaymentAppContext";

export default function useIvyPayment() {
    const {setPageLoader, appDispatch} = useIvyPaymentAppContext();

    const placeOrder = useCallback(async () => {
        try {
            setPageLoader(true);
            await createIvyCheckoutSession(appDispatch, false);
        } catch (error) {
            console.error(error);
        } finally {
            setPageLoader(false);
        }
    }, [setPageLoader, createIvyCheckoutSession]);

    return {
        placeOrder
    };
}
