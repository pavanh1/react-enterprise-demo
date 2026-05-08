import { useEffect, useState } from "react";
import UserCard from "../components/UserCard";
import { fetchUsers } from "../api/userAPI";

function UserPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await fetchUsers();
        setUsers(data);
      } catch (error) {
        console.error("Failed to load users", error);
      }
    };

    loadUsers();
  }, []);

  return (
    <div>
      <h1>Enterprise React Demo</h1>
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
}

export default UserPage;