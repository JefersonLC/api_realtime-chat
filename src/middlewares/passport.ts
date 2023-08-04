import passport, { AuthenticateOptions } from 'passport'

type Strategy = 'google' | 'bearer'

export function auth(strategy: Strategy, variables: AuthenticateOptions) {
  return passport.authenticate(strategy, variables)
}
