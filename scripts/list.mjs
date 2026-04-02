import { listSessions } from './session.mjs'

const sessions = listSessions()

console.log('\n  Agent Sessions\n')
console.log('  ID        NAME                    MSGS  LAST ACTIVE')
console.log('  ' + '-'.repeat(65))

for (const s of sessions.slice(0, 20)) {
  const name = (s.name || 'unnamed').slice(0, 22).padEnd(22)
  const msgs = String(s.messageCount).padEnd(5)
  const last = s.lastActive ? s.lastActive.slice(0, 16).replace('T', ' ') : '-'
  const tags = s.tags?.length ? `[${s.tags.join(',')}]` : ''
  console.log(`  ${s.id}  ${name}  ${msgs}  ${last}  ${tags}`)
}
console.log()
