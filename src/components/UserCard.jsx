export default function UserCard({ user }) {
  return (
    <div
      style={{
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '16px',
      }}
    >
      <h2>{user.name}</h2>
      <p>{user.email}</p>
      <p>{user.company?.name || "No company"}</p>
    </div>
  );
}