<p align="center">
  <a href="http://nestjs.com/" target="blank">
    <img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" />
  </a>
</p>

<p align="center">
  A LDAP module for Nest framework (node.js) using <a href="https://github.com/ldapts/ldapts">ldapts</a> library
</p>

<p align="center">
  <a href="https://www.npmjs.com/org/The-Software-Compagny"><img src="https://img.shields.io/npm/v/@the-software-compagny/nestjs_module_ldap.svg" alt="NPM Version" /></a>
  <a href="https://www.npmjs.com/org/The-Software-Compagny"><img src="https://img.shields.io/npm/l/@the-software-compagny/nestjs_module_ldap.svg" alt="Package License" /></a>
  <a href="https://github.com/The-Software-Compagny/nestjs_module_ldap/actions/workflows/ci.yml"><img src="https://github.com/The-Software-Compagny/nestjs_module_ldap/actions/workflows/ci.yml/badge.svg" alt="Publish Package to npmjs" /></a>
</p>
<br>

# NestJS LDAP Module
LDAP module for NestJS Framework

## Install dependencies
```bash
yarn add @the-software-compagny/nestjs_module_ldap ldapts
```
## Instanciate
```ts
LdapModule.forRootAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (config: ConfigService) => ({
    config: config.get<LdapOptions>('ldap.options'),
  }),
})
```
