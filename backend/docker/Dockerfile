# Start from a base Python 3.10 image
FROM python:3.10-slim

# Set the working directory in the container
WORKDIR /app

# Copy the requirements file into the container
COPY requirements.txt .

# Install the Python dependencies
RUN pip3 install --no-cache-dir -r requirements.txt

# Copy the rest of the code into the container
COPY . .

# Expose the port the app runs on
EXPOSE 5001

# Set the command to run when the container starts
CMD ["python3", "app.py"]