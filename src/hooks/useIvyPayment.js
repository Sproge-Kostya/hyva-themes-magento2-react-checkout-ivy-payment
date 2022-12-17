import { useCallback, useState } from 'react';

import { __ } from '../../../../i18n';
import createIvyCheckoutSession from '../api/cart/createIvyCheckoutSession';
import useIvyPaymentAppContext from "./useIvyPaymentAppContext";

export default function useIvyPayment() {
    const {setPageLoader, appDispatch} = useIvyPaymentAppContext();
    const [sessionConfig, setSessionConfig] = useState(null);

    const placeOrder = useCallback(async () => {
        try {
            setPageLoader(true);
            await createIvyCheckoutSession(appDispatch, false);
            setIsInitialized(true);
        } catch (error) {
            console.error(error);
        } finally {
            setPageLoader(false);
        }
    }, [setPageLoader, isInitialized, getCheckoutSessionConfig]);

    return {
        placeOrder
    };
}
