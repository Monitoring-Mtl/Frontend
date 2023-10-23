npm test

# Check the exit code to see if tests failed
if ($LASTEXITCODE -ne 0) {
    Write-Host "Unit tests failed. Commit rejected."
    exit 1
}
