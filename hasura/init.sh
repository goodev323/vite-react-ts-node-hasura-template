#/bin/sh

SCRIPT_DIR=$(cd $(dirname $0); pwd)
cd $SCRIPT_DIR

ENV_FILE=$SCRIPT_DIR/../.env.local
source $ENV_FILE

INIT_DIR=$SCRIPT_DIR/example
hasura metadata --project $INIT_DIR apply --endpoint $HASURA_ENDPOINT --admin-secret $HASURA_GRAPHQL_ADMIN_SECRET
hasura migrate --project $INIT_DIR apply --all-databases --endpoint $HASURA_ENDPOINT --admin-secret $HASURA_GRAPHQL_ADMIN_SECRET
hasura metadata --project $INIT_DIR reload --endpoint $HASURA_ENDPOINT --admin-secret $HASURA_GRAPHQL_ADMIN_SECRET
