export type SDKWrapperProps = {
  visible: boolean;
  onRequestClose: () => void;
  children: any;
};

export type PaymentProps = {
  publicKey: string;
  customerName?: string;
  customerEmail: string;
  currency: string;
  amount: number | string;
  businessLogo?: string;
  reference?: string;
  acceptPartialPayment?: boolean;
  onError: (event: string) => void;
  onSuccess: (event: string) => void;
  onClose: () => void;
  openSDK: boolean;
};
