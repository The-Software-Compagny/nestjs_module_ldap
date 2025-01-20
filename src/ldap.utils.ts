import { Client } from 'ldapts'
import { LDAP_MODULE_CONNECTION, LDAP_MODULE_CONNECTION_TOKEN, LDAP_MODULE_OPTIONS_TOKEN } from './ldap.constants'
import { LdapModuleOptions } from './ldap.interfaces'

export function getLdapOptionsToken(connection: string): string {
  return `${connection || LDAP_MODULE_CONNECTION}_${LDAP_MODULE_OPTIONS_TOKEN}`
}

export function getLdapConnectionToken(connection: string): string {
  return `${connection || LDAP_MODULE_CONNECTION}_${LDAP_MODULE_CONNECTION_TOKEN}`
}

export async function createLdapConnection(options: LdapModuleOptions) {
  const { config } = options

  return new Client(config)
}
