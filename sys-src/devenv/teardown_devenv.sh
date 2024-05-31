#!/bin/bash

# Stop and remove Docker containers
docker-compose -f devenv/docker-compose.yml down

echo ""
echo "----------------------------------------"
echo "Docker containers stopped and removed."