# 🛠️ Scripts Directory

> "Automate the mundane to focus on the meaningful."

This directory contains automation scripts that transform complex setup processes into single commands. Each script embodies the principle: **make the right thing the easy thing**.

## 📜 Available Scripts

### 🍎 setup-mac.sh
**Purpose**: Automated macOS environment setup
```bash
./scripts/setup-mac.sh
```

**What it does:**
1. Installs Homebrew (if needed)
2. Installs Git and Docker Desktop
3. Configures Git identity
4. Validates Docker daemon
5. Clones your forked repository
6. Starts the Contextus stack
7. Opens Grafana in your browser

**Requirements:**
- macOS 10.15 or later
- Admin privileges (for Homebrew)
- Internet connection

### 🪟 setup-windows.ps1
**Purpose**: Automated Windows environment setup
```powershell
# Run as Administrator
.\scripts\setup-windows.ps1
```

**What it does:**
1. Enables WSL2
2. Validates Git installation
3. Checks Docker Desktop
4. Creates workspace directory
5. Clones your repository
6. Deploys the stack
7. Launches Grafana

**Requirements:**
- Windows 10/11 Pro, Enterprise, or Education
- Administrator privileges
- Virtualization enabled in BIOS

### 🚀 ../quickstart.sh
**Purpose**: OS detection and appropriate setup
```bash
./quickstart.sh
```

**What it does:**
1. Detects your operating system
2. Runs the appropriate setup script
3. Provides manual instructions if needed

## 🔍 Understanding the Scripts

### Script Structure
Each setup script follows this pattern:
```bash
#!/bin/bash
# 1. Environment validation
# 2. Dependency installation  
# 3. Configuration
# 4. Service deployment
# 5. Verification
# 6. User guidance
```

### Key Functions

#### Error Handling
```bash
set -e  # Exit on any error
```
This ensures scripts fail fast and loud - better to know immediately than discover problems later.

#### Colored Output
```bash
GREEN='\033[0;32m'
RED='\033[0;31m'
```
Visual feedback helps you understand what's happening at each step.

#### Conditional Logic
```bash
if ! command -v docker &> /dev/null; then
    # Install Docker
fi
```
Scripts check before installing - idempotent operations you can run multiple times safely.

## 💡 Learning from Scripts

### Bash Concepts Demonstrated

1. **Variables**
   ```bash
   github_username="YOUR_USERNAME"
   ```

2. **Functions**
   ```bash
   print_message() {
       echo -e "${GREEN}[+]${NC} $1"
   }
   ```

3. **Conditionals**
   ```bash
   if [[ "$OSTYPE" == "darwin"* ]]; then
       # macOS specific code
   fi
   ```

4. **Command Substitution**
   ```bash
   git_version=$(git --version)
   ```

### PowerShell Concepts Demonstrated

1. **Requires Statement**
   ```powershell
   #Requires -RunAsAdministrator
   ```

2. **Error Handling**
   ```powershell
   if ($LASTEXITCODE -ne 0) {
       Write-Error "Command failed"
   }
   ```

3. **User Input**
   ```powershell
   $githubUsername = Read-Host "Enter GitHub username"
   ```

## 🎯 Creating Your Own Scripts

### Template for New Scripts
```bash
#!/bin/bash
# Script: my-automation.sh
# Purpose: [Clear description]
# Author: [Your name]
# Date: [Creation date]

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Functions
log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

# Main logic
main() {
    log_info "Starting automation..."
    
    # Your code here
    
    log_info "Automation complete!"
}

# Run main function
main "$@"
```

### Best Practices

1. **Always use set -e**
   - Fail fast on errors
   - Prevents cascading failures

2. **Provide feedback**
   - Users should know what's happening
   - Use colors for clarity

3. **Check prerequisites**
   - Validate environment first
   - Give clear error messages

4. **Make it idempotent**
   - Running twice shouldn't break things
   - Check before modifying

5. **Document inline**
   - Future you will thank present you
   - Explain the "why", not just "what"

## 🔧 Troubleshooting Scripts

### Common Issues

**Permission Denied**
```bash
chmod +x script-name.sh
```

**Command Not Found**
- Check PATH: `echo $PATH`
- Use full paths: `/usr/local/bin/docker`

**Line Ending Issues** (Windows → Mac/Linux)
```bash
dos2unix script-name.sh
```

### Debugging Techniques

1. **Enable debug mode**
   ```bash
   bash -x script-name.sh
   ```

2. **Add debug output**
   ```bash
   set -x  # Print each command
   ```

3. **Check exit codes**
   ```bash
   echo $?  # After a command
   ```

## 📚 Script Enhancements

### Ideas for Improvement

1. **Add backup functionality**
   - Before major changes
   - Rollback capability

2. **Implement logging**
   - Write to file
   - Timestamp entries

3. **Add configuration files**
   - User preferences
   - Environment-specific settings

4. **Create update scripts**
   - Pull latest changes
   - Migrate data

### Contributing New Scripts

1. Follow the template above
2. Test on fresh systems
3. Document requirements clearly
4. Submit PR with examples

## 🎓 Learning Resources

### Bash Scripting
- [Bash Guide](https://mywiki.wooledge.org/BashGuide)
- [Shell Check](https://www.shellcheck.net/) - Script validator
- [Explain Shell](https://explainshell.com/) - Command explainer

### PowerShell
- [PowerShell Documentation](https://docs.microsoft.com/powershell/)
- [PowerShell Gallery](https://www.powershellgallery.com/)
- [PSScriptAnalyzer](https://github.com/PowerShell/PSScriptAnalyzer)

## 🌟 Final Thoughts

> "The best code is no code at all. The second best is code that writes itself."

These scripts remove friction from your learning journey. Study them, modify them, improve them. Each enhancement you make is a gift to the next engineer who walks this path.

---

*Found a bug? Have an improvement? Scripts are just code - make them better and share your improvements!*