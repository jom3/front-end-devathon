!/bin/bash
component=$1

ng g c "${component}"/components/"${component}"

cd "$(dirname "$0")"
SCRIPT_DIR="$(pwd)"

mkdir  "$SCRIPT_DIR"/src/app/"${component}"/containers
mkdir  "$SCRIPT_DIR"/src/app/"${component}"/models
mkdir  "$SCRIPT_DIR"/src/app/"${component}"/services
mkdir  "$SCRIPT_DIR"/src/app/"${component}"/pipes
mkdir  "$SCRIPT_DIR"/src/app/"${component}"/directives

touch "$SCRIPT_DIR"/src/app/"${component}"/index.ts
touch "$SCRIPT_DIR"/src/app/"${component}"/models/index.ts
touch "$SCRIPT_DIR"/src/app/"${component}"/components/index.ts
touch "$SCRIPT_DIR"/src/app/"${component}"/pipes/index.ts
touch "$SCRIPT_DIR"/src/app/"${component}"/services/index.ts
touch "$SCRIPT_DIR"/src/app/"${component}"/directives/index.ts
touch "$SCRIPT_DIR"/src/app/"${component}"/"${component}"-routing.ts




