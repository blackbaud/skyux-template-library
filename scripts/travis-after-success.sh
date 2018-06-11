set -e

if [[ "$TRAVIS_PULL_REQUEST" == "false" && ! $TRAVIS_BRANCH =~ $SAVAGE_BRANCH ]]; then
  node ./node_modules/@blackbaud/skyux-builder-config/scripts/visual-baseline.js
fi
