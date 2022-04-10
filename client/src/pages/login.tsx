import { useAuth0 } from "@auth0/auth0-react";

export const LoginPage = () => {
  const { loginWithRedirect } = useAuth0();
  const handleClick = async () => {
    await loginWithRedirect({
      screen_hint: "signup",
    });
  };
  return (
    <div>
      <button onClick={handleClick}>login</button>
    </div>
  );
};
