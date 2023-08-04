import express from 'express'

export function getPaginateParams(req: express.Request) {
  const { limit, offset } = req.query
  return {
    limit: Number(limit) || undefined,
    offset: Number(offset) || undefined,
  }
}
