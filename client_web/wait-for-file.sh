#!/bin/sh
FILE=${1:-/shared/client.apk}
TIMEOUT=${2:-60}
i=0
while [ $i -lt $TIMEOUT ]; do
  if [ -f "$FILE" ]; then
    echo "Found $FILE"
    shift 2
    exec "$@"
  fi
  echo "Waiting for $FILE..."
  sleep 1
  i=$((i+1))
done
echo "Timeout waiting for $FILE, starting anyway..."
shift 2
exec "$@"
