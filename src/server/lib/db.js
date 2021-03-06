import fs from 'fs'
import path from 'path'

import knex from 'knex'

const configString = fs.readFileSync(path.join(process.cwd(), 'knexfile.json'))
const config = JSON.parse(configString)

const env = process.env.NODE_ENV || 'development'

const dbConfig = config[env] || config['development']

export let db
if (!db) {
  db = knex(config[env])
  if (!db.schema.hasTable('users')) {
    db.migrate.latest().then(() => db.seed.run())
  }
}

export default db
