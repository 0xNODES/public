#!/bin/bash

CONFIG="config/$1.json"
MANIFEST="subgraph-$1.yaml"

yarn pre-build

# create current.ts, which exports the config of the current network
CONTENTS=$(cat "$CONFIG" | tr -d '[:space:]')
printf "export const config = '%s';" $CONTENTS > config/current.ts

# create manifest from template
yarn --silent mustache "$CONFIG" template.yaml > "$MANIFEST"

# codegen
yarn codegen "$MANIFEST"

# build
yarn graph build "$MANIFEST"
