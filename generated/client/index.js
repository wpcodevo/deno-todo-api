
Object.defineProperty(exports, "__esModule", { value: true });

const {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
  NotFoundError,
  decompressFromBase64,
  getPrismaClient,
  sqltag,
  empty,
  join,
  raw,
  Decimal,
  Debug,
  objectEnumValues,
  makeStrictEnum
} = require('./runtime/index')


const Prisma = {}

exports.Prisma = Prisma

/**
 * Prisma Client JS version: 4.5.0
 * Query Engine version: 0362da9eebca54d94c8ef5edd3b2e90af99ba452
 */
Prisma.prismaVersion = {
  client: "4.5.0",
  engine: "0362da9eebca54d94c8ef5edd3b2e90af99ba452"
}

Prisma.PrismaClientKnownRequestError = PrismaClientKnownRequestError;
Prisma.PrismaClientUnknownRequestError = PrismaClientUnknownRequestError
Prisma.PrismaClientRustPanicError = PrismaClientRustPanicError
Prisma.PrismaClientInitializationError = PrismaClientInitializationError
Prisma.PrismaClientValidationError = PrismaClientValidationError
Prisma.NotFoundError = NotFoundError
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = sqltag
Prisma.empty = empty
Prisma.join = join
Prisma.raw = raw
Prisma.validator = () => (val) => val

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}


  const path = require('path')

const { findSync } = require('./runtime')
const fs = require('fs')

// some frameworks or bundlers replace or totally remove __dirname
const hasDirname = typeof __dirname !== 'undefined' && __dirname !== '/'

// will work in most cases, ie. if the client has not been bundled
const regularDirname = hasDirname && fs.existsSync(path.join(__dirname, 'schema.prisma')) && __dirname

// if the client has been bundled, we need to look for the folders
const foundDirname = !regularDirname && findSync(process.cwd(), [
    "generated\\client",
    "client",
], ['d'], ['d'], 1)[0]

const dirname = regularDirname || foundDirname || __dirname

/**
 * Enums
 */
// Based on
// https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275
function makeEnum(x) { return x; }

exports.Prisma.QueryMode = makeEnum({
  default: 'default',
  insensitive: 'insensitive'
});

exports.Prisma.SortOrder = makeEnum({
  asc: 'asc',
  desc: 'desc'
});

exports.Prisma.TodoScalarFieldEnum = makeEnum({
  id: 'id',
  title: 'title',
  content: 'content',
  category: 'category',
  published: 'published',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
});

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});


exports.Prisma.ModelName = makeEnum({
  Todo: 'Todo'
});

const compressedDMMF = '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'
const decompressedDMMF = decompressFromBase64(compressedDMMF)
// We are parsing 2 times, as we want independent objects, because
// DMMFClass introduces circular references in the dmmf object
const dmmf = JSON.parse(decompressedDMMF)
exports.Prisma.dmmf = JSON.parse(decompressedDMMF)

/**
 * Create the Client
 */
const config = {
  "generator": {
    "name": "client",
    "provider": {
      "fromEnvVar": null,
      "value": "prisma-client-js"
    },
    "output": {
      "value": "C:\\Users\\DELL\\Desktop\\learn\\blog\\Deno\\deno-prisma\\generated\\client",
      "fromEnvVar": null
    },
    "config": {
      "engineType": "library"
    },
    "binaryTargets": [],
    "previewFeatures": [
      "deno"
    ],
    "isCustomOutput": true
  },
  "relativeEnvPaths": {
    "rootEnvPath": "..\\..\\.env",
    "schemaEnvPath": "..\\..\\.env"
  },
  "relativePath": "..\\..\\prisma",
  "clientVersion": "4.5.0",
  "engineVersion": "0362da9eebca54d94c8ef5edd3b2e90af99ba452",
  "datasourceNames": [
    "db"
  ],
  "activeProvider": "postgresql",
  "dataProxy": true
}
config.document = dmmf
config.dirname = dirname

config.inlineSchema = 'Ly8gVGhpcyBpcyB5b3VyIFByaXNtYSBzY2hlbWEgZmlsZSwKLy8gbGVhcm4gbW9yZSBhYm91dCBpdCBpbiB0aGUgZG9jczogaHR0cHM6Ly9wcmlzLmx5L2QvcHJpc21hLXNjaGVtYQoKZ2VuZXJhdG9yIGNsaWVudCB7CiAgcHJvdmlkZXIgICAgICAgID0gInByaXNtYS1jbGllbnQtanMiCiAgcHJldmlld0ZlYXR1cmVzID0gWyJkZW5vIl0KICBvdXRwdXQgICAgICAgICAgPSAiLi4vZ2VuZXJhdGVkL2NsaWVudCIKfQoKZGF0YXNvdXJjZSBkYiB7CiAgcHJvdmlkZXIgPSAicG9zdGdyZXNxbCIKICB1cmwgICAgICA9IGVudigiREFUQUJBU0VfVVJMIikKfQoKbW9kZWwgVG9kbyB7CiAgaWQgICAgICAgIFN0cmluZyAgIEBpZCBAZGVmYXVsdCh1dWlkKCkpCiAgLy8gaWQgSW50IEBpZCBAZGVmYXVsdChhdXRvaW5jcmVtZW50KCkpCiAgdGl0bGUgICAgIFN0cmluZyAgIEB1bmlxdWUKICBjb250ZW50ICAgU3RyaW5nCiAgY2F0ZWdvcnkgIFN0cmluZwogIHB1Ymxpc2hlZCBCb29sZWFuPyBAZGVmYXVsdChmYWxzZSkKCiAgY3JlYXRlZEF0IERhdGVUaW1lIEBkZWZhdWx0KG5vdygpKQogIHVwZGF0ZWRBdCBEYXRlVGltZSBAdXBkYXRlZEF0CgogIEBAbWFwKG5hbWU6ICJ0b2RvcyIpCn0K'
config.inlineSchemaHash = '092077cfcc22aece790503c46abf78027448740fe11fbe57500db9f2d36a8780'

config.inlineDatasources = {
  "db": {
    "url": {
      "fromEnvVar": "DATABASE_URL",
      "value": null
    }
  }
}


const { warnEnvConflicts } = require('./runtime/index')

warnEnvConflicts({
    rootEnvPath: config.relativeEnvPaths.rootEnvPath && path.resolve(dirname, config.relativeEnvPaths.rootEnvPath),
    schemaEnvPath: config.relativeEnvPaths.schemaEnvPath && path.resolve(dirname, config.relativeEnvPaths.schemaEnvPath)
})

const PrismaClient = getPrismaClient(config)
exports.PrismaClient = PrismaClient
Object.assign(exports, Prisma)

