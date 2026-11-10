import type { DeliveryOption, DeliveryRequestStatus } from 'model/deliveryRequest.model';

export const STATUS_TAG: Record<DeliveryRequestStatus, { color: string; label: string }> = {
  PENDING: { color: 'processing', label: '승인 대기' },
  APPROVED: { color: 'success', label: '승인' },
  REJECTED: { color: 'error', label: '반려' },
};

export const DELIVERY_OPTION_LABEL: Record<DeliveryOption, string> = {
  CAMPUS: '교내 배달',
  OFF_CAMPUS: '교외 배달',
  BOTH: '교내 · 교외 배달',
};

export const formatPrice = (price?: number) => (price === undefined ? '-' : `${price.toLocaleString()}원`);
