---
name: ccb-session-manager
description: |
  Multi-session management for AI agents / 多会话管理器
  Creates, switches, and manages conversation sessions with context persistence.
  用途：创建、切换、管理多个对话会话，支持上下文持久化和跨会话搜索。
  触发词 / Triggers: "new session", "switch session", "session list", "新建会话", "切换会话"
---

# Session Manager / 会话管理器

Multi-session management for AI agents with context persistence.
AI Agent 多会话管理器，支持上下文持久化。

## 功能 / Features

- **Create / 创建** - 创建新会话并记录上下文
- **Switch / 切换** - 在多个会话间快速切换
- **List / 列表** - 查看所有会话及状态
- **Save / 保存** - 保存当前上下文到磁盘
- **Restore / 恢复** - 从磁盘恢复会话上下文
- **Export / 导出** - 导出会话为 JSON
- **Search / 搜索** - 跨会话搜索内容

## 会话存储 / Session Storage

```
~/.openclaw/sessions/
  sess_001/
    meta.json      # 元数据 / Metadata
    history.json   # 对话历史 / Conversation history
    context.json   # 工作上下文 / Working context
    files.json     # 引用的文件 / Referenced files
```

## 会话元数据 / Session Metadata

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

## 使用方法 / Usage

```bash
# 创建新会话 / Create new session
node new.mjs "Feature X development"

# 切换会话 / Switch session
node switch.mjs sess_003

# 列出所有会话 / List sessions
node list.mjs

# 保存当前上下文 / Save current context
node save.mjs sess_002

# 恢复会话上下文 / Restore session context
node restore.mjs sess_002

# 导出会话 / Export session
node export.mjs sess_002 > session.json

# 跨会话搜索 / Search across sessions
node search.mjs "TODO"
```

## 特性 / Features

- 会话标签和搜索 / Session tagging and search
- 切换前自动保存上下文 / Auto-snapshot before switch
- 7天前会话自动清理 / Auto-cleanup old sessions (7 days)
- 会话导入导出 / Session export/import
- 跨会话全文搜索 / Cross-session full-text search
