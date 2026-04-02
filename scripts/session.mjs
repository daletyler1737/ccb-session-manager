/**
 * Session Manager - Core module
 */
import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync } from 'fs'
import { join } from 'path'
import { homedir } from 'os'

const SESSION_DIR = join(homedir(), '.openclaw', 'sessions')
const MAX_AGE_DAYS = 7

mkdirSync(SESSION_DIR, { recursive: true })

function getSessionId() {
  const dirs = readdirSync(SESSION_DIR).filter(f => f.startsWith('sess_'))
  const nums = dirs.map(f => parseInt(f.replace('sess_', '')) || 0).sort((a, b) => b - a)
  return `sess_${String((nums[0] || 0) + 1).padStart(3, '0')}`
}

function createSession(name, options = {}) {
  const id = getSessionId()
  const dir = join(SESSION_DIR, id)
  mkdirSync(dir, { recursive: true })

  const meta = {
    id, name,
    createdAt: new Date().toISOString(),
    lastActive: new Date().toISOString(),
    messageCount: 0,
    model: options.model || 'unknown',
    tags: options.tags || [],
    cwd: options.cwd || process.cwd()
  }

  writeFileSync(join(dir, 'meta.json'), JSON.stringify(meta, null, 2))
  writeFileSync(join(dir, 'history.json'), '[]')
  writeFileSync(join(dir, 'context.json'), '{}')
  writeFileSync(join(dir, 'files.json'), '[]')

  return meta
}

function listSessions() {
  const dirs = readdirSync(SESSION_DIR).filter(f => f.startsWith('sess_'))
  const sessions = dirs
    .map(f => {
      try { return JSON.parse(readFileSync(join(SESSION_DIR, f, 'meta.json'), 'utf-8')) }
      catch { return null }
    })
    .filter(Boolean)
    .sort((a, b) => b.lastActive.localeCompare(a.lastActive))
  return sessions
}

function switchSession(id) {
  const dir = join(SESSION_DIR, `sess_${id}`)
  if (!existsSync(dir)) return null
  const meta = JSON.parse(readFileSync(join(dir, 'meta.json'), 'utf-8'))
  meta.lastActive = new Date().toISOString()
  writeFileSync(join(dir, 'meta.json'), JSON.stringify(meta, null, 2))
  return meta
}

function addHistory(id, entry) {
  const dir = join(SESSION_DIR, `sess_${id}`)
  if (!existsSync(dir)) return false
  const history = JSON.parse(readFileSync(join(dir, 'history.json'), 'utf-8'))
  history.push({ ...entry, at: new Date().toISOString() })
  writeFileSync(join(dir, 'history.json'), JSON.stringify(history, null, 2))
  const meta = JSON.parse(readFileSync(join(dir, 'meta.json'), 'utf-8'))
  meta.messageCount = history.length
  meta.lastActive = new Date().toISOString()
  writeFileSync(join(dir, 'meta.json'), JSON.stringify(meta, null, 2))
  return true
}

function getHistory(id) {
  const dir = join(SESSION_DIR, `sess_${id}`)
  if (!existsSync(dir)) return []
  return JSON.parse(readFileSync(join(dir, 'history.json'), 'utf-8'))
}

function searchSessions(query) {
  const results = []
  for (const sess of listSessions()) {
    const history = getHistory(sess.id)
    for (const entry of history) {
      if (JSON.stringify(entry).toLowerCase().includes(query.toLowerCase())) {
        results.push({ session: sess, entry })
        break
      }
    }
  }
  return results
}

export { createSession, listSessions, switchSession, addHistory, getHistory, searchSessions }
