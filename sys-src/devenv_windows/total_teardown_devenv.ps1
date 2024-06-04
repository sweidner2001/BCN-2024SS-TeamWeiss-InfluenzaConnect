#!/usr/bin/env pwsh

# Deaktiviere venv, wenn es aktiviert ist
if (Get-Command deactivate -ErrorAction SilentlyContinue) {
    deactivate
}

# Entferne venv
if (Test-Path "backend/lib") {
    Remove-Item -Recurse -Force "backend/bin", "backend/lib", "backend/include", "backend/pyenv.cfg"
    Write-Host "Virtuelle Umgebung entfernt."
}

# Stoppe und entferne alle laufenden Container
docker stop $(docker ps -aq)
docker rm $(docker ps -aq)

# Entferne alle Bilder
docker rmi -f $(docker images -q)

Write-Host ""
Write-Host "----------------------------------------"
Write-Host "Docker-Container und Bilder gestoppt und entfernt."