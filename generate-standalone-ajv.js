// Usage: node generate-standalone-ajv.js

const fs = require('fs')
const path = require('path')
const Ajv = require('ajv')
const standaloneCode = require('ajv/dist/standalone').default
const schema = require('har-schema')
const addFormats = require('ajv-formats')
const draft6MetaSchema = require("ajv/dist/refs/json-schema-draft-06.json")

const ajv = new Ajv({
  code: { source: true },
  strict: true,
  strictTypes: false,
})

ajv.addMetaSchema(draft6MetaSchema)
addFormats(ajv)

// fix for Error: strict mode: unknown keyword
ajv.addKeyword('optional')

ajv.addSchema(Object.values(schema))

const validate = ajv.getSchema('request.json')

let moduleCode = standaloneCode(ajv, validate)

fs.writeFileSync(path.join(__dirname, 'src/helpers/har-schema-validator.js'), moduleCode)
