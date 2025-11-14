#!/bin/bash

# Show the tools versions
python --version
bundle --version

# Create a virtual environment if it doesn't exist
if [ ! -d "venv" ]; then
    python -m venv venv
fi

# Activate the virtual environment
source venv/bin/activate

# Install the required Python packages
pip install -r requirements.txt

# Configure Bundler to install gems locally
bundle config set --local path './.bundle'

# Install Ruby gems
bundle install

# Check if Git username/email are already set
GIT_NAME=$(git config --global user.name)
GIT_EMAIL=$(git config --global user.email)

if [ -z "$GIT_NAME" ] || [ -z "$GIT_EMAIL" ]; then
    echo "Git configuration not found. Running activate_github.sh..."
    ./scripts/activate_github.sh
else
    echo "✅ Git is already configured: $GIT_NAME <$GIT_EMAIL>"
fi
