export type SDKWrapperProps = {
  visible: boolean;
  onRequestClose: () => void;
  children: any;
};

export type Currency = 'NGN' | 'USD' | 'AED' | 'GBP' | 'EUR';

export type PaymentProps = {
  publicKey: string;
  customerName?: string;
  customerEmail: string;
  currency: Currency;
  amount: number | string;
  businessLogo?: string;
  reference?: string;
  acceptPartialPayment?: boolean;
  onError: (event: string) => void;
  onSuccess: (event: string) => void;
  onClose: () => void;
  openSDK: boolean;
};
