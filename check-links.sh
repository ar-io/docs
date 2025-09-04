#! /bin/bash

yarn --silent check-links --format json > report.json

# Count total links
TOTAL=$(jq '.links | length' report.json)
echo "Total bad links: $TOTAL"

# Count links that are 403
FOUND_403=$(jq '[.links[] | select(.status==403)] | length' report.json)
echo "Total 403 links: $FOUND_403"

# Count links that are not 403 or 429 (these are often expected)
NOT_403_429=$(jq '[.links[] | select(.state!="OK" and (.status|tonumber)!=403 and (.status|tonumber)!=429)] | length' report.json)
echo "Total not 403/429 links: $NOT_403_429"

# if there's a github output, output the results to the github output
if [ $GITHUB_OUTPUT ]; then
    echo "BROKEN_LINKS=$NOT_403_429" >> $GITHUB_OUTPUT
fi
