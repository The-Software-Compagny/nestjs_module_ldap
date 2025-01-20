import { DynamicModule, Global, Module, Provider } from '@nestjs/common'
import { LdapModuleAsyncOptions, LdapModuleOptions, LdapModuleOptionsFactory } from './ldap.interfaces'
import { createLdapConnection, getLdapConnectionToken, getLdapOptionsToken } from './ldap.utils'

@Global()
@Module({})
export class LdapCoreModule {
  public static forRoot(options: LdapModuleOptions, connection?: string): DynamicModule {
    const ldapOptionsProvider: Provider = {
      provide: getLdapOptionsToken(connection),
      useValue: options,
    }

    const ldapConnectionProvider: Provider = {
      provide: getLdapConnectionToken(connection),
      useValue: createLdapConnection(options),
    }

    return {
      module: LdapCoreModule,
      providers: [ldapOptionsProvider, ldapConnectionProvider],
      exports: [ldapOptionsProvider, ldapConnectionProvider],
    }
  }

  public static forRootAsync(options: LdapModuleAsyncOptions, connection: string): DynamicModule {
    const ldapConnectionProvider: Provider = {
      provide: getLdapConnectionToken(connection),
      useFactory(options: LdapModuleOptions) {
        return createLdapConnection(options)
      },
      inject: [getLdapOptionsToken(connection)],
    }

    return {
      module: LdapCoreModule,
      imports: options.imports,
      providers: [...this.createAsyncProviders(options, connection), ldapConnectionProvider],
      exports: [ldapConnectionProvider],
    }
  }

  public static createAsyncProviders(options: LdapModuleAsyncOptions, connection?: string): Provider[] {
    if (!(options.useExisting || options.useFactory || options.useClass)) {
      throw new Error('Invalid configuration. Must provide useFactory, useClass or useExisting')
    }

    if (options.useExisting || options.useFactory) {
      return [this.createAsyncOptionsProvider(options, connection)]
    }

    return [this.createAsyncOptionsProvider(options, connection), { provide: options.useClass, useClass: options.useClass }]
  }

  public static createAsyncOptionsProvider(options: LdapModuleAsyncOptions, connection?: string): Provider {
    if (!(options.useExisting || options.useFactory || options.useClass)) {
      throw new Error('Invalid configuration. Must provide useFactory, useClass or useExisting')
    }

    if (options.useFactory) {
      return {
        provide: getLdapOptionsToken(connection),
        useFactory: options.useFactory,
        inject: options.inject || [],
      }
    }

    return {
      provide: getLdapOptionsToken(connection),
      async useFactory(optionsFactory: LdapModuleOptionsFactory): Promise<LdapModuleOptions> {
        return await optionsFactory.createLdapModuleOptions()
      },
      inject: [options.useClass || options.useExisting],
    }
  }
}
