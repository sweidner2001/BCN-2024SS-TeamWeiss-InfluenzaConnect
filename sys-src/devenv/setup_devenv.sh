#!/bin/bash

# Function for error checking
check_result() {
    if [ $? -ne 0 ]; then
        echo "Error: $1"
        exit 1
    fi
}

cd ..
python3 -m venv backend
check_result "Failed to create virtual environment"

source backend/bin/activate
check_result "Failed to activate virtual environment"

pip3 install --upgrade pip
pip3 install -r backend/requirements.txt
check_result "Failed to install requirements"

# install frontend dependencies
cd frontend
npm install
check_result "Failed to install frontend dependencies"

cd ..

# Docker-Compose Build
docker-compose -f devenv/docker-compose.yml up
check_result "Failed to start Docker Compose"

echo ""
echo "----------------------------------------"
echo "Development environment setup complete."
