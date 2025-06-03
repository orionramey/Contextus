# Contextus - Your Private Engineering Laboratory

> "Every master was once a disaster. Through failure, I found my thumos—that ancient Greek fire in the chest, the spirited courage that transforms curiosity into creation. This is your invitation to burn."

## 🔥 What is Contextus?

Contextus is a complete monitoring and observability stack designed specifically for veterans transitioning from military service to systems engineering. It's not just a collection of tools—it's a bridge between who you were and who you're becoming.

### The Stack

- **PostgreSQL**: Your data foundation - where truth lives in tables
- **Prometheus**: The all-seeing eye - metrics collection and alerting
- **Grafana**: Where data becomes beauty - visualization and dashboards
- **Node Exporter**: System metrics - the pulse of your machine
- **cAdvisor**: Container metrics - Docker's vital signs

## 🚀 Quick Start

### For Mac Users
```bash
curl -sSL https://raw.githubusercontent.com/orionramey/contextus/main/scripts/setup-mac.sh | bash
```

### For Windows Users
```powershell
# Run PowerShell as Administrator
Set-ExecutionPolicy Bypass -Scope Process -Force
Invoke-WebRequest -Uri https://raw.githubusercontent.com/orionramey/contextus/main/scripts/setup-windows.ps1 -OutFile setup.ps1
.\setup.ps1
```

### Manual Setup

1. **Fork this repository**
   ```bash
   # Visit https://github.com/orionramey/contextus
   # Click "Fork" button
   ```

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/contextus.git
   cd contextus
   ```

3. **Start the stack**
   ```bash
   docker-compose up -d
   ```

4. **Access your services**
   - Grafana: http://localhost:3000 (admin/admin)
   - Prometheus: http://localhost:9090
   - PostgreSQL: localhost:5432 (postgres/mysecret)

## 📖 Documentation

- [Windows Setup Guide](docs/WINDOWS_SETUP.md) - Detailed Windows installation
- [Mac Setup Guide](docs/MAC_SETUP.md) - Detailed macOS installation

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────┐
│                   Host System                        │
├─────────────────────────────────────────────────────┤
│                 Docker Engine                        │
├─────────────┬────────────┬────────────┬────────────┤
│ PostgreSQL  │ Prometheus │  Grafana   │ Exporters  │
│  Port 5432  │ Port 9090  │ Port 3000  │   Various  │
└─────────────┴────────────┴────────────┴────────────┘
```

## 🎯 Learning Path

### Week 1-2: Foundation
- Understand Docker basics
- Learn container lifecycle
- Master docker-compose commands

### Week 3-4: Metrics
- Write your first PromQL queries
- Create custom metrics
- Understand time-series data

### Week 5-6: Visualization
- Build Grafana dashboards
- Create alerts
- Design for insight

### Week 7-8: Integration
- Monitor your own applications
- Create custom exporters
- Share your work

## 🤝 Community

### Thursday Gatherings
Join us every Thursday at 1800 EST for:
- Live troubleshooting
- Project showcases
- Engineering discussions
- Career guidance

### Contributing
1. Add your name to CONTRIBUTORS.md
2. Share your dashboard creations
3. Document your learning journey
4. Help other veterans

## 💡 Project Ideas

- **Status Dashboard**: Monitor all your services in one place
- **Performance Tracker**: Track your coding productivity
- **Home Lab Monitor**: Keep tabs on your personal infrastructure
- **Learning Metrics**: Visualize your engineering progress

## 🛠️ Troubleshooting

### Common Issues

**Docker not starting**
```bash
# Mac
brew reinstall --cask docker

# Windows (PowerShell as Admin)
wsl --update
```

**Port conflicts**
```bash
# Find what's using the port
lsof -i :3000  # Mac
netstat -ano | findstr :3000  # Windows
```

**Permission issues**
```bash
# Fix Docker socket permissions
sudo chmod 666 /var/run/docker.sock
```

## 📚 Resources

### Books
- "The Phoenix Project" - Understanding DevOps
- "Site Reliability Engineering" - Google's approach
- "Prometheus: Up & Running" - Monitoring mastery

### Courses
- [Red Hat System Administration](https://www.redhat.com/en/services/training/rh124-red-hat-system-administration-i)
- [Docker Mastery](https://www.udemy.com/course/docker-mastery/)
- [Kubernetes for Beginners](https://www.udemy.com/course/learn-kubernetes/)

### Communities
- [r/devops](https://reddit.com/r/devops)
- [r/sysadmin](https://reddit.com/r/sysadmin)
- [DevOps Discord](https://discord.gg/devops)

## 🎖️ From Service to Engineering

This journey isn't about forgetting where you came from—it's about transforming your experience into something new. Your attention to detail, systematic thinking, and ability to operate under pressure are superpowers in the engineering world.

### Remember:
- **Your clearance** taught you responsibility
- **Your discipline** will drive your learning
- **Your leadership** will guide your teams
- **Your service** prepared you for this

## 📬 Support

- **GitHub Issues**: Technical problems
- **Discussions**: Questions and community
- **Email**: contextus@example.com

---

> "Tools age. Languages die. Frameworks fade. But the engineer who understands 'why' transcends every 'what'. Master the principles, not the products."

**Welcome to your new mission. Welcome to engineering.**