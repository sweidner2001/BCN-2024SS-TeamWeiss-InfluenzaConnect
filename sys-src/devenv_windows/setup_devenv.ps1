#!/usr/bin/env pwsh

# Function for error checking
function check_result {
    param (
        [string]$message
    )
    if ($LASTEXITCODE -ne 0) {
        Write-Error "Error: $message"
        exit 1
    }
}

# Change directory
Set-Location -Path ..

# Create virtual environment
python -m venv backend
check_result "Failed to create virtual environment"

# Activate virtual environment
$venvActivatePath = ".\backend\Scripts\Activate.ps1"
if (Test-Path $venvActivatePath) {
    & $venvActivatePath
    check_result "Failed to activate virtual environment"
} else {
    Write-Error "Activation script not found"
    exit 1
}

# Install requirements
python -m pip install --upgrade pip setuptools
pip install -r .\backend\requirements.txt
check_result "Failed to install requirements"

# Docker-Compose Build
docker-compose -f devenv_windows\docker-compose.yml up
check_result "Failed to start Docker Compose"

Write-Output ""
Write-Output "----------------------------------------"
Write-Output "Development environment setup complete."
