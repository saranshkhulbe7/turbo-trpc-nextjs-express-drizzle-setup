"use client";
import { trpcClient } from "@prodx/trpc-client/src/client";
import { useState } from "react";
export default function Home() {
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [role, setRole] = useState<"user" | "admin">("user");

  const { mutate } = trpcClient.user.create.useMutation();
  const utils = trpcClient.useContext();
  const { data: allUsers } = trpcClient.user.all.useQuery();

  if (!allUsers) return <div>Loading...</div>;

  return (
    <main className="flex flex-col gap-5">
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <p>name</p>
          <input
            className="border-2 border-gray-500"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex gap-4">
          <p>password</p>
          <input
            className="border-2 border-gray-500"
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex gap-4">
          <p>email</p>
          <input
            className="border-2 border-gray-500"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex gap-4">
          <p>role</p>
          <select
            value={role}
            className="border-2 border-gray-500"
            onChange={(e) => {
              setRole(e.target.value as "user" | "admin");
            }}
          >
            <option value="user">user</option>
            <option value="admin">admin</option>
          </select>
        </div>
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => {
          mutate(
            {
              name,
              email,
              password,
              role,
            },
            {
              onSuccess: () => {
                setName("");
                setPassword("");
                setEmail("");
                setRole("user");
                utils.user.all.invalidate();
              },
            }
          );
        }}
      >
        Create user
      </button>
      <div className="flex flex-col gap-5">
        All users
        <table className="max-w-[500px] border border-black">
          <thead>
            <tr>
              <th className="border border-black text-center">id</th>
              <th className="border border-black text-center">name</th>
              <th className="border border-black text-center">password</th>
              <th className="border border-black text-center">email</th>
              <th className="border border-black text-center">role</th>
            </tr>
          </thead>
          <tbody>
            {allUsers.map((user) => (
              <tr key={user.id}>
                <td className="border border-black text-center">{user.id}</td>
                <td className="border border-black text-center">{user.name}</td>
                <td className="border border-black text-center">
                  {user.password}
                </td>
                <td className="border border-black text-center">
                  {user.email}
                </td>
                <td className="border border-black text-center">{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
