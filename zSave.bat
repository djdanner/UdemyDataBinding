echo OFF
REM save all files to existing github project
REM
REM   Usage:
REM     save "Commit Comment String"
REM
REM   Example Usage:
REM     save "Stock Quote Component - WORKS!."
REM

git add .
git status

REM Format for Commit command:
REM git commit -m "Stock Quote Component - WORKS!."
git commit -m %1

git push
git status
