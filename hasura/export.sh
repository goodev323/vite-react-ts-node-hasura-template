#/bin/sh

SCRIPT_DIR=$(cd $(dirname $0); pwd)
cd $SCRIPT_DIR

ENV_FILE=$SCRIPT_DIR/../.env.local

if [ ! -e ${ENV_FILE} ]; then
    echo "ERROR: Not found ../.env.local"
    exit 1
fi

source $ENV_FILE

if [ -z "$HASURA_PROJECT_NAME" -o -z "$HASURA_GRAPHQL_ADMIN_SECRET" ]; then
    echo "ERROR: Not found required data. HASURA_PROJECT_NAME:$HASURA_PROJECT_NAME, HASURA_GRAPHQL_ADMIN_SECRET:$HASURA_GRAPHQL_ADMIN_SECRET"
    exit 1
fi

INIT_DIR=$SCRIPT_DIR/$HASURA_PROJECT_NAME
if [ ! -e ${INIT_DIR} ]; then
    hasura init $HASURA_PROJECT_NAME --endpoint $HASURA_ENDPOINT
fi

hasura migrate --project $INIT_DIR create "migrate" --from-server --database-name default --admin-secret $HASURA_GRAPHQL_ADMIN_SECRET
hasura metadata --project $INIT_DIR export --admin-secret $HASURA_GRAPHQL_ADMIN_SECRET
