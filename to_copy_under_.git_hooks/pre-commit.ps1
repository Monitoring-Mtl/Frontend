npm run jestTest

# Check the exit code to see if tests failed
if ($LASTEXITCODE -ne 0) {
    Write-Host "Unit tests failed. Commit rejected."
    exit 1
}

# Run npm audit to check for vulnerabilities
npm audit

# Check the exit code to see if vulnerabilities were found
if ($LASTEXITCODE -ne 0) {
    Write-Host "Vulnerabilities found. Commit rejected."
    exit 1
}