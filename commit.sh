#!/bin/bash

git add .

echo What should be the commit message?
read MESSAGE

git commit -m "$MESSAGE"
git push