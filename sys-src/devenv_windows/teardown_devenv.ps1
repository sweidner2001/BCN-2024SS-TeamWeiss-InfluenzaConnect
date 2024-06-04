#!/usr/bin/env pwsh

function check_result {
    param (
        [string]$message
    )
    if ($LASTEXITCODE -ne 0) {
        Write-Error "Error: $message"
        exit 1
    }
}

# Stop and remove Docker containers
docker-compose -f ./docker-compose.yml down
check_result "Failed to stop Docker Compose"

Write-Output ""
Write-Output "----------------------------------------"
Write-Output "Docker containers stopped and removed."