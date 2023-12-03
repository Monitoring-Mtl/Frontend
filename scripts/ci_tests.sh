#!/bin/bash

npm run setupTestCoverage &

npm run start &

npm run cypress:test

exit $?