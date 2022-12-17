import React, { useCallback, useEffect, useState } from 'react';

import { PAYMENT_METHOD_FORM } from '../../../../config';
import { paymentMethodShape } from '../../../../utils/payment';
import useIvyPayment from '../hooks/useIvyPayment';
import useIvyPaymentAppContext from '../hooks/useIvyPaymentAppContext';
import useIvyPaymentCartContext from '../hooks/useIvyPaymentCartContext';
import useIvyPaymentFormikContext from '../hooks/useIvyPaymentFormikContext';
import RadioInput from '../../../../components/common/Form/RadioInput';
import Button from '../../../../components/common/Button';
import { __ } from '../../../../i18n';

function IvyPaymentRenderer({ method, selected }) {
  /* eslint-disable no-console */
  console.log(method, selected);
  /* eslint-enable no-console */
  const methodCode = method.code;
  const { placeOrder } = useIvyPayment();
  const { setPageLoader } = useIvyPaymentAppContext();
  const { setFieldValue } = useIvyPaymentFormikContext();
  const { isVirtualCart, setPaymentMethod, hasCartShippingAddress } =
    useIvyPaymentCartContext();
  const [isSelected, setIsSelected] = useState(false);
  useEffect(() => {
    setIsSelected(methodCode === selected.code);
  }, [methodCode, selected]);
  const isPaymentAvailable = !isVirtualCart && hasCartShippingAddress;

  const paymentSelectionHandler = useCallback(async () => {
    setPageLoader(true);
    setFieldValue(`${PAYMENT_METHOD_FORM}.code`, methodCode);
    await setPaymentMethod(methodCode);
    setPageLoader(false);
  }, [methodCode, setPageLoader, setPaymentMethod, setFieldValue]);

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
        <Button click={placeOrder}>
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
