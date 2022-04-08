## Init hasura example scheme

1. Edit docker-compose.yaml

   Change HASURA_GRAPHQL_ENABLE_CONSOLE value to "false"

2. Start hasura graphql engine

   > yarn graphql:start

3. Apply hasura migrate scheduled_time

   > sh ./hasura/init.sh

4. Edit docker-compose.yaml again

   Change HASURA_GRAPHQL_ENABLE_CONSOLE value to "true"

5. Restart hasura graphql engine
   > yarn graphql:restart
