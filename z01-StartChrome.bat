REM Start Chrome with NO web security/protection to remove CORS protection
REM This allows my local angular program, being served-up from a localhost domain, 
REM to receive responses from web serveres at other domains (e.g., quote apis).

c:
CD  C:\Program Files (x86)\Google\Chrome\Application

REM "start" runs chrome and then returns to this batch file so that it can exit.
REM Without "start" control never returns to this batch file so the window stays open.
REM but there is no command prompt (b/c it is off running Chrome).
start chrome --disable-web-security --user-data-dir

