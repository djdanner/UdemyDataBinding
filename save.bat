REM save all files to current github project

git status
git add .
git status

REM Format for Commit command:
REM git commit -m "Stock Quote Component - WORKS!."
git commit -m %1
git status

git push
git status