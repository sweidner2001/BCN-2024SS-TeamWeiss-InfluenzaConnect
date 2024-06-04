#!/usr/bin/env bash

# Function for error checking
check_result() {
    if [ $? -ne 0 ]; then
        echo "Error: $1"
        exit 1
    fi
}


# Stop and remove Docker containers
docker-compose -f ./docker-compose.yml down
check_result "Failed to stop Docker Compose"

echo ""
echo "----------------------------------------"
echo "Docker containers stopped and removed."