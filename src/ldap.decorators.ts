import { Inject } from '@nestjs/common'
import { getLdapConnectionToken } from './ldap.utils'

export const InjectLdap = (connection?: string) => {
  return Inject(getLdapConnectionToken(connection))
}
