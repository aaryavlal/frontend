#!/bin/bash

# Theme Switch Script for Jekyll Site
# Usage: ./switch-theme.sh [minima|text]

THEME=${1:-minima}
CONFIG_FILE="_config.yml"
BACKUP_CONFIG="_config.backup.yml"

# Create backup of current config
cp $CONFIG_FILE $BACKUP_CONFIG

case $THEME in
  "minima")
    echo "Switching to Minima theme..."
    if [ -f "_config.minima.yml" ]; then
      cp _config.minima.yml $CONFIG_FILE
      echo "Copied _config.minima.yml to _config.yml"
    else
      echo "Error: _config.minima.yml not found!"
      exit 1
    fi
    ;;
  "text")
    echo "Switching to TeXt theme..."
    if [ -f "_config.text.yml" ]; then
      cp _config.text.yml $CONFIG_FILE
      echo "Copied _config.text.yml to _config.yml"
    else
      echo "Error: _config.text.yml not found!"
      exit 1
    fi
    ;;
  *)
    echo "Usage: $0 [minima|text]"
    echo "Available themes:"
    echo "  minima - Minimal, clean theme"
    echo "  text   - Feature-rich theme with cards and modern UI"
    exit 1
    ;;
esac

echo "Theme switched to $THEME"
echo "Run 'make clean && make' to rebuild the site"
echo "Backup saved as $BACKUP_CONFIG"
