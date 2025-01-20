import { ModuleMetadata, Type } from '@nestjs/common'
import { ClientOptions } from 'ldapts'

export interface LdapModuleOptions {
  config: ClientOptions
}

export { ClientOptions } from 'ldapts'

export interface LdapModuleOptionsFactory {
  createLdapModuleOptions(): Promise<LdapModuleOptions> | LdapModuleOptions
}

export interface LdapModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  inject?: any[]
  useClass?: Type<LdapModuleOptionsFactory>
  useExisting?: Type<LdapModuleOptionsFactory>
  useFactory?: (...args: any[]) => Promise<LdapModuleOptions> | LdapModuleOptions
}
