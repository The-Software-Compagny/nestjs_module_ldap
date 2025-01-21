import { Logger } from '@nestjs/common'
import { Client, LdapModuleOptionsConfig } from './ldap.interfaces'

export class LdapManager {
  protected logger: Logger = new Logger(LdapManager.name)

  private _initialized: boolean = false
  private _defaultClient: String | Symbol
  private _clients: Map<String | Symbol, Client> = new Map()

  public constructor(private readonly _options?: LdapModuleOptionsConfig) {
    for (const client of _options.clients) {
      this._clients.set(client.name, new Client(client.options))

      if (client.default || _options.clients.length === 1) {
        this._defaultClient = client.name
      }
    }
  }

  public async initialize(): Promise<void> {
    for (const client of this._options.clients) {
      if (typeof client.bind === 'object' && client.bind.dn) {
        await this.clients
          .get(client.name)
          .bind(client.bind.dn, client.bind.password, client.bind.controls)
      }
    }
    this._initialized = true
  }

  public get clients(): Map<String | Symbol, Client> {
    return this._clients
  }

  public get defaultClient(): Client {
    return this._clients.get(this._defaultClient)
  }

  public get initialized(): boolean {
    return this._initialized
  }

  public getClient<T = {}>(name: String | Symbol): Client & T {
    if (!this.clients.has(name)) {
      throw new Error(`LDAP Connection ${name.toString()} not found`)
    }

    return this.clients.get(name) as Client & T
  }
}
