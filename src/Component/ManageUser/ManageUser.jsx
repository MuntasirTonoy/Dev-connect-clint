import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchAllUsers, toggleUserRole } from "../../Hoocks/Api";
import Swal from "sweetalert2";
import Loading from "../../Component/Loading/Loading";
import { Helmet } from "react-helmet-async";

const ManageUsers = () => {
  const [search, setSearch] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users", searchQuery],
    queryFn: () => fetchAllUsers(searchQuery),
  });

  const handleToggleRole = async (email, currentRole) => {
    const action = currentRole === "admin" ? "Remove Admin" : "Make Admin";
    const nextRole = currentRole === "admin" ? "user" : "admin";

    const confirm = await Swal.fire({
      title: `${action}?`,
      text: `Are you sure you want to ${action.toLowerCase()} for this user?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: action,
    });

    if (!confirm.isConfirmed) return;

    try {
      await toggleUserRole(email, nextRole);
      Swal.fire("Success", `User role updated to ${nextRole}.`, "success");
      refetch();
    } catch (err) {
      console.error(err);
      Swal.fire("Error", `Failed to update role`, "error");
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(search); // triggers react-query refetch
  };

  if (isLoading) return <Loading />;

  return (
    <div data-aos="fade-up" className="p-6 bg-base-200 rounded-xl shadow">
      <Helmet>
        <title>Manage Users</title>
      </Helmet>

      <h2 className="text-3xl font-bold mb-4">Manage Users</h2>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="mb-4 flex gap-2">
        <input
          type="text"
          className="input input-bordered w-full max-w-sm"
          placeholder="Search by username or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit" className="btn bg-base-content text-base-100">
          Search
        </button>
      </form>

      {/* Users Table */}
      <div className="overflow-x-auto">
        <table className="table w-full min-w-[600px] text-sm">
          <thead className="text-left border-b">
            <tr>
              <th>User Name</th>
              <th>Email</th>
              <th>Subscription</th>
              <th>Role</th>
              <th>Make Admin</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.paymentStatus || "Free"}</td>
                <td>
                  <span
                    className={
                      user.role === "admin"
                        ? "text-green-600 text-xs bg-green-400/20 p-2 rounded-full"
                        : "text-base-content"
                    }
                  >
                    {user.role}
                  </span>
                </td>
                <td>
                  <button
                    className={`btn btn-xs md:btn-base shadow-none ${
                      user.role === "admin" ? "btn-error" : "btn-warning"
                    }`}
                    onClick={() => handleToggleRole(user.email, user.role)}
                  >
                    {user.role === "admin" ? "Remove" : "Make Admin"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
