#!/bin/bash

npm setupTestCoverage &

npm run start &

npm run cypress:test

exit $?