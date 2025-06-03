#!/bin/bash
# Contextus Setup Script for macOS
# "Begin badly. Iterate infinitely."

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Banner
echo -e "${BLUE}"
echo "================================================"
echo "   ____            _            _               "
echo "  / ___|___  _ __ | |_ _____  _| |_ _   _ ___  "
echo " | |   / _ \| '_ \| __/ _ \ \/ / __| | | / __| "
echo " | |__| (_) | | | | ||  __/>  <| |_| |_| \__ \ "
echo "  \____\___/|_| |_|\__\___/_/\_\\__|\__,_|___/ "
echo "                                                "
echo "    Your Private Engineering Laboratory         "
echo "================================================"
echo -e "${NC}"

# Function to print colored messages
print_message() {
    echo -e "${GREEN}[+]${NC} $1"
}

print_error() {
    echo -e "${RED}[!]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[*]${NC} $1"
}

# Check if running on macOS
if [[ "$OSTYPE" != "darwin"* ]]; then
    print_error "This script is designed for macOS. Please use setup-windows.ps1 for Windows."
    exit 1
fi

# Check for Homebrew
print_message "Checking for Homebrew..."
if ! command -v brew &> /dev/null; then
    print_warning "Homebrew not found. Installing..."
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    
    # Add Homebrew to PATH for Apple Silicon
    if [[ -f "/opt/homebrew/bin/brew" ]]; then
        echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
        eval "$(/opt/homebrew/bin/brew shellenv)"
    fi
else
    print_message "Homebrew is already installed"
fi

# Update Homebrew
print_message "Updating Homebrew..."
brew update

# Install Git
print_message "Checking for Git..."
if ! command -v git &> /dev/null; then
    print_warning "Installing Git..."
    brew install git
else
    print_message "Git is already installed ($(git --version))"
fi

# Install Docker Desktop
print_message "Checking for Docker..."
if ! command -v docker &> /dev/null; then
    print_warning "Installing Docker Desktop..."
    brew install --cask docker
    print_warning "Please launch Docker Desktop from Applications and wait for it to start"
    print_warning "Press Enter when Docker Desktop is running..."
    read -r
else
    print_message "Docker is already installed ($(docker --version))"
fi

# Verify Docker is running
print_message "Verifying Docker daemon..."
if ! docker info &> /dev/null; then
    print_error "Docker daemon is not running. Please start Docker Desktop and run this script again."
    exit 1
fi

# Install additional tools
print_message "Installing additional tools..."
brew install jq curl wget htop tree || true

# Clone repository if not already in it
if [ ! -f "docker-compose.yml" ]; then
    print_message "Setting up Contextus repository..."
    print_warning "Enter your GitHub username:"
    read -r github_username
    
    if [ -z "$github_username" ]; then
        print_error "GitHub username cannot be empty"
        exit 1
    fi
    
    git clone "https://github.com/${github_username}/contextus.git" contextus-setup
    cd contextus-setup
fi

# Create necessary directories
print_message "Creating directory structure..."
mkdir -p prometheus/alerts
mkdir -p grafana/dashboards
mkdir -p postgres/init

# Start the stack
print_message "Starting Contextus stack..."
docker-compose up -d

# Wait for services to be healthy
print_message "Waiting for services to start..."
sleep 10

# Check service health
print_message "Checking service health..."
docker-compose ps

# Display access information
echo -e "\n${GREEN}================================================${NC}"
echo -e "${GREEN}   Contextus Stack Successfully Deployed! 🚀   ${NC}"
echo -e "${GREEN}================================================${NC}"
echo
echo -e "${BLUE}Access your services:${NC}"
echo -e "  📊 Grafana:    ${YELLOW}http://localhost:3000${NC}"
echo -e "     Username:   admin"
echo -e "     Password:   admin (change on first login)"
echo
echo -e "  📈 Prometheus: ${YELLOW}http://localhost:9090${NC}"
echo
echo -e "  🗄️  PostgreSQL: ${YELLOW}localhost:5432${NC}"
echo -e "     Username:   postgres"
echo -e "     Password:   mysecret"
echo
echo -e "${BLUE}Useful commands:${NC}"
echo -e "  View logs:        ${YELLOW}docker-compose logs -f [service]${NC}"
echo -e "  Stop stack:       ${YELLOW}docker-compose down${NC}"
echo -e "  Restart service:  ${YELLOW}docker-compose restart [service]${NC}"
echo -e "  View metrics:     ${YELLOW}open http://localhost:9090/targets${NC}"
echo
echo -e "${GREEN}Happy Engineering! Remember: Fall in love with the problem, not the solution.${NC}"
echo

# Optional: Open Grafana in browser
print_message "Opening Grafana in your browser..."
sleep 2
open http://localhost:3000 2>/dev/null || true