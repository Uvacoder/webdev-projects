#!/bin/bash

rm -rf ./public
mkdir public

# Index

cp ./index.html ./public

# Projects

## Portfolio

cp -r ./projects/portfolio ./public/portfolio

## Drawing

pushd ./projects/drawing
yarn
yarn clean
yarn build
zip -r dist/drawing.zip \
  .gitignore \
  assets \
  package.json \
  tsconfig.json \
  webpack.config.js \
  yarn.lock
popd

mkdir ./public/drawing

cp -r ./projects/drawing/dist ./public/drawing
cp -r ./projects/drawing/assets ./public/drawing
cp ./projects/drawing/*.{html,css} ./public/drawing

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
