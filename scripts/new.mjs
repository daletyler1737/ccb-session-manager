import { createSession } from './session.mjs'

const name = process.argv.slice(2).join(' ') || 'New Session'
const model = process.env.AGENT_MODEL || 'unknown'
const cwd = process.env.AGENT_CWD || process.cwd()

const result = createSession(name, { model, cwd })
console.log(JSON.stringify(result, null, 2))
console.log(`\n✓ Session created: ${result.id}`)
