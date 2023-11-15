#!/bin/bash

npm run start &

npm run cypress:test

exit $?