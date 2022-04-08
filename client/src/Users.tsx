import { useUsersQuery } from "./gen/graphql-codegen";

export const Users = () => {
  const { data } = useUsersQuery();
  return (
    <div>
      <h2>Users</h2>
      {data?.users.map((user) => {
        return (
          <div key={user.user_id}>
            <p>{user.name}</p>
            <p>{user.email}</p>
          </div>
        );
      })}
    </div>
  );
};
