import { apiRequest } from "../../../shared/api/api";
import type { Bid, BidsResponse } from "../const/types";

export async function findAllShortBids(page: string, limit: string): Promise<BidsResponse> {
  const params = new URLSearchParams({ page, limit });
  return apiRequest(`/bids?${params}`);
}

export async function createBid(formData: FormData): Promise<Bid> {
  return apiRequest('/bids', {
    method: 'POST',
    body: formData,
  });
}

export async function findBidByUuid(id: string): Promise<Bid> {
  return apiRequest(`/bids/${id}`);
}

export async function updateBid(id: string, data: Partial<Bid>): Promise<Bid> {
  return apiRequest(`/bids/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
}

export async function removeBid(id: string): Promise<{ success: boolean } | unknown> {
  return apiRequest(`/bids/${id}`, {
    method: 'DELETE',
  });
}