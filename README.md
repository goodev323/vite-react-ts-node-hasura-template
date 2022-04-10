# Auth0 の設定

1. Auth0 アカウントの作成
2. [Applications]>[Create Application]>[Single Page Web Applications]で新規アプリ作成
3. アプリケーションページにて、以下を設定
   - Allowed Callback URLs
     http://localhost:3000/
   - Allowed Logout URLs
     http://localhost:3000/
   - Allowed Web Origins
     http://localhost:3000/
   - Allowed Origins (CORS)
     http://localhost:3000/
   - [Advanced Settings]>[Grant Types]
     Password
4. [Authentication]>[Database]で、ユーザー情報保存用 DB の作成
5. [Authentication]>[Social]で、google-oauth2 を追加
6. 手順 3 で作成したアプリケーションページで、4,5d で追加した Database,Social の設定を ON にする
7. [Auth Pipeline]>[Create]で、以下のパイプラインを作成

```
function (user, context, callback) {
  const namespace = "https://hasura.io/jwt/claims";
  const userId = user.user_id;
  context.idToken[namespace] = {
    'x-hasura-default-role': 'user',
    'x-hasura-allowed-roles': ['user'],
    'x-hasura-user-id': userId,
   };
	callback(null, user, context);
}
```

9. [User Management]>[Role]>[Create Role]から、"user"ロールを作成
10. [User Management]>[Users]>[Create User]から、ユーザーを作成(Connection は、Username-Password-Authentication)にする。
11. ユーザーページで、[Roles]に"user"を割り当てる
12. Post リクエストを送信し、token が取得できるか確認する。

```
curl -X POST https://{DOMAIN}/oauth/token \
    -H 'Content-Type: application/x-www-form-urlencoded' \
    -d 'client_id={CLIENT_ID}' \
    -d 'grant_type=http://auth0.com/oauth/grant-type/password-realm' \
    -d 'responseType=token id_token' \
    -d 'scope=openid profile' \
    -d 'realm=[USER_DB_NAME]' \ <!-- "Username-Password-Authentication" など -->
    -d 'username={USER}' \
    -d 'password={PASS}'
```

（response の id_token を取得）

# Google cloud 　の設定

1. Google Cloud のプロジェクト作成
2. [API とサービス]>[認証情報]>[認証情報を作成]>[OAuth2 クライアント ID]
3. 承認済みのリダイレクト URI に、`https://[AUTH0_DOMAIN].auth0.com/login/callback`を設定

# Hasura Graphql の初期設定

1. env ファイルの作成

   ```
   cp -p .env.local.example .env.local
   vim .env.local
   (必要箇所の置換)
   ```

2. docker-compose.yaml の編集

   ```
   vim docker-compose.yaml
   > HASURA_GRAPHQL_ENABLE_CONSOLE=false
   ```

3. hasura データベースの初期化

   ```
   sh ./hasura/operate.sh start
   sh ./hasura/init.sh
   ```

4. hasura のコンソール起動

   ```
   vim docker-compose.yaml
   > HASURA_GRAPHQL_ENABLE_CONSOLE=start
   sh ./hasura/operate.sh restart
   ```

   ブラウザで http://localhost:8080 にアクセス

5. user 権限での読み取り確認
   Grapiql の画面上で、"x-hasura-admin-secret"のチェックを外し、Authorization を追加
   `Bearer [AUTH0_ID_TOKEN]`
   ※[Auth0 の設定]の 12 で取得した ID_TOKEN

6. 以下の query でデータ取得が可能か確認

```
query {
  users{
    name
  }
}
```
