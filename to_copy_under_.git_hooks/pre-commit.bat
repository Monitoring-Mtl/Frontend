@echo off

npm test

:: Check the exit code to see if tests failed
if %errorlevel% neq 0 (
  echo Unit tests failed. Commit rejected.
  exit /b 1
)
