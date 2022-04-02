import React, { useEffect, useRef, useState } from 'react';
import { isRequired } from './helpers';
import type { PaymentProps } from './@types';
import SDKWrapper from './components/SDKWrapper';
import { WebView } from 'react-native-webview';
import {
  COPIED,
  FETCHED,
  PAYMENT_CLOSE,
  PAYMENT_ERROR,
  PAYMENT_SUCCESS,
} from './constants';
import Loader from './components/Loader';
import Clipboard from '@react-native-clipboard/clipboard';
import ErrorFallback from './components/Error';

const Lazerpay = (props: PaymentProps) => {
  const [checkPropsValue, setCheckProps] = useState(false);
  const webviewRef: any = useRef();

  const {
    publicKey,
    customerName,
    customerEmail,
    currency,
    businessLogo,
    reference,
    acceptPartialPayment,
    amount,
    onError,
    onSuccess,
    onClose,
    openSDK,
  } = props;
  useEffect(() => {
    const checkProps = () => {
      const validAmount =
        amount && !isNaN(+amount) && typeof +amount === 'number';
      let validProps =
        validAmount &&
        !!currency &&
        !!publicKey &&
        onClose !== undefined &&
        onSuccess !== undefined &&
        onError !== undefined;

      if (validProps) {
        setCheckProps(true);
      } else {
        console.error(
          "cannot initialize SDK, ensure you're passing all the required props"
        );
        !validAmount && console.error('Enter a valid amount');
        isRequired('publicKey', !!publicKey);
        isRequired('Enter an amount', !!amount);
        isRequired('Enter a Valid Currency', !!currency);
        isRequired('onClose callback', onClose !== undefined);
        isRequired('onError callback', onError !== undefined);
        isRequired('onSuccess callback', onSuccess !== undefined);
      }
    };

    if (openSDK) {
      checkProps();
    }
  }, [
    publicKey,
    customerName,
    customerEmail,
    currency,
    amount,
    businessLogo,
    reference,
    acceptPartialPayment,
    onError,
    onSuccess,
    onClose,
    openSDK,
  ]);

  let addressResponse: any = null;

  const messageReceived = ({ nativeEvent: { data } }: any) => {
    const response: any = JSON.parse(data);

    switch (response.event) {
      case PAYMENT_CLOSE:
        onClose();
        break;
      case PAYMENT_SUCCESS:
        onSuccess(response);
        break;
      case PAYMENT_ERROR:
        onError(response);
        break;

      case COPIED:
        Clipboard.setString(addressResponse.data.address);
        break;

      case FETCHED:
        addressResponse = response.data;
        break;
    }
  };

  const injectValues = () => {
    webviewRef.current.postMessage(
      JSON.stringify({
        customerName,
        customerEmail,
        currency,
        amount,
        acceptPartialPayment,
        publicKey,
        businessLogo,
        reference,
      })
    );
  };

  return (
    <SDKWrapper visible={openSDK} onRequestClose={onClose}>
      <WebView
        ref={webviewRef}
        source={{
          uri: 'https://lazerpay-react-native-59mryqtbi-lazerpay.vercel.app',
        }}
        onMessage={messageReceived}
        onLoadEnd={() => injectValues()}
        renderError={(error) => <ErrorFallback {...{ onClose, error }} />}
        cacheEnabled={false}
        cacheMode={'LOAD_NO_CACHE'}
        startInLoadingState={true}
        renderLoading={() => <Loader />}
      />
    </SDKWrapper>
  );
};

export default Lazerpay;
