rm -r ./public
mkdir public

# Portfolio

cp -r ./portfolio ./public/portfolio

# Draw

pushd ./draw
yarn build
popd

cp -r ./draw/dist ./public/draw
cp ./draw/*.{html,css} ./public/draw

# Dashboard

pushd ./dashboard
yarn build
popd

cp -r ./dashboard/dist ./public/dashboard
cp ./dashboard/*.{html,css} ./public/dashboard

# Deploy

npx gh-pages -d dist