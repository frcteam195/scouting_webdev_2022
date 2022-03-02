#!/bin/bash

THIS_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" >/dev/null 2>&1 && pwd)"


source "${THIS_DIR}"/venv/bin/activate
export FLASK_APP=backend
export FLASK_DEBUG=1
flask run --port 5000
