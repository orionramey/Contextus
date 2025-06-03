#!/bin/bash
# Universal Quickstart Script
# Detects OS and runs appropriate setup

set -e

# Detect OS
if [[ "$OSTYPE" == "darwin"* ]]; then
    echo "Detected macOS - running Mac setup..."
    bash scripts/setup-mac.sh
elif [[ "$OSTYPE" == "msys" ]] || [[ "$OSTYPE" == "cygwin" ]] || [[ "$OSTYPE" == "win32" ]]; then
    echo "Detected Windows - please run scripts/setup-windows.ps1 in PowerShell as Administrator"
    echo "Command: .\\scripts\\setup-windows.ps1"
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    echo "Detected Linux - using Mac setup script (compatible with most Linux distros)..."
    bash scripts/setup-mac.sh
else
    echo "Unknown OS type: $OSTYPE"
    echo "Please run the appropriate setup script manually:"
    echo "  - Mac/Linux: ./scripts/setup-mac.sh"
    echo "  - Windows: .\\scripts\\setup-windows.ps1 (in PowerShell as Admin)"
fi