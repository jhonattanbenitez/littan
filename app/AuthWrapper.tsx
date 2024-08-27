import { useAuthListener } from "@/app/hooks/useAuthListener";

const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  useAuthListener(); // Initialize the auth listener
  return <>{children}</>;
};

export default AuthWrapper;
