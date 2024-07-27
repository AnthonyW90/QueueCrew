# QueueCrew - Git Branching Strategy

## Main Branches

1. `main`
   - The primary branch containing production-ready code
   - Always stable and deployable
   - Never commit directly to this branch; changes come via pull requests

2. `development`
   - The main development branch
   - Contains the latest delivered development changes for the next release
   - When stable, content is merged into `main`

## Supporting Branches

3. Feature Branches
   - Named: `feature/<feature-name>`
   - Used for developing new features
   - Branch off from: `develop`
   - Merge back into: `develop`
   - Example: `feature/group-creation`

4. Bugfix Branches
   - Named: `bugfix/<bug-description>`
   - Used for fixing bugs in the development process
   - Branch off from: `develop`
   - Merge back into: `develop`
   - Example: `bugfix/login-error`

5. Hotfix Branches
   - Named: `hotfix/<hotfix-description>`
   - Used for critical fixes in production
   - Branch off from: `main`
   - Merge back into: `main` and `develop`
   - Example: `hotfix/security-patch`

6. Release Branches
   - Named: `release/<version-number>`
   - Used for preparing a new production release
   - Branch off from: `develop`
   - Merge back into: `main` and `develop`
   - Example: `release/1.0.0`

7. Documentation Branches
   - Named: `docs/<doc-description>`
   - Used for preparing updating documentation
   - Branch off from: `develop`
   - Merge back into: `main` and `develop`
   - Example: `docs/project-timeline`

## Branch Naming Conventions

- Use lowercase letters, numbers, and hyphens
- Be descriptive but concise
- For features and bugfixes, you can prefix with the issue number if applicable

Examples:
- `feature/user-authentication`
- `feature/12-game-voting-system`
- `bugfix/34-incorrect-vote-count`
- `hotfix/critical-security-issue`
- `release/1.1.0`
- `docs/project-timeline`

## Workflow Example

1. Start a new feature:
   ```
   git checkout develop
   git pull origin develop
   git checkout -b feature/new-voting-algorithm
   ```

2. Work on the feature, committing changes:
   ```
   git add .
   git commit -m "Implement new voting algorithm"
   ```

3. Push the feature branch to remote:
   ```
   git push -u origin feature/new-voting-algorithm
   ```

4. Create a pull request to merge `feature/new-voting-algorithm` into `develop`

5. After review and approval, merge the pull request

6. Delete the feature branch after successful merge

Remember to regularly sync your feature branch with `develop` to avoid large merge conflicts:

```
git checkout develop
git pull origin develop
git checkout feature/new-voting-algorithm
git merge develop
```
