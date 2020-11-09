#!/bin/bash

rm -rf ./public
mkdir public

# Index

cp ./index.html ./public

# Projects

## Portfolio

cp -r ./projects/portfolio ./public/portfolio

## Draw

pushd ./projects/draw
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

mkdir ./public/draw

cp -r ./projects/draw/dist ./public/draw
cp -r ./projects/draw/assets ./public/draw
cp ./projects/draw/*.{html,css} ./public/draw

## Dashboard

pushd ./projects/dashboard
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

mkdir ./public/dashboard

cp -r ./projects/dashboard/dist ./public/dashboard
cp ./projects/dashboard/*.{html,css} ./public/dashboard

# Cheatsheets

cp -r ./cheatsheets ./public/cheatsheets

# Guides

cp -r ./guides ./public/guides
