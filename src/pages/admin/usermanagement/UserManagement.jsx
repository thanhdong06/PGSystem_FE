import { useEffect, useState } from "react";
import moment from "moment";
import TitleCard from "../../../components/TitleCard";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import PencilIcon from "@heroicons/react/24/outline/PencilIcon";

const API_URL =
  "https://pgsystem-g2ehcecxdkd5bjex.southeastasia-01.azurewebsites.net/api/Admin/Users";

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedRole, setSelectedRole] = useState("All");
  const [loading, setLoading] = useState(true);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editUser, setEditUser] = useState(null);

  useEffect(() => {
    async function fetchUsers() {
      try {
        setLoading(true);
        const response = await fetch(API_URL);
        const data = await response.json();

        if (data && data.value && data.value.data) {
          setUsers(data.value.data);
          applyFilters(data.value.data, searchText, selectedRole);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  const applyFilters = (usersList, search, role) => {
    let filtered = usersList;

    if (role !== "All") {
      filtered = filtered.filter((user) => user.role === role);
    }

    if (search) {
      filtered = filtered.filter(
        (user) =>
          user.email.toLowerCase().includes(search) ||
          (user.fullName && user.fullName.toLowerCase().includes(search))
      );
    }

    setFilteredUsers(filtered);
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchText(value);
    applyFilters(users, value, selectedRole);
  };

  const handleFilter = (e) => {
    const value = e.target.value;
    setSelectedRole(value);
    applyFilters(users, searchText, value);
  };

  const confirmDeleteUser = (user) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  const deleteCurrentUser = () => {
    if (selectedUser) {
      setFilteredUsers(
        filteredUsers.filter((user) => user.uid !== selectedUser.uid)
      );
      setIsDeleteModalOpen(false);
    }
  };

  const openEditUserModal = (user) => {
    setEditUser({ ...user });
    setIsEditModalOpen(true);
  };

  const updateUserInfo = () => {
    if (editUser) {
      setFilteredUsers(
        filteredUsers.map((user) =>
          user.uid === editUser.uid ? editUser : user
        )
      );
      setIsEditModalOpen(false);
    }
  };

  return (
    <>
      <TitleCard title="User Management" topMargin="mt-2">
        <div className="flex gap-4 justify-end mb-4">
          <input
            type="text"
            placeholder="Search by name/email..."
            value={searchText}
            onChange={handleSearch}
            className="input input-bordered w-full max-w-xs"
          />

          <select
            value={selectedRole}
            onChange={handleFilter}
            className="select select-bordered"
          >
            <option value="All">All</option>
            <option value="User">User</option>
            <option value="Member">Member</option>
            <option value="Doctor">Doctor</option>
          </select>
        </div>

        <div className="overflow-x-auto w-full">
          <table className="table table-fixed w-full">
            <thead>
              <tr>
                <th className="w-1/6">Name</th>
                <th className="w-1/6">Email</th>
                <th className="w-1/6">Phone</th>
                <th className="w-1/12">Role</th>
                <th className="w-1/12">Created At</th>
                <th className="w-1/12">Blog Count</th>
                <th className="w-1/12">Comment </th>
                <th className="w-1/12">Pregnant?</th>
                <th className="w-1/12">Pregnancy  </th>
                <th className="w-1/12">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="10" className="text-center">
                    Loading...
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user, index) => (
                  <tr key={index}>
                    <td>{user.fullName || "-"}</td>
                    <td>{user.email}</td>
                    <td>{user.phone || "-"}</td>
                    <td>
                      <span
                        className={`badge ${
                          user.role === "Doctor"
                            ? "badge-success"
                            : user.role === "Member"
                            ? "badge-warning"
                            : "badge-info"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td>
                      {moment()
                        .add(-5 * (index + 2), "days")
                        .format("DD MMM YY")}
                    </td>
                    <td>{user.blogCount || 0}</td>
                    <td>{user.commentCount || 0}</td>
                    <td>
                      <span
                        className={`badge ${
                          user.isPregnant ? "badge-success" : "badge-error"
                        }`}
                      >
                        {user.isPregnant ? "Yes" : "No"}
                      </span>
                    </td>
                    <td>
                      {user.pregnancyWeeks
                        ? `${user.pregnancyWeeks} weeks`
                        : "-"}
                    </td>
                    <td>
                      <button
                        className="btn btn-xs btn-primary mr-2"
                        onClick={() => openEditUserModal(user)}
                      >
                        <PencilIcon className="w-4 h-4" />
                      </button>
                      <button
                        className="btn btn-xs btn-error"
                        onClick={() => confirmDeleteUser(user)}
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </TitleCard>

      {/* Modal confirm delete*/}
      {isDeleteModalOpen && (
        <dialog className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Confirm Delete</h3>
            <p className="py-4">
              You want to delete this account?
              <strong>{selectedUser?.fullName}</strong>?
            </p>
            <div className="modal-action">
              <button
                className="btn btn-secondary"
                onClick={() => setIsDeleteModalOpen(false)}
              >
                Cancel
              </button>
              <button className="btn btn-error" onClick={deleteCurrentUser}>
                Delete
              </button>
            </div>
          </div>
        </dialog>
      )}

      {/* Modal edit User */}
      {isEditModalOpen && (
        <dialog className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Edit User Information</h3>

            <label className="label">
              <span className="label-text">Full Name</span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={editUser?.fullName}
              onChange={(e) =>
                setEditUser({ ...editUser, fullName: e.target.value })
              }
            />

            <label className="label mt-2">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              className="input input-bordered w-full"
              value={editUser?.email}
              onChange={(e) =>
                setEditUser({ ...editUser, email: e.target.value })
              }
            />

            <label className="label mt-2">
              <span className="label-text">Phone Number</span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={editUser?.phone}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "").slice(0, 10);
                setEditUser({ ...editUser, phone: value });
              }}
              placeholder="Enter 10-digit phone number"
            />

            <label className="label mt-2">
              <span className="label-text">Role</span>
            </label>
            <select
              className="select select-bordered w-full"
              value={editUser?.role}
              onChange={(e) =>
                setEditUser({ ...editUser, role: e.target.value })
              }
            >
              <option value="User">User</option>
              <option value="Member">Member</option>
              <option value="Doctor">Doctor</option>
            </select>

            <label className="label mt-2">
              <span className="label-text">Pregnancy </span>
            </label>
            <input
              type="number"
              className="input input-bordered w-full"
              value={editUser?.pregnancyWeeks || ""}
              onChange={(e) =>
                setEditUser({ ...editUser, pregnancyWeeks: e.target.value })
              }
              placeholder="Enter number of weeks"
            />

            {/* Modal Actions */}
            <div className="modal-action">
              <button
                className="btn btn-secondary"
                onClick={() => setIsEditModalOpen(false)}
              >
                Cancel
              </button>
              <button className="btn btn-success" onClick={updateUserInfo}>
                Save
              </button>
            </div>
          </div>
        </dialog>
      )}
    </>
  );
}

export default UserManagement;
