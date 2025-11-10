import { PaymentMethodDetails as PaddlePaymentMethodDetails } from '@paddle/paddle-node-sdk';
import { CreditCard } from 'lucide-react';

type ExtendedPaymentType = PaddlePaymentMethodDetails['type'] | 'blik' | 'mb_way' | 'pix' | 'upi';

const PaymentMethodLabels: Record<ExtendedPaymentType, string> = {
  card: 'Card',
  alipay: 'Alipay',
  wire_transfer: 'Wire Transfer',
  apple_pay: 'Apple Pay',
  google_pay: 'Google Pay',
  paypal: 'PayPal',
  ideal: 'iDEAL',
  bancontact: 'Bancontact',
  korea_local: 'Korean Local Payment',
  offline: 'Offline',
  unknown: 'Unknown',
  blik: 'BLIK',
  mb_way: 'MB WAY',
  pix: 'PIX',
  upi: 'UPI',
};

interface Props {
  type: PaddlePaymentMethodDetails['type'];
  card?: PaddlePaymentMethodDetails['card'];
}

export function PaymentMethodDetails({ type, card }: Props) {
  if (type === 'card') {
    return (
      <>
        <CreditCard size={18} />
        <span className={'text-base text-secondary leading-4'}>**** {card?.last4}</span>
      </>
    );
  } else {
    return type ? <span className={'text-base text-secondary leading-4'}>{PaymentMethodLabels[type]}</span> : '-';
  }
}
