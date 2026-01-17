---
name: sound-inform-rules
description: "Rules and workflows for Sound Informer Widget project: memory bank management, commit procedures, VCS policies, and development conventions for a Mapbox-based embeddable widget"
---

# Sound Informer Project Rules

This skill contains project-specific rules for the Sound Informer Widget — an embeddable widget displaying an interactive Mapbox map with noise monitoring sensor markers.

## Project Context

- **Location**: Application code is in `/sound-informer` folder
- **Stack**: React + TypeScript + Vite + Mapbox
- **Purpose**: Embeddable widget for third-party websites showing noise pollution data

## Rules Overview

### 1. General Project Rules (`general-project-rules.mdc`)
- Application is located in `/sound-informer` directory
- Always run `nvm use` before any npm command

### 2. Memory Bank System (`memorybankinstructions.md`, `memory-bank-location.mdc`)
- Memory Bank files are located in `.cursor/memory-bank/`
- MUST read ALL memory bank files at the start of EVERY task
- Core files: `projectbrief.md`, `productContext.md`, `activeContext.md`, `systemPatterns.md`, `techContext.md`, `progress.md`, `roadmap.md`
- Update memory bank when discovering patterns, implementing changes, or on explicit request

### 3. Memory Bank Timestamps (`memorybank-timestamps.mdc`)
- Use exact format `YY-MM-DD-HH-MM` for all dated entries
- Always obtain timestamps via `date +"%y-%m-%d-%H-%M"` command
- Entries must be sorted in reverse chronological order (newest first)

### 4. Commit Procedure (`commit-procedure.mdc`)
When explicitly asked to commit:
1. Check for unused parameters in functions
2. Ensure documentation coverage for public APIs
3. Update memory bank and roadmap
4. Create commit with descriptive message

### 5. No Auto-Commit Policy (`no-auto-commit.mdc`)
- NEVER commit without explicit user instruction (word "commit")
- No auto-staging of changes
- Summarize what will be committed before executing
- Ask permission if workflow typically ends with commit

### 6. Rule Visibility (`rule-visibility.mdc`)
- Display names of applied rules at the beginning of each response
- Only show rules that are relevant to the current action

## Key Workflows

### Starting a Task
1. Read all memory bank files
2. Verify context and current focus
3. Check `activeContext.md` for recent changes and next steps

### After Making Changes
1. Update relevant memory bank files
2. Keep changes uncommitted unless explicitly asked
3. Document patterns and insights discovered

### On "update memory bank" Request
- Review EVERY memory bank file
- Focus on `activeContext.md` and `progress.md`
- Use proper timestamp format