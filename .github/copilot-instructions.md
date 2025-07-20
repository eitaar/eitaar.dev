# GitHub Copilot Instruction

## Overview

In this project, please use GitHub Copilot according to the following rules.

## Rules

1. **Response Language**

- Even if the user provides instructions in English, Copilot's suggestions and explanations must always be in Japanese, except when writing a commit message.

2. **Code Comments**

- Only add comments when the code contains **complex logic** or **difficult processing**.
- When adding comments, write them in **English**.
- Do not add comments to simple code or code that is intuitively understandable.

3. **Git Commit Messages**

- When generating commit messages, use **English**.
- add a prefix to the commit message that indicates the type of change:
  - `feat:` for new features
  - `fix:` for bug fixes
  - `docs:` for documentation changes
  - `style:` for formatting changes (no code change)
  - `refactor:` for code restructuring without changing functionality
  - `test:` for adding or updating tests
  - `chore:` for maintenance tasks
  - `revert:` for reverting changes
- add reasons for the changes in the commit message, explaining why the change was made or what it addresses.
  - example: -`feat: Add user authentication feature to enhance security` -`feat: Update example.jsx to give phone user a better experience` -`fix: Correct typo in README to improve clarity`
