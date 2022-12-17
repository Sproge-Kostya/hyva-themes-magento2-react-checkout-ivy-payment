import React, {useCallback, useEffect} from 'react';

import {PAYMENT_METHOD_FORM} from '../../../../config';
import {paymentMethodShape} from '../../../../utils/payment';
import useIvyPaymentAppContext from '../hooks/useIvyPaymentAppContext';
import useIvyPaymentCartContext from '../hooks/useIvyPaymentCartContext';
import useIvyPaymentFormikContext from '../hooks/useIvyPaymentFormikContext';
import useIvyPaymentCheckoutFormContext from '../hooks/useIvyPaymentCheckoutFormContext';
import RadioInput from '../../../../components/common/Form/RadioInput';
import Button from '../../../../components/common/Button';
import {__} from '../../../../i18n';

function IvyPaymentRenderer({method, selected}) {
    const methodCode = method.code;
    const {setPageLoader} = useIvyPaymentAppContext();
    const {setFieldValue} = useIvyPaymentFormikContext();
    const {isVirtualCart, setPaymentMethod, hasCartShippingAddress} = useIvyPaymentCartContext();

    const {registerPaymentAction} = useIvyPaymentCheckoutFormContext();
    const isSelected = methodCode === selected.code;
    const isPaymentAvailable = !isVirtualCart && hasCartShippingAddress;

    const paymentSelectionHandler = useCallback(async () => {
        setPageLoader(true);
        setFieldValue(`${PAYMENT_METHOD_FORM}.code`, methodCode);
        await setPaymentMethod(methodCode);
        setPageLoader(false);
    }, [methodCode, setPageLoader, setPaymentMethod, setFieldValue]);

    // Initializing amazon pay button.
    useEffect(() => {
        if (isSelected) {
            initializeAmazonButton();
        }
    }, [isSelected, initializeAmazonButton]);

    // Allow to place order with amazon pay without showing the amazon pay button.
    useEffect(() => {
        registerPaymentAction(methodCode, placeAmazonPayOrder);
    }, [methodCode, placeAmazonPayOrder, registerPaymentAction]);

    const radioLabel = (
        // eslint-disable-next-line jsx-a11y/label-has-associated-control
        <label
            htmlFor={`paymentMethod_${methodCode}`}
            className="inline-block pl-2 cursor-pointer"
        >
            <span>{__('Ivy Payment Logo')}</span>
        </label>
    );

    return (
        <>
            <RadioInput
                label={radioLabel}
                value={method.code}
                name="paymentMethod"
                checked={isSelected}
                disabled={!isPaymentAvailable}
                onChange={paymentSelectionHandler}
            />
            <div className={isSelected ? 'mt-4 ml-6' : 'hidden h-0'}>
                <Button onClick={}>
                    <span>{__('Ivy Payment')}</span>
                </Button>
            </div>
        </>
    );
}

IvyPaymentRenderer.propTypes = {
    method: paymentMethodShape.isRequired,
    selected: paymentMethodShape.isRequired,
};
export default IvyPaymentRenderer;
