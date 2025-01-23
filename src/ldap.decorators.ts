import { Inject } from '@nestjs/common'
import { getLdapConnectionToken } from './ldap.utils'

/**
 * Inject the Ldap connection
 *
 * @param connection string
 * @returns ParameterDecorator
 * @export InjectLdap
 */
export const InjectLdap = (connection?: string) => {
  return Inject(getLdapConnectionToken(connection))
}
