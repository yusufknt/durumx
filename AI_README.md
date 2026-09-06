# DürümX - AI Context Router

Welcome AI Agent! To avoid exceeding your context window and to keep your instructions precise, we use a modular documentation system. 

**DO NOT guess the architecture. Read the specific rule file based on your current task.**

## 🚦 Documentation Router

Before modifying files, read the relevant markdown file from the `docs/ai/` folder based on what you are trying to do:

- 🏗️ **If you are modifying the Next.js page structure (`page.tsx`) or layout:**
  ➡️ Read `docs/ai/architecture.md`
- 📊 **If you are adding/editing data (Menu prices, branch locations, text content):**
  ➡️ Read `docs/ai/data.md`
- 🎨 **If you are creating or modifying a UI Component, Form, or Section:**
  ➡️ Read `docs/ai/components.md`

### Global Rule
Always use specific AI tools (e.g. `write_to_file`, `replace_file_content`) to edit files. Never use `cat >>` or `sed` for complex code modifications.
