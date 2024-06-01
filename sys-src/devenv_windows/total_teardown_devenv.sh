#!/usr/bin/env bash

# Deactivate venv if it's activated
if command -v deactivate > /dev/null 2>&1; then
    deactivate
fi

# Remove venv
if [ -d "backend/lib" ]; then
    rm -rf backend/bin
    rm -rf backend/lib
    rm -rf backend/include
    rm -rf backend/pyenv.cfg
    echo "Virtual environment removed."
fi

# Stop and remove all running containers
docker stop $(docker ps -aq)
docker rm $(docker ps -aq)

# Remove all images
docker rmi -f $(docker images -q)

echo ""
echo "----------------------------------------"
echo "Docker containers and images stopped and removed."