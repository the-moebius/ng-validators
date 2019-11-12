#!/usr/bin/env bash

set -e
set -o pipefail

ROOT_PATH="$(dirname "$0")/.."

# https://gist.github.com/DarrenN/8c6a5b969481725a4413
PACKAGE_VERSION=$(grep 'version' package.json | cut -d '"' -f4 | tr -d '[[:space:]]')

# Building the package
echo "Building the package…"
npm run build

# Publishing the package to npm
echo "Publishing the package to npm…"
cd "${ROOT_PATH}/dist/"
npm publish

# Tagging the release in Git
echo "Tagging the release…"
git tag "v${PACKAGE_VERSION}"
git push --tags

echo "All done!"
