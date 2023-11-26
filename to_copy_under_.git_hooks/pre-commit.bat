@echo off

npm run jestTest

:: Check the exit code to see if tests failed
if %errorlevel% neq 0 (
  echo Unit tests failed. Commit rejected.
  exit /b 1
)

:: Run npm audit to check for vulnerabilities
npm audit

:: Check the exit code to see if vulnerabilities were found
if %errorlevel% neq 0 (
  echo Vulnerabilities found. Commit rejected.
  exit /b 1
)