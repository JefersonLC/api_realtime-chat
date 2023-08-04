import jwt from 'jsonwebtoken'
import UnauthorizedException from '../exceptions/UnathorizedException'

const secret = encodeURIComponent(process.env.SECRET_KEY as string)

export function generateToken(data: string) {
  const payload = JSON.parse(decodeURIComponent(data))
  const token = jwt.sign(payload, secret, { expiresIn: '1d' })
  return token
}

export function decodeToken(token: string) {
  try {
    const payload = jwt.verify(token, secret)
    return payload
  } catch (error) {
    throw new UnauthorizedException('Unauthorized')
  }
}
