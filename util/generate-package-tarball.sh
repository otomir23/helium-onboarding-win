#!/bin/bash
# inspired by third_party/node/update_npm_deps
set -e

if ! [ -f package.json ]; then
    echo "this script must be run in the repo root" >&2
    exit 1
fi

rm -rf node_modules

pnpm install \
    --frozen-lockfile \
    --verify-store-integrity \
    --shamefully-hoist

TAR=gtar
if ! command -v gtar 2>&1 >/dev/null
then
    TAR=tar
fi

pushd node_modules

find . -print0 \
    | sort -z \
    | $TAR -zcf ../node_modules.tar.gz \
        --format=posix \
        --numeric-owner \
        --owner=0 \
        --group=0 \
        --preserve-permissions \
        --mtime='1970-01-01' \
        --no-recursion \
        --null \
        --files-from -

popd

du -sh node_modules
ls -lh node_modules.tar.gz
rm -rf node_modules
