# Contextus Private Stack - macOS Setup Guide

> "The comfortable path maintains what is. The uncertain path creates what could be. Which engineer will you become?" - The Way of Engineering

## Prerequisites

### System Requirements
- macOS 10.15 (Catalina) or later
- Apple Silicon (M1/M2/M3) or Intel processor
- Minimum 8GB RAM (16GB recommended)
- 20GB available disk space

### Required Software
1. **Homebrew** (Package Manager)
2. **Git**
3. **Docker Desktop for Mac**
4. **Visual Studio Code** (recommended)

## Phase 1: Foundation Setup

### 1.1 Install Homebrew
Open Terminal and run:
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# For Apple Silicon Macs, add Homebrew to PATH:
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
eval "$(/opt/homebrew/bin/brew shellenv)"
```

### 1.2 Install Core Tools
```bash
# Install Git
brew install git

# Install Docker Desktop
brew install --cask docker

# Install VS Code (optional but recommended)
brew install --cask visual-studio-code

# Install additional helpful tools
brew install curl wget tree htop
```

### 1.3 Configure Git Identity
```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
git config --global init.defaultBranch main
```

### 1.4 Launch Docker Desktop
1. Open Docker Desktop from Applications
2. Accept the license agreement
3. For Apple Silicon: Ensure "Use Rosetta for x86/amd64 emulation" is checked
4. Allocate resources in Preferences:
   - CPUs: 2-4
   - Memory: 4-8 GB
   - Disk: 20+ GB

## Phase 2: Stack Deployment

### 2.1 Create Workspace
```bash
# Create your engineering workspace
mkdir -p ~/DevOps/projects
cd ~/DevOps/projects
```

### 2.2 Fork and Clone Contextus
1. Visit [github.com/orionramey/contextus](https://github.com/orionramey/contextus)
2. Click "Fork" to create your copy
3. Clone your fork:
```bash
# Clone your fork (replace YOUR_USERNAME)
git clone https://github.com/YOUR_USERNAME/contextus.git
cd contextus
```

### 2.3 Deploy the Stack
```bash
# Start all services
docker-compose up -d

# Verify containers are running
docker ps

# Follow logs (Ctrl+C to exit)
docker-compose logs -f
```

## Phase 3: Stack Architecture

### Components Overview
```
┌─────────────────────────────────────────────────────────────┐
│                     macOS Host System                        │
├─────────────────────────────────────────────────────────────┤
│                  Docker Desktop (HyperKit/Virtualization)    │
├──────────────┬──────────────┬──────────────┬──────────────┤
│  PostgreSQL  │  Prometheus  │   Grafana    │   Future     │
│   Port 5432  │  Port 9090   │  Port 3000   │  Services    │
└──────────────┴──────────────┴──────────────┴──────────────┘
```

### Service Architecture

#### PostgreSQL (Database Foundation)
- **Purpose**: Persistent data storage for applications
- **Access**: `localhost:5432`
- **Credentials**: 
  - Username: `postgres`
  - Password: `mysecret`
- **Volume**: `contextus_postgres_data`
- **Use Cases**:
  - Application data storage
  - Time-series data (with TimescaleDB)
  - Configuration management

#### Prometheus (Metrics Engine)
- **Purpose**: Time-series metrics collection and alerting
- **Access**: `http://localhost:9090`
- **Configuration**: `./prometheus/prometheus.yml`
- **Volume**: `contextus_prometheus_data`
- **Features**:
  - Pull-based metrics collection
  - Powerful query language (PromQL)
  - Built-in alerting rules

#### Grafana (Visualization Layer)
- **Purpose**: Metrics visualization and dashboard creation
- **Access**: `http://localhost:3000`
- **Default Credentials**:
  - Username: `admin`
  - Password: `admin` (change immediately)
- **Volume**: `contextus_grafana_data`
- **Capabilities**:
  - Multi-datasource support
  - Custom dashboards
  - Alerting integration

## Phase 4: Verification & Testing

### 4.1 System Health Checks
```bash
# Verify all containers are healthy
docker-compose ps

# Test PostgreSQL connection
docker exec -it contextus-postgres-1 psql -U postgres -c "\l"

# Check Prometheus targets
curl -s http://localhost:9090/api/v1/targets | jq '.data.activeTargets'

# Open Grafana in browser
open http://localhost:3000
```

### 4.2 macOS-Specific Optimizations

#### Docker Performance Tuning
For Apple Silicon Macs:
```bash
# Check architecture compatibility
docker run --rm -it alpine uname -m

# Use platform-specific images when needed
docker-compose up -d --platform linux/amd64
```

#### Resource Monitoring
```bash
# Monitor Docker resource usage
docker stats

# Check system resources
top -o cpu
```

### 4.3 Common Issues & Solutions

#### Port Already in Use
```bash
# Find process using port
lsof -i :5432
lsof -i :9090
lsof -i :3000

# Kill process if needed
kill -9 <PID>
```

#### Docker Desktop Not Starting
1. Check Activity Monitor for Docker processes
2. Reset Docker Desktop: Preferences > Troubleshoot > Reset to factory defaults
3. Reinstall if necessary: `brew reinstall --cask docker`

#### Permission Issues
```bash
# Fix Docker socket permissions
sudo chmod 666 /var/run/docker.sock

# Add user to docker group (create if needed)
sudo dscl . -create /Groups/docker
sudo dscl . -append /Groups/docker GroupMembership $(whoami)
```

## Phase 5: Development Workflow

### 5.1 Terminal Setup
```bash
# Install Oh My Zsh for better terminal experience
sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"

# Add useful aliases to ~/.zshrc
echo 'alias dc="docker-compose"' >> ~/.zshrc
echo 'alias dps="docker ps --format \"table {{.Names}}\t{{.Status}}\t{{.Ports}}\""' >> ~/.zshrc
echo 'alias dlogs="docker-compose logs -f"' >> ~/.zshrc
source ~/.zshrc
```

### 5.2 VS Code Integration
```bash
# Install helpful extensions
code --install-extension ms-azuretools.vscode-docker
code --install-extension ms-vscode-remote.remote-containers
code --install-extension redhat.vscode-yaml
code --install-extension mtxr.sqltools
code --install-extension mtxr.sqltools-driver-pg
```

### 5.3 Daily Operations
```bash
# Morning startup
cd ~/DevOps/projects/contextus
docker-compose up -d
docker-compose ps

# Check logs for specific service
docker-compose logs -f prometheus

# Restart a single service
docker-compose restart grafana

# Evening shutdown (preserves data)
docker-compose down

# Full cleanup (WARNING: deletes all data)
docker-compose down -v
```

## Phase 6: Advanced Configuration

### 6.1 Performance Monitoring
Create a shell script for system monitoring:
```bash
#!/bin/bash
# save as ~/DevOps/scripts/monitor.sh
echo "=== Docker Resource Usage ==="
docker stats --no-stream
echo -e "\n=== System Resources ==="
top -l 1 -n 0 | head -n 10
echo -e "\n=== Disk Usage ==="
df -h | grep -E '^/|docker'
```

### 6.2 Backup Strategy
```bash
# Backup all volumes
docker run --rm -v contextus_postgres_data:/data -v $(pwd)/backups:/backup alpine tar czf /backup/postgres-$(date +%Y%m%d).tar.gz -C /data .

# Restore from backup
docker run --rm -v contextus_postgres_data:/data -v $(pwd)/backups:/backup alpine tar xzf /backup/postgres-20240101.tar.gz -C /data
```

## Phase 7: Learning Path

### Week-by-Week Progression
1. **Week 1-2**: Master Docker fundamentals
   - Container lifecycle
   - Image building
   - Volume management
   
2. **Week 3-4**: Database Operations
   - PostgreSQL administration
   - Backup/restore procedures
   - Performance tuning

3. **Week 5-6**: Metrics & Monitoring
   - PromQL mastery
   - Custom exporters
   - Alert configuration

4. **Week 7-8**: Visualization & Dashboards
   - Grafana dashboard creation
   - Data source integration
   - Sharing and collaboration

### Project Ideas
- **Homelab Monitor**: Track your Mac's performance metrics
- **Personal Finance Tracker**: PostgreSQL + Grafana for budget visualization
- **Code Metrics Dashboard**: Monitor your GitHub activity
- **Learning Progress Tracker**: Visualize your engineering journey

## Phase 8: Community & Growth

### Joining the Community
1. Star the original repository
2. Add your name to CONTRIBUTORS.md:
   ```bash
   echo "- Your Name (@github_username) - Date" >> CONTRIBUTORS.md
   git add CONTRIBUTORS.md
   git commit -m "Add [Your Name] to contributors"
   git push origin main
   ```
3. Create your first pull request
4. Join Thursday gatherings at 1800 EST

### Sharing Your Journey
- Document your struggles and solutions
- Create tutorials for specific challenges
- Help other veterans in their transition
- Build projects that solve real problems

---

## Quick Reference

### Essential Commands
```bash
# Stack Management
docker-compose up -d          # Start stack
docker-compose down           # Stop stack
docker-compose restart        # Restart all services
docker-compose logs -f        # View logs

# Container Interaction
docker exec -it <container> bash    # Enter container
docker cp file.txt <container>:/    # Copy file to container
docker stats                        # Monitor resources

# Troubleshooting
docker-compose ps            # Check status
docker system prune -a       # Clean up everything
docker volume ls             # List volumes
```

### Service URLs
- PostgreSQL: `postgresql://postgres:mysecret@localhost:5432/postgres`
- Prometheus: `http://localhost:9090`
- Grafana: `http://localhost:3000`

### Getting Help
1. Check logs first: `docker-compose logs [service]`
2. Search GitHub Issues
3. Post in Discussions with:
   - macOS version
   - Docker Desktop version
   - Error messages
   - Steps to reproduce

---

> "Tools age. Languages die. Frameworks fade. But the engineer who understands 'why' transcends every 'what'. Master the principles, not the products."