#!/bin/bash

rm -rf ./public
mkdir public

# Index

cp ./index.html ./public

# Portfolio

cp -r ./portfolio ./public/portfolio

# Draw

pushd ./draw
yarn
yarn clean
yarn build
zip -r dist/draw.zip \
  .gitignore \
  assets \
  package.json \
  tsconfig.json \
  webpack.config.js \
  yarn.lock
popd

cp -r ./draw/dist ./public/draw
cp -r ./draw/assets ./public/draw
cp ./draw/*.{html,css} ./public/draw

# Dashboard

pushd ./dashboard
yarn
yarn clean
yarn build
zip -r dist/dashboard.zip \
  .gitignore \
  package.json \
  tsconfig.json \
  webpack.config.js \
  yarn.lock
popd

cp -r ./dashboard/dist ./public/dashboard
cp ./dashboard/*.{html,css} ./public/dashboard

# Cheatsheets

cp -r ./cheatsheets ./public/cheatsheets

# Guides

cp -r ./guides ./public/guides
