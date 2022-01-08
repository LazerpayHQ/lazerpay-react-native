# Lazerpay Official react-native sdk

Lazerpay SDK allows you accept payments easily in your react-native application
<img src="https://raw.githubusercontent.com/njokuScript/screenshots/master/step-1.png" alt='screenshot of SDK' width='250px' />
<img src="https://raw.githubusercontent.com/njokuScript/screenshots/master/step-2.png" alt='screenshot of SDK' width='250px' />
<img src="https://raw.githubusercontent.com/njokuScript/screenshots/master/step3.png" alt='screenshot of SDK' width='250px' />
<img src="https://raw.githubusercontent.com/njokuScript/screenshots/master/final.png" alt='screenshot of SDK' width='250px' />

## Installation

```sh
npm install lazerpay-react-native
```

Also install `react-native-webview` because it's a dependency for this package. Here's a [link](https://github.com/react-native-webview/react-native-webview) to their docs.

## Usage

```js
import { LazerPay } from 'lazerpay-react-native';

const InitiatePayment = () => {
  const [openSDK, setopenSDK] = useState(false);

  return (
    <View>
      <LazerPay
        {...{
          publicKey: 'PUBLIC_KEY',
          customerName: 'CUSTOMERS FULL NAME',
          billingEmail: 'CUSTOMER EMAIL',
          currency: 'CURRENCY', // USD, NGN, AED, GBP, EUR
          amount: 10, // amount as a number
          onSuccess: (response) => {
            // handle response here
          },
          onClose: () => setopenSDK(false),
          onError: (response) => {
            // handle responsne here
          },
          openSDK,
        }}
      />

      <TouchableOpacity onPress={() => setopenSDK(true)}>
        <Text> Initiate Payment</Text>
      </TouchableOpacity>
    </View>
  );
};
```

## Configuration Options

- [`publicKey`](#publicKey)
- [`customerName`](#customerName)
- [`billingEmail`](#billingEmail)
- [`currency`](#currency)
- [`amount`](#amount)
- [`onSuccess`](#onSuccess)
- [`onError`](#onError)
- [`onClose`](#onClose)

### <a name="publicKey"></a> `publicKey`

**string: Required**
Your public key can be found on your [dashboard](https://beta.lazerpay.finance) settings.

### <a name="customerName"></a> `customerName`

**string: Required**
The name of the customer trying to make payments

### <a name="customerEmail"></a> `customerEmail`

**string: Required**
The email of the customer trying to make payments

### <a name="currency"></a> `currency`

**string: Required**
The name of the fiat currency the merchant accepts

### <a name="amount"></a> `amount`

**number: Required**
The amount you want to charge the user in `currency`

### <a name="onSuccess"></a> `onSuccess`

**(response) => { Void }: Required**
This is called when a transaction is successfully. It returns a response.

### <a name="onError"></a> `onError `

**(response) => { Void }: Required**
This is called when a transaction fails. It returns a response.

<!-- See the [event details](#lazerpayEvent) below. -->

### <a name="onClose"></a> `onClose `

**() => { Void }: Required**
This is called when a user clicks on the close button.

The Transaction JSON returned for successful events

```ts
{
  "event": "successful",
  "data": {
    "id": "12896b32-0d7d-4744-bc15-5960af40d519",
    "reference": "aa6KlHy88D",
    "senderAddress": "0x0B4d358D349809037003F96A3593ff9015E89efA",
    "recipientAddress": "0x785F44E779cfEeDeBf7aA7CFde19DaA3312fd19e",
    "actualAmount": 10,
    "amountPaid": 10,
    "fiatAmount": 10,
    "coin": "BUSD",
    "currency": "USD",
    "hash": "0x3332d7b046d53e90dc0337c715252f210386c2a471c5025c953a0b1d9bc90593",
    "blockNumber": 14160827,
    "type": "received",
    "status": "confirmed",
    "network": "mainnet",
    "blockchain": "Binance Smart Chain",
    "customer": {
      "id": "b847dbbd-e5a4-4afc-ba26-b292707dc391",
      "customerName": "Njoku Emmanuel",
      "customerEmail": "kalunjoku123@gmail.com",
      "customerPhone": null,
      "network": "mainnet"
    }
  }
}
```

## Configuration Options for Making Payments

### <a name="openSDK"></a> `openSendSDK`

**boolean: Required**

This is a prop to display/hide the sdk

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## Support

If you're having trouble with Lazerpay React Native SDK or your integration, please reach out to us at <help@lazerpay.finance> or come chat with us on Slack. We're more than happy to help you out.

## License

MIT
