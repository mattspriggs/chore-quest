import request from 'superagent'
import { Delivery, PrizeData, Prizes } from '../../models/prizes'

const serverUrl = '/api/v1/prizes'
// GET '/api/v1/prizes'
export async function getAllPrizes(token: string): Promise<Prizes[]> {
  const response = await request
    .get(`${serverUrl}`)
    .set('Authorization', `Bearer ${token}`)
  return response.body.prizes
}

export async function getRecentClaims(token: string): Promise<any> {
  const response = await request
    .get(`${serverUrl}/recent`)
    .set('Authorization', `Bearer ${token}`)
  console.log('claim response', response.body)
  return response.body.prizes
}

// GET '/api/v1/prizes/:id'
export async function getPrize(
  prizeId: string,
  token: string
): Promise<Prizes> {
  const response = await request
    .get(`${serverUrl}/${prizeId}`)
    .set('Authorization', `Bearer ${token}`)
  return response.body.prize
}

export async function deliverPrize(
  token: string,
  delivery: Delivery
): Promise<Prizes> {
  const response = await request
    .patch(`${serverUrl}/deliver`)
    .set('Authorization', `Bearer ${token}`)
    .send({ delivery })
  return response.body
}

// POST '/api/v1/prizes'
export async function addPrize(
  newPrize: PrizeData,
  token: string
): Promise<Prizes> {
  console.log('api prize', newPrize)
  const response = await request
    .post('/api/v1/prizes')
    .set('Authorization', `Bearer ${token}`)
    .send({ prize: newPrize })
  return response.body.prize
}

// PATCH '/api/v1/prizes'
export async function patchPrize(
  patchedPrize: PrizeData,
  token: string,
  prizeId: number
): Promise<void> {
  await request
    .patch(`${serverUrl}`)
    .set('Authorization', `Bearer ${token}`)
    .send({ prizeId, patchedPrize })
}

export async function claimPrize(
  token: string,
  prizeId: number
): Promise<void> {
  await request
    .patch(`${serverUrl}/claim`)
    .set('Authorization', `Bearer ${token}`)
    .send({ prizeId })
}
