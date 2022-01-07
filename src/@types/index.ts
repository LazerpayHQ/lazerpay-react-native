export type SDKWrapperProps = {
  visible: boolean;
  onRequestClose: () => void;
  children: any;
};

export type PaymentProps = {
  publicKey: string;
  customer_fullname?: string;
  customer_email?: string;
  currency: string;
  amount: number;
  onError: (event: string) => void;
  onSuccess: (event: string) => void;
  onClose: () => void;
  openSDK: boolean;
};
