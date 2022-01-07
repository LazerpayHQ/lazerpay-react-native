import React, { useEffect, useState } from 'react';
import { isRequired } from '../utils';
import type { PaymentProps } from '../@types';
import SDKWrapper from '../components/SDKWrapper';
import { WebView } from 'react-native-webview';
import { PAYMENT_CLOSE, PAYMENT_ERROR, PAYMENT_SUCCESS } from '../constants';
import Loader from '../components/Loader';

const Payment = (props: PaymentProps) => {
  const [checkPropsValue, setCheckProps] = useState(false);
  const {
    publicKey,
    customer_name,
    customer_email,
    currency,
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
        !!customer_name &&
        !!customer_email &&
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
    customer_name,
    customer_email,
    currency,
    amount,
    onError,
    onSuccess,
    onClose,
    openSDK,
  ]);
  const Lazerpaycontent = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="ie=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <link
            href="https://cdn.jsdelivr.net/gh/LazerPay-Finance/Sohne-font@main/Sohne-Buch.woff"
            rel="stylesheet"
            />
          <title>Lazerpay Checkout</title>
        </head>
          <body onload="payWithLazerpay()" style="background-color:#fff;height:100vh">
            <script src="https://cdn.jsdelivr.net/gh/LazerPay-Finance/checkout-build@main/checkout%401.0.1/dist/index.min.js"></script>
            <script type="text/javascript">
              window.onload = payWithLazerpay;
              function payWithLazerpay(){
                LazerCheckout({
                    name: '${customer_name}',
                    email: '${customer_email}',
                    amount: '${amount}',
                    key: '${publicKey}',
                    currency: '${currency || 'USD'}',
                    onClose: (data)=>{
                        const resp = {event:'cancelled'};
                        window.ReactNativeWebView.postMessage(JSON.stringify(resp))
                    },
                    callback: (data)=>{
                        const resp = {event:'successful', data};
                        window.ReactNativeWebView.postMessage(JSON.stringify(resp))
                    },
                    onError: (data)=>{
                        const resp = {event:'error'};
                        window.ReactNativeWebView.postMessage(JSON.stringify(resp))
                    }
                })
                }
            </script>
          </body>
      </html>
      `;

  const messageReceived = ({ nativeEvent: { data } }: any) => {
    const response = JSON.parse(data);
    switch (response.event) {
      case PAYMENT_CLOSE:
        onClose();
        break;
      case PAYMENT_SUCCESS:
        onSuccess(response);
        onClose();
        break;
      case PAYMENT_ERROR:
        onError(response);
        break;
    }
  };
  return (
    <SDKWrapper visible={openSDK} onRequestClose={onClose}>
      {checkPropsValue ? (
        <WebView
          source={{ html: Lazerpaycontent }}
          onMessage={messageReceived}
          startInLoadingState={true}
          renderLoading={() => <Loader />}
          //    renderError={(error) => <ErrorFallback {...{ onClose, error }} />}
        />
      ) : (
        'Something Went Wrong. Try again'
      )}
    </SDKWrapper>
  );
};

export default Payment;
