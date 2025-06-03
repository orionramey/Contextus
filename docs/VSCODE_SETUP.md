# 💻 Visual Studio Code Integration

> "The right tool amplifies your ability. VS Code isn't just an editor—it's your engineering command center."

## 🎯 Why VS Code?

Visual Studio Code bridges the gap between simple text editors and complex IDEs:
- **Free & Open Source** - No licensing headaches
- **Cross-Platform** - Same experience on Windows, Mac, Linux
- **Extension Ecosystem** - Tools for every language and framework
- **Integrated Terminal** - Command line where you need it
- **Git Integration** - Version control built-in
- **Remote Development** - Edit files in containers and WSL

## 🚀 Installation

### macOS
```bash
# Via Homebrew
brew install --cask visual-studio-code

# Add to PATH (if needed)
echo 'export PATH="/Applications/Visual Studio Code.app/Contents/Resources/app/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
```

### Windows
```powershell
# Via Chocolatey
choco install vscode

# Or download from https://code.visualstudio.com/
```

### Linux
```bash
# Snap package
sudo snap install --classic code

# Or via package manager
wget -qO- https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor > packages.microsoft.gpg
sudo install -o root -g root -m 644 packages.microsoft.gpg /etc/apt/trusted.gpg.d/
sudo sh -c 'echo "deb [arch=amd64,arm64,armhf signed-by=/etc/apt/trusted.gpg.d/packages.microsoft.gpg] https://packages.microsoft.com/repos/code stable main" > /etc/apt/sources.list.d/vscode.list'
sudo apt update
sudo apt install code
```

## 🔧 Essential Extensions for Contextus

### Core Extensions
Install these first - they're essential for your stack:

```bash
# Install via command line
code --install-extension ms-azuretools.vscode-docker
code --install-extension ms-vscode-remote.remote-containers
code --install-extension ms-vscode-remote.remote-wsl
code --install-extension redhat.vscode-yaml
code --install-extension ms-python.python
code --install-extension golang.go
code --install-extension hashicorp.terraform
```

### Docker Development
- **Docker** (`ms-azuretools.vscode-docker`)
  - View containers, images, volumes
  - Right-click to start/stop/restart
  - Dockerfile syntax highlighting
  - docker-compose integration

### Database Tools
- **PostgreSQL** (`ms-ossdata.vscode-postgresql`)
  - Connect to your Contextus database
  - Run queries directly
  - View table structures
  
- **SQLTools** (`mtxr.sqltools`)
  - Multi-database support
  - Query history
  - Export results

### Monitoring & Configuration
- **Prometheus** (`prometheus-io.vscode-prometheus`)
  - PromQL syntax highlighting
  - Query validation
  - Metric exploration

- **YAML** (`redhat.vscode-yaml`)
  - Schema validation
  - Auto-completion
  - Error detection

### Git & Collaboration
- **GitLens** (`eamodio.gitlens`)
  - See who changed what, when
  - Visualize code authorship
  - Git blame annotations

- **Git Graph** (`mhutchie.git-graph`)
  - Visual commit history
  - Branch management
  - Merge conflict resolution

### Productivity Boosters
- **Better Comments** (`aaron-bond.better-comments`)
  - Highlight TODOs, FIXMEs
  - Color-coded annotations
  - Improve code documentation

- **Bracket Pair Colorizer** (`CoenraadS.bracket-pair-colorizer-2`)
  - Match brackets visually
  - Reduce syntax errors
  - Navigate complex code

- **Path Intellisense** (`christian-kohler.path-intellisense`)
  - Autocomplete file paths
  - Works in all file types
  - Saves typing time

## 📁 Workspace Configuration

### Create Contextus Workspace
1. Open VS Code
2. File → Open Folder → Select your `contextus` directory
3. File → Save Workspace As → `contextus.code-workspace`

### Recommended Settings
Create `.vscode/settings.json` in your project:

```json
{
  // Editor Settings
  "editor.fontSize": 14,
  "editor.tabSize": 2,
  "editor.wordWrap": "on",
  "editor.formatOnSave": true,
  "editor.minimap.enabled": false,
  
  // Terminal Settings
  "terminal.integrated.fontSize": 14,
  "terminal.integrated.defaultProfile.osx": "zsh",
  "terminal.integrated.defaultProfile.windows": "PowerShell",
  
  // File Associations
  "files.associations": {
    "*.yml": "yaml",
    "*.yaml": "yaml",
    "Dockerfile*": "dockerfile",
    "docker-compose*": "yaml"
  },
  
  // Docker Settings
  "docker.showExplorer": true,
  "docker.dockerComposeBuild": false,
  
  // Git Settings
  "git.autofetch": true,
  "git.confirmSync": false,
  
  // YAML Settings
  "yaml.schemas": {
    "https://raw.githubusercontent.com/docker/compose/master/compose/config/compose_spec.json": "docker-compose*.yml",
    "https://json.schemastore.org/prometheus.json": "**/prometheus.yml"
  },
  
  // Exclude Files
  "files.exclude": {
    "**/.git": true,
    "**/.DS_Store": true,
    "**/node_modules": true,
    "**/__pycache__": true
  }
}
```

## 🎨 Themes for Long Coding Sessions

### Recommended Themes
- **One Dark Pro** - Easy on the eyes
- **Dracula Official** - High contrast
- **Night Owl** - Designed for night coding
- **Palenight** - Soft colors

Install a theme:
```bash
code --install-extension zhuangtongfa.material-theme
```

## 🚀 VS Code Workflows

### Docker Workflow
1. **View Containers**
   - Click Docker icon in sidebar
   - See all running containers
   - Right-click for logs, shell, restart

2. **Edit Configuration**
   - Open `docker-compose.yml`
   - IntelliSense suggests properties
   - Hover for documentation

3. **Quick Commands**
   - `Cmd/Ctrl + Shift + P` → "Docker: Compose Up"
   - No need to switch to terminal

### Database Workflow
1. **Connect to PostgreSQL**
   - Install PostgreSQL extension
   - Click "Add Connection"
   - Enter: `localhost`, `5432`, `postgres`, `mysecret`

2. **Query Your Learning**
   ```sql
   SELECT * FROM app.learning_progress 
   WHERE user_name = 'Your Name'
   ORDER BY last_updated DESC;
   ```

3. **Export Results**
   - Right-click results
   - Export as CSV/JSON

### Git Workflow
1. **Source Control Tab**
   - View all changes
   - Stage files visually
   - Write commit messages

2. **GitLens Features**
   - Hover over line → See last change
   - Click → View commit
   - Compare with history

3. **Merge Conflicts**
   - VS Code highlights conflicts
   - Choose changes visually
   - No manual editing needed

## 💡 Pro Tips

### Keyboard Shortcuts to Master
- `Cmd/Ctrl + P` - Quick file open
- `Cmd/Ctrl + Shift + P` - Command palette
- `Cmd/Ctrl + `` ` - Toggle terminal
- `Cmd/Ctrl + B` - Toggle sidebar
- `Cmd/Ctrl + /` - Comment line
- `Alt + Up/Down` - Move line
- `Cmd/Ctrl + D` - Select next occurrence

### Multi-Cursor Magic
- `Alt + Click` - Add cursor
- `Cmd/Ctrl + Alt + Up/Down` - Add cursor above/below
- `Cmd/Ctrl + Shift + L` - Select all occurrences

### Terminal Integration
```json
// Add to settings.json for custom terminal
"terminal.integrated.profiles.windows": {
  "PowerShell": {
    "source": "PowerShell",
    "icon": "terminal-powershell"
  },
  "Git Bash": {
    "source": "Git Bash"
  },
  "WSL": {
    "path": "C:\\Windows\\System32\\wsl.exe",
    "args": []
  }
}
```

## 🔌 Remote Development

### Connect to WSL (Windows)
1. Install Remote - WSL extension
2. Click green button (bottom-left)
3. "New WSL Window"
4. Open your project in Linux environment

### Connect to Containers
1. Install Remote - Containers extension
2. With Docker running:
   - Click green button
   - "Attach to Running Container"
   - Select your container
3. Edit files inside container directly

## 📝 Snippets for Efficiency

Create custom snippets for repetitive code:

1. File → Preferences → Configure User Snippets
2. Select language or create global
3. Add snippets:

```json
{
  "Prometheus Alert": {
    "prefix": "promalert",
    "body": [
      "- alert: ${1:AlertName}",
      "  expr: ${2:expression}",
      "  for: ${3:5m}",
      "  labels:",
      "    severity: ${4|warning,critical|}",
      "  annotations:",
      "    summary: \"${5:Summary}\"",
      "    description: \"${6:Description}\""
    ],
    "description": "Prometheus alert rule"
  },
  
  "Docker Service": {
    "prefix": "dockerservice",
    "body": [
      "${1:service-name}:",
      "  image: ${2:image:tag}",
      "  container_name: ${3:container-name}",
      "  restart: unless-stopped",
      "  ports:",
      "    - \"${4:host}:${5:container}\"",
      "  environment:",
      "    - ${6:KEY}=${7:value}",
      "  networks:",
      "    - contextus_network"
    ],
    "description": "Docker Compose service"
  }
}
```

## 🎯 Contextus-Specific Setup

### Task Configuration
Create `.vscode/tasks.json`:

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Start Stack",
      "type": "shell",
      "command": "docker-compose up -d",
      "group": {
        "kind": "build",
        "isDefault": true
      },
      "presentation": {
        "reveal": "always",
        "panel": "terminal"
      }
    },
    {
      "label": "Stop Stack",
      "type": "shell",
      "command": "docker-compose down",
      "presentation": {
        "reveal": "always",
        "panel": "terminal"
      }
    },
    {
      "label": "View Logs",
      "type": "shell",
      "command": "docker-compose logs -f",
      "presentation": {
        "reveal": "always",
        "panel": "terminal"
      }
    },
    {
      "label": "Restart Service",
      "type": "shell",
      "command": "docker-compose restart ${input:service}",
      "presentation": {
        "reveal": "always",
        "panel": "terminal"
      }
    }
  ],
  "inputs": [
    {
      "id": "service",
      "type": "pickString",
      "description": "Select service to restart",
      "options": [
        "postgres",
        "prometheus",
        "grafana",
        "node-exporter",
        "postgres-exporter",
        "cadvisor"
      ]
    }
  ]
}
```

Run tasks with `Cmd/Ctrl + Shift + B` or via Command Palette.

### Debugging Configuration
Create `.vscode/launch.json` for debugging:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Docker: Attach to Node",
      "type": "node",
      "request": "attach",
      "port": 9229,
      "address": "localhost",
      "localRoot": "${workspaceFolder}",
      "remoteRoot": "/app",
      "protocol": "inspector",
      "restart": true
    },
    {
      "name": "Python: Remote Attach",
      "type": "python",
      "request": "attach",
      "connect": {
        "host": "localhost",
        "port": 5678
      },
      "pathMappings": [
        {
          "localRoot": "${workspaceFolder}",
          "remoteRoot": "/app"
        }
      ]
    }
  ]
}
```

## 🌟 Final Setup Checklist

- [ ] VS Code installed and added to PATH
- [ ] Essential extensions installed
- [ ] Workspace saved
- [ ] Settings.json configured
- [ ] Theme selected
- [ ] Keyboard shortcuts learned
- [ ] Terminal integrated
- [ ] Git configured
- [ ] Docker extension connected
- [ ] PostgreSQL connection saved
- [ ] Tasks configured
- [ ] Snippets created

## 💡 Remember

> "A craftsman is only as good as their tools, but tools don't make the craftsman."

VS Code is powerful, but it's just the beginning. The real power comes from understanding what you're building and why. Use VS Code to amplify your abilities, not replace your thinking.

---

*Pro tip: Spend 30 minutes customizing VS Code to your workflow. Those 30 minutes will save you hours every week.*