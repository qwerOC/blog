#!usr/bin/env sh

set -e
rm -rf docs/.vitepress/dist

npm run build

cd docs/.vitepress/dist

git init

git add -A

git commit -m "pagee"
git  push -f https://github.com/qwerOC/blog.git master:gh-pages

cd -

rm -rf docs/.vitepress/dist