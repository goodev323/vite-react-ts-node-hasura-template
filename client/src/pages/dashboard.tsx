import { useAuth0 } from "@auth0/auth0-react";

export const DashboardPage = () => {
  const { logout } = useAuth0();
  return (
    <div>
      <h1>Dashboard</h1>
      <a href="/users">User List</a>
      <button onClick={() => logout()}>logout</button>
    </div>
  );
};
