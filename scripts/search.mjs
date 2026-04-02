import { searchSessions } from './session.mjs'

const query = process.argv.slice(2).join(' ')
if (!query) {
  console.error('Usage: node search.mjs "<query>"')
  process.exit(1)
}

const results = searchSessions(query)

console.log(`\n  Found ${results.length} matches for "${query}"\n`)
for (const { session, entry } of results.slice(0, 20)) {
  const role = entry.role || entry.type || 'unknown'
  const content = typeof entry.content === 'string'
    ? entry.content.slice(0, 80)
    : JSON.stringify(entry.content || '').slice(0, 80)
  console.log(`  ${session.id} (${session.name}):`)
  console.log(`    [${role}] ${content}...`)
}
console.log()
