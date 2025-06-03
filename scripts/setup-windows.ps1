# Contextus Setup Script for Windows
# "Between the last command and the next lies everything."

# Requires Administrator privileges
#Requires -RunAsAdministrator

# Colors for output
$Host.UI.RawUI.BackgroundColor = "Black"
$Host.UI.RawUI.ForegroundColor = "White"
Clear-Host

function Write-Success {
    param([string]$Message)
    Write-Host "[+] " -ForegroundColor Green -NoNewline
    Write-Host $Message
}

function Write-Error {
    param([string]$Message)
    Write-Host "[!] " -ForegroundColor Red -NoNewline
    Write-Host $Message
}

function Write-Warning {
    param([string]$Message)
    Write-Host "[*] " -ForegroundColor Yellow -NoNewline
    Write-Host $Message
}

# Banner
Write-Host @"
================================================
   ____            _            _               
  / ___|___  _ __ | |_ _____  _| |_ _   _ ___  
 | |   / _ \| '_ \| __/ _ \ \/ / __| | | / __| 
 | |__| (_) | | | | ||  __/>  <| |_| |_| \__ \ 
  \____\___/|_| |_|\__\___/_/\_\\__|\__,_|___/ 
                                                
    Your Private Engineering Laboratory         
================================================
"@ -ForegroundColor Cyan

# Check Windows version
Write-Success "Checking Windows version..."
$winVer = [System.Environment]::OSVersion.Version
if ($winVer.Major -lt 10) {
    Write-Error "Windows 10 or later is required"
    exit 1
}

# Enable WSL2
Write-Success "Checking for WSL2..."
$wslStatus = wsl --status 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Warning "Installing WSL2..."
    wsl --install
    Write-Warning "WSL2 has been installed. Please restart your computer and run this script again."
    Write-Host "Press any key to exit..."
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
    exit 0
}

# Set WSL2 as default
Write-Success "Setting WSL2 as default version..."
wsl --set-default-version 2

# Check for Git
Write-Success "Checking for Git..."
try {
    $gitVersion = git --version
    Write-Success "Git is already installed ($gitVersion)"
} catch {
    Write-Warning "Git not found. Installing..."
    Write-Host "Please download and install Git from: https://git-scm.com/download/win"
    Write-Host "After installation, run this script again."
    Write-Host "Press any key to open the download page..."
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
    Start-Process "https://git-scm.com/download/win"
    exit 0
}

# Check for Docker Desktop
Write-Success "Checking for Docker Desktop..."
try {
    $dockerVersion = docker --version
    Write-Success "Docker is already installed ($dockerVersion)"
} catch {
    Write-Warning "Docker Desktop not found. Installing..."
    Write-Host "Please download and install Docker Desktop from: https://www.docker.com/products/docker-desktop/"
    Write-Host "After installation, launch Docker Desktop and run this script again."
    Write-Host "Press any key to open the download page..."
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
    Start-Process "https://www.docker.com/products/docker-desktop/"
    exit 0
}

# Verify Docker is running
Write-Success "Verifying Docker daemon..."
$dockerInfo = docker info 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Error "Docker daemon is not running. Please start Docker Desktop and run this script again."
    exit 1
}

# Create workspace
Write-Success "Creating workspace..."
$workspace = "C:\DevOps"
if (!(Test-Path $workspace)) {
    New-Item -ItemType Directory -Path $workspace | Out-Null
}
Set-Location $workspace

# Clone repository
if (!(Test-Path ".\contextus\docker-compose.yml")) {
    Write-Success "Setting up Contextus repository..."
    $githubUsername = Read-Host "Enter your GitHub username"
    
    if ([string]::IsNullOrWhiteSpace($githubUsername)) {
        Write-Error "GitHub username cannot be empty"
        exit 1
    }
    
    git clone "https://github.com/$githubUsername/contextus.git"
    Set-Location contextus
} else {
    Set-Location contextus
}

# Create necessary directories
Write-Success "Creating directory structure..."
@("prometheus\alerts", "grafana\dashboards", "postgres\init") | ForEach-Object {
    if (!(Test-Path $_)) {
        New-Item -ItemType Directory -Path $_ -Force | Out-Null
    }
}

# Start the stack
Write-Success "Starting Contextus stack..."
docker-compose up -d

# Wait for services
Write-Success "Waiting for services to start..."
Start-Sleep -Seconds 10

# Check service health
Write-Success "Checking service health..."
docker-compose ps

# Display access information
Write-Host "`n" -NoNewline
Write-Host "================================================" -ForegroundColor Green
Write-Host "   Contextus Stack Successfully Deployed! 🚀   " -ForegroundColor Green
Write-Host "================================================" -ForegroundColor Green
Write-Host ""
Write-Host "Access your services:" -ForegroundColor Cyan
Write-Host "  📊 Grafana:    " -NoNewline
Write-Host "http://localhost:3000" -ForegroundColor Yellow
Write-Host "     Username:   admin"
Write-Host "     Password:   admin (change on first login)"
Write-Host ""
Write-Host "  📈 Prometheus: " -NoNewline
Write-Host "http://localhost:9090" -ForegroundColor Yellow
Write-Host ""
Write-Host "  🗄️  PostgreSQL: " -NoNewline
Write-Host "localhost:5432" -ForegroundColor Yellow
Write-Host "     Username:   postgres"
Write-Host "     Password:   mysecret"
Write-Host ""
Write-Host "Useful commands:" -ForegroundColor Cyan
Write-Host "  View logs:        " -NoNewline
Write-Host "docker-compose logs -f [service]" -ForegroundColor Yellow
Write-Host "  Stop stack:       " -NoNewline
Write-Host "docker-compose down" -ForegroundColor Yellow
Write-Host "  Restart service:  " -NoNewline
Write-Host "docker-compose restart [service]" -ForegroundColor Yellow
Write-Host "  View metrics:     " -NoNewline
Write-Host "http://localhost:9090/targets" -ForegroundColor Yellow
Write-Host ""
Write-Host "Happy Engineering! Remember: You are what you build next." -ForegroundColor Green
Write-Host ""

# Open Grafana
Write-Success "Opening Grafana in your browser..."
Start-Sleep -Seconds 2
Start-Process "http://localhost:3000"

Write-Host "Press any key to exit..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")