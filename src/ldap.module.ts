import { DynamicModule, Module } from '@nestjs/common'
import { LdapCoreModule } from './ldap.core-module'
import { LdapModuleAsyncOptions, LdapModuleOptions } from './ldap.interfaces'

@Module({})
export class LdapModule {
  public static forRoot(options: LdapModuleOptions, connection?: string): DynamicModule {
    return {
      module: LdapModule,
      imports: [LdapCoreModule.forRoot(options, connection)],
      exports: [LdapCoreModule],
    }
  }

  public static forRootAsync(options: LdapModuleAsyncOptions, connection?: string): DynamicModule {
    return {
      module: LdapModule,
      imports: [LdapCoreModule.forRootAsync(options, connection)],
      exports: [LdapCoreModule],
    }
  }
}
