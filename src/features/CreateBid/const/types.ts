import type { TFunction } from "i18next";

enum Currency {
  RUB = 'RUB',
  USD = 'USD',
  EUR = 'EUR',
  GBP = 'GBP',
  CNY = 'CNY',
  OTHER = 'OTHER',
}

type TransactionStatus =
  | 'new'
  | 'accepted'
  | 'agent_suggestion'
  | 'importer_suggestion';

export type { Currency, TransactionStatus };

export interface Bid {
  id: string;
  paymentNumber?: number;
  user?: number;
  sum: number;
  currency?: Currency;
  purpose: string;
  tin?: string;
  rcr?: string;
  senderName?: string;
  senderAccount?: string;
  recipientName: string;
  recipientDetails: string;
  recipientCountry: string;
  recipientAddress?: string;
  recipientAccount?: string;
  recipientNationality?: string;
  recipientResidenceCountry?: string;
  bankCountry?: string;
  directorName?: string;
  directorNationality?: string;
  bank?: string;
  bankAddress?: string;
  bic?: string;
  vat?: string;
  description?: string;
  status?: TransactionStatus;
  date?: string;
  time?: string;
  creator_id?: string;
  assigned_id?: string;
  documents?: string[];
}

export interface BidShort {
  id: string;
  recipient_name: string;
  recipient_country: string;
  purpose: string;
  amount: string;
  currency: string;
  status: string;
}

export interface BidsResponse {
  items: BidShort[];
  total: number;
  page: number;
  limit: number;
}

export const getTransactionStatusOptions = (t: TFunction): { label: string; value: TransactionStatus }[] => [
  { value: 'new', label: t('enums.transactionStatus.new') },
  { value: 'accepted', label: t('enums.transactionStatus.accepted') },
  { value: 'agent_suggestion', label: t('enums.transactionStatus.agent_suggestion') },
  { value: 'importer_suggestion', label: t('enums.transactionStatus.importer_suggestion') },
];