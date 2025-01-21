import { ModuleMetadata, Type } from '@nestjs/common'
import { ClientOptions, Control, DN, SaslMechanism } from 'ldapts'

export interface LdapModuleOptions {
  config: LdapModuleOptionsConfig
}

export interface LdapModuleOptionsConfig {
  clients: Array<LdapClientOptions>
}

export interface LdapClientOptions {
  name: string
  options: ClientOptions
  default?: boolean
  bind?: {
    dn: DN | SaslMechanism | string
    password?: string
    controls?: Control | Control[]
  }
}

export * from 'ldapts'

export interface LdapModuleOptionsFactory {
  createLdapModuleOptions(): Promise<LdapModuleOptions> | LdapModuleOptions
}

export interface LdapModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  inject?: any[]
  useClass?: Type<LdapModuleOptionsFactory>
  useExisting?: Type<LdapModuleOptionsFactory>
  useFactory?: (...args: any[]) => Promise<LdapModuleOptions> | LdapModuleOptions
}
