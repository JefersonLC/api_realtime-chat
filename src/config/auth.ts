import {
  Strategy as GoogleStrategy,
  StrategyOptionsWithRequest,
} from 'passport-google-oauth20'
import { Strategy as BearerStrategy } from 'passport-http-bearer'
import UserService from '../services/user.service'
import { decodeToken } from '../utils/token'

const googleOptions: StrategyOptionsWithRequest = {
  clientID: String(process.env.GOOGLE_CLIENT_ID),
  clientSecret: String(process.env.GOOGLE_CLIENT_SECRET),
  callbackURL: process.env.GOOGLE_CALLBACK_URL,
  passReqToCallback: true,
}

export const googleStrategy = new GoogleStrategy(
  googleOptions,
  (_req, _accessToken, _refreshToken, profile, done) => {
    new UserService()
      .findOrCreate(profile)
      .then((user) => done(null, user))
      .catch((err) => done(err, undefined))
  }
)

export const bearerStrategy = new BearerStrategy((token, done) => {
  const user = decodeToken(token)
  done(null, user)
})
