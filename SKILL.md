---
name: ccb-session-manager
description: |
  Session management for AI agents. Creates, switches, and manages multiple
  conversation sessions with context persistence. Inspired by Claude Code Best's
  session handling. Triggers: "new session", "switch session", "session list",
  "save session", "restore session".
---

# Session Manager

Multi-session management for agents with context persistence.

## Usage

```bash
# Create new session
node new.mjs "Feature X development"

# Switch session
node switch.mjs sess_003

# List sessions
node list.mjs

# Save current session context
node save.mjs sess_002

# Restore session context
node restore.mjs sess_002

# Export session
node export.mjs sess_002 > session.json

# Search across sessions
node search.mjs "TODO"
```

## Session Storage

```
~/.openclaw/sessions/
  sess_001/
    meta.json      # Session metadata
    history.json   # Conversation history
    context.json    # Working context
    files.json     # Files referenced
  sess_002/
    ...
```

## Session Metadata (meta.json)

```json
{
  "id": "sess_001",
  "name": "Feature X development",
  "createdAt": "2026-04-02T18:00:00+08:00",
  "lastActive": "2026-04-02T18:30:00+08:00",
  "messageCount": 47,
  "model": "MiniMax-M2.7",
  "tags": ["feature", "backend"]
}
```

## Features

- Session tagging and search
- Context snapshot before switch
- Auto-cleanup of old sessions (7 days)
- Session export/import
- Cross-session search
