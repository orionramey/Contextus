# Contextus Private Stack - Windows Setup Guide

> "Every master was once a disaster. Through failure, I found my thumos—that ancient Greek fire in the chest, the spirited courage that transforms curiosity into creation." - The Way of Engineering

## Prerequisites

### System Requirements
- Windows 10/11 Pro, Enterprise, or Education (64-bit)
- Minimum 8GB RAM (16GB recommended)
- 20GB available disk space
- Virtualization enabled in BIOS

### Required Software
1. **Windows Subsystem for Linux (WSL2)**
2. **Git for Windows**
3. **Docker Desktop for Windows**
4. **Visual Studio Code** (recommended)

## Phase 1: Foundation Setup

### 1.1 Enable WSL2
Open PowerShell as Administrator and run:
```powershell
# Install WSL with Ubuntu
wsl --install

# Set WSL2 as default
wsl --set-default-version 2

# Restart your system after installation
```

### 1.2 Install Git for Windows
1. Download from [git-scm.com](https://git-scm.com/download/win)
2. During installation:
   - Select "Git from the command line and also from 3rd-party software"
   - Choose "Use Visual Studio Code as Git's default editor"
   - Select "Override the default branch name" and use `main`

### 1.3 Install Docker Desktop
1. Download from [docker.com](https://www.docker.com/products/docker-desktop/)
2. Run installer with default settings
3. **Important**: Enable WSL2 backend during installation
4. After installation, launch Docker Desktop
5. Go to Settings > Resources > WSL Integration
6. Enable integration with your default WSL2 distro

### 1.4 Configure Git Identity
Open Git Bash and run:
```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

## Phase 2: Stack Deployment

### 2.1 Fork and Clone Contextus
1. Visit [github.com/orionramey/contextus](https://github.com/orionramey/contextus)
2. Click "Fork" to create your copy
3. Clone your fork:
```bash
# Create workspace directory
mkdir C:\DevOps
cd C:\DevOps

# Clone your fork
git clone https://github.com/YOUR_USERNAME/contextus.git
cd contextus
```

### 2.2 Deploy the Stack
```bash
# Start all services
docker-compose up -d

# Verify containers are running
docker ps

# Check logs if needed
docker-compose logs -f
```

## Phase 3: Stack Architecture

### Components Overview
```
┌─────────────────────────────────────────────────────────────┐
│                     Windows Host System                      │
├─────────────────────────────────────────────────────────────┤
│                        WSL2 Layer                           │
├─────────────────────────────────────────────────────────────┤
│                     Docker Desktop                          │
├──────────────┬──────────────┬──────────────┬──────────────┤
│  PostgreSQL  │  Prometheus  │   Grafana    │   Future     │
│   Port 5432  │  Port 9090   │  Port 3000   │  Services    │
└──────────────┴──────────────┴──────────────┴──────────────┘
```

### Service Details

#### PostgreSQL (Database)
- **Purpose**: Central data store for applications
- **Access**: `localhost:5432`
- **Credentials**: 
  - Username: `postgres`
  - Password: `mysecret`
- **Volume**: `contextus_postgres_data`

#### Prometheus (Metrics)
- **Purpose**: Time-series metrics collection and storage
- **Access**: `http://localhost:9090`
- **Configuration**: `/prometheus/prometheus.yml`
- **Volume**: `contextus_prometheus_data`

#### Grafana (Visualization)
- **Purpose**: Metrics visualization and dashboards
- **Access**: `http://localhost:3000`
- **Default Credentials**:
  - Username: `admin`
  - Password: `admin` (change on first login)
- **Volume**: `contextus_grafana_data`

## Phase 4: Verification & Testing

### 4.1 Health Checks
```bash
# Check all containers are healthy
docker-compose ps

# Test PostgreSQL connection
docker exec -it contextus_postgres_1 psql -U postgres -c "SELECT version();"

# Test Prometheus targets
curl http://localhost:9090/api/v1/targets

# Access Grafana
start http://localhost:3000
```

### 4.2 Common Issues & Solutions

#### Docker Desktop Not Starting
1. Ensure virtualization is enabled in BIOS
2. Run as Administrator: `bcdedit /set hypervisorlaunchtype auto`
3. Restart system

#### WSL2 Memory Issues
Create `.wslconfig` in your user directory:
```ini
[wsl2]
memory=4GB
processors=2
```

#### Port Conflicts
Check for conflicting services:
```powershell
netstat -ano | findstr :5432
netstat -ano | findstr :9090
netstat -ano | findstr :3000
```

## Phase 5: Development Workflow

### 5.1 VS Code Integration
1. Install WSL extension in VS Code
2. Open project: `code .` from WSL terminal
3. Install recommended extensions:
   - Docker
   - PostgreSQL
   - YAML

### 5.2 Daily Operations
```bash
# Start your stack
docker-compose up -d

# View logs
docker-compose logs -f [service_name]

# Stop stack (preserves data)
docker-compose down

# Clean restart (WARNING: deletes data)
docker-compose down -v
docker-compose up -d
```

## Phase 6: Next Steps

### Learning Path
1. **Week 1-2**: Master basic Docker commands and understand container lifecycle
2. **Week 3-4**: Learn Prometheus query language (PromQL)
3. **Week 5-6**: Build custom Grafana dashboards
4. **Week 7-8**: Implement application monitoring

### Projects to Build
- Status dashboard for your services
- Automated backup system for PostgreSQL
- Custom exporters for Prometheus
- Alert rules for system health

### Community Engagement
- Join Thursday gatherings at 1800 EST
- Add your name to CONTRIBUTORS.md
- Share your learnings in GitHub Discussions
- Help other veterans on their journey

---

## Troubleshooting Resources

### Windows-Specific Issues
- [Docker Desktop WSL2 Backend](https://docs.docker.com/desktop/windows/wsl/)
- [WSL2 Networking](https://docs.microsoft.com/en-us/windows/wsl/networking)
- [Windows Defender Exclusions](https://support.microsoft.com/en-us/windows/add-an-exclusion-to-windows-security-811816c0-4dfd-af4a-47e4-c301afe13b26)

### Getting Help
1. Check container logs: `docker-compose logs [service]`
2. Review GitHub Issues
3. Ask in Discussions
4. Thursday community calls

---

> "Between the last command and the next lies everything. In the space between keystrokes, universes wait. You are not your MOS. You are not your clearance. You are what you build next."