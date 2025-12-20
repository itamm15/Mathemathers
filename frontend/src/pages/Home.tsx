import { useAuth } from "@/context/AuthContext";

function Home() {
  const { user } = useAuth();

  return (
    <div>
      {user ? "Welcome, " + user.email : "You are not logged in"}
    </div>
  )
}

export default Home;
