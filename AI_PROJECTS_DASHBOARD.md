# 🧭 AI Projects Dashboard

> One screen to see where everything stands. Update the tables by hand, or let Obsidian Dataview fill them in automatically.

---

## 🟢 Active Projects

| Project | Priority | Progress | Next Step |
|---------|----------|----------|-----------|
| Vedic Astrology Academy | medium | 60% | See [VEDIC_ASTROLOGY_ACADEMY.md](VEDIC_ASTROLOGY_ACADEMY.md) — pick next enhancement |

<details>
<summary>Optional: Obsidian Dataview query</summary>

```dataview
TABLE priority, progress, deadline
FROM ""
WHERE type = "ai-project" AND status = "active"
SORT priority DESC
```

</details>

---

## 💡 Ideas & Backlog

- [ ] (add ideas here — one line each, promote to a project note when ready)

<details>
<summary>Optional: Obsidian Dataview query</summary>

```dataview
LIST
FROM ""
WHERE type = "ai-project" AND status = "idea"
```

</details>

---

## ⏸️ On Hold

| Project | Why paused | Resume when |
|---------|-----------|-------------|
| — | — | — |

---

## ✅ Completed

| Project | Finished | Outcome |
|---------|----------|---------|
| Dashboard packet setup | 2026-06-13 | This repo structure |

---

## 🕐 Recently Touched

- 2026-06-13 — Created dashboard packet (this file and friends)

<details>
<summary>Optional: Obsidian Dataview query</summary>

```dataview
TABLE file.mtime AS "Last edited"
FROM ""
WHERE type = "ai-project"
SORT file.mtime DESC
LIMIT 5
```

</details>

---

## 🔭 Model / Tool Watchlist

| Tool / Model | Why watching | Notes |
|--------------|--------------|-------|
| Claude (Anthropic) | Main coding assistant | Used via Claude Code |
| Obsidian | Note system | Keep plugin use minimal |

---

## 🛡️ Important Safety Rules

1. **No private data in this repo** — no personal, medical, financial, password, or account info.
2. **This is not the full vault** — only copy notes here deliberately.
3. **AI assistants:** read [FABEL_CONTEXT.md](FABEL_CONTEXT.md) before editing anything.
4. **Small edits over big rewrites** — every change should be easy to review on a phone.
5. **Ask before deleting or reorganizing.**

---

## 🔗 Useful Links

- [FABEL_CONTEXT.md](FABEL_CONTEXT.md) — AI handoff starting point
- [AI_PROJECT_TEMPLATE.md](AI_PROJECT_TEMPLATE.md) — new project template
- [PROJECT_LOG.md](PROJECT_LOG.md) — change history
- [NEXT_STEPS.md](NEXT_STEPS.md) — setup checklist
