export type SDKWrapperPrps = {
  visible: boolean;
  onRequestClose: () => void;
  children: any;
};

export type PaymentProps = {
  publicKey: string;
  name?: string;
  email?: string;
  currency: string;
  amount: number;
  onError: (event: string) => void;
  onSuccess: (event: string) => void;
  onClose: () => void;
  openSDK: boolean;
};
