import { useUsersQuery } from "../gen/graphql-codegen";

export const UsersPage = () => {
  const { data } = useUsersQuery();
  return (
    <div>
      <h2>User List</h2>
      <ul>
        {data?.users.map(({ id, name }) => {
          return <li key={id}>{name}</li>;
        })}
      </ul>
    </div>
  );
};
