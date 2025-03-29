import axios from "axios";
import React, { useEffect, useState } from "react";
import EditUser from "./EditUser";
import DeleteUser from "./DeleteUser";

const UsersList = ({search}) => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [openEdit, setOpenEdit] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [deletingUser, setDeletingUser] = useState(null);

  useEffect(() => {
    fetchUsers(page)
  }, [page]);

  const fetchUsers = async (pageNumber) => {
    try {
      const response = await axios.get(
        `https://reqres.in/api/users?page=${pageNumber}`
      );
      setUsers(response.data.data);
      console.log(response.data.data)
      localStorage.setItem("users", JSON.stringify(response.data.data));
      setTotalPages(response.data.total_pages);
    } catch (error) {
      console.log("Error fetching users:", error);
    }
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleCloseDelete = ()=>{
    setDeletingUser(null)
  }

  const handleUserUpdate = (updatedUser) => {
    const updatedUsers = users.map((user) =>
      user.id === updatedUser.id ? updatedUser : user
    );
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  const handleUserDelete = (userId) => {
    const storedUsers = JSON.parse(localStorage.getItem("users") || []);
    const updatedUsers = storedUsers.filter((user) => user.id !== userId);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setUsers(updatedUsers);
    setDeletingUser(null);
  };

  
    const filteredUsers = users.filter(
      (user) =>
        user.first_name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase()) ||
        user.id.toString().includes(search)
    )


  return (
    <div className="px-8 py-6">
      <h1 className="text-2xl font-bold mb-6">Users List</h1>
      {filteredUsers.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {filteredUsers.map((user) => (
            <div
              key={user.id}
              className="bg-gray-50 p-4 rounded-md shadow-md flex flex-col gap-2"
            >
              <img
                src={user.avatar}
                alt={user.first_name}
                className="w-28 h-28 rounded-full mx-auto mb-2"
              />
              <p className="text-center font-semibold">
                {user.first_name} {user.last_name}
              </p>
              <p className="text-center text-gray-600">{user.email}</p>
              <div className="flex justify-center items-center gap-4">
                <button
                  className="bg-indigo-700 text-white font-semibold px-4 py-1 rounded-md text-sm cursor-pointer border border-transparent hover:bg-purple-50 hover:text-indigo-700 hover:border hover:border-indigo-700"
                  onClick={() => {
                    setOpenEdit(true);
                    setEditingUser(user);
                  }}
                >
                  Edit
                </button>
                {openEdit && editingUser.id === user.id && (
                  <EditUser
                    userData={editingUser}
                    closeEdit={handleCloseEdit}
                    onUserUpdate={handleUserUpdate}
                  />
                )}
                <button
                  className="bg-purple-50 text-indigo-700 font-semibold px-4 py-1 rounded-md border border-indigo-700 text-sm cursor-pointer hover:bg-indigo-700 hover:text-white"
                  onClick={() => setDeletingUser(user.id)}
                >
                  Delete
                </button>
                {deletingUser === user.id && (
                  <DeleteUser
                    userId={user.id}
                    closeDelete={handleCloseDelete}
                    onUserDelete={handleUserDelete}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading users...</p>
      )}

      <div className="flex justify-between mt-10">
        <button
          className={`bg-purple-50 px-4 py-2 text-indigo-800 font-bold rounded-md cursor-pointer border border-transparent hover:border hover:border-indigo-800  
      ${page === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          Previous
        </button>
        <span>
          {page} / {totalPages}
        </span>
        <button
          className={`bg-purple-50  px-4 py-2 text-indigo-800 font-bold rounded-md cursor-pointer border border-transparent hover:border hover:border-indigo-800  
      ${page === totalPages ? "opacity-50 cursor-not-allowed" : ""}`}
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UsersList;
