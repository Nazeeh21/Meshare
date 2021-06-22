#!/bin/bash

git add .

echo Enter commit message:
read MESSAGE

git commit -m "$MESSAGE"
git push