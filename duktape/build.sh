#!/bin/bash

git clone --recursive https://github.com/xxuejie/ckb-duktape ckb-duktape-git-repo
cd ckb-duktape-git-repo

make

rm -rf /project/build
mv build /project/build

cd ..
rm -rf ckb-duktape-git-repo
