#!/bin/bash

npm run start &
#sleep 1
#pid=$!
#echo "Captured pid = " $pid
#ps

npm run cypress:test
exit_code=$?

echo "Tests terminated with exit code " $exit_code

#echo "Terminating server process with pid" $pid
#kill $pid

exit $exit_code