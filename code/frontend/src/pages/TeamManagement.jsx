import { useState, useEffect } from "react"
import { useAuth } from "../context/AuthContext"
import { useTheme } from "../context/ThemeContext"
import authService from "../services/authService"

function TeamManagement() {
  const [users, setUsers] = useState([])
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [userToDelete, setUserToDelete] = useState(null)
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password_confirm: "",
    first_name: "",
    last_name: "",
    phone_number: "",
    role: "agent",
  })
  const [error, setError] = useState("")
  const [successMessage, setSuccessMessage] = useState("")
  const { user } = useAuth()
  const { theme } = useTheme()
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState("All")

  const isDark = theme === "dark"

  useEffect(() => {
    if (user?.role === "admin") {
      fetchUsers()
    }
  }, [user])

  const fetchUsers = async () => {
    try {
      const data = await authService.getApiInstance().get("/users/")
      setUsers(data.data)
    } catch (error) {
      console.error("Error fetching users:", error)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await authService.getApiInstance().post("/users/", formData)
      setSuccessMessage("User created successfully!")
      setError("")
      setShowCreateModal(false)
      fetchUsers()
      setFormData({
        username: "",
        email: "",
        password: "",
        password_confirm: "",
        first_name: "",
        last_name: "",
        phone_number: "",
        role: "agent",
      })
    } catch (err) {
      if (err.response?.data?.username) {
        setError("Username already exists. Please choose a different username.")
      } else {
        setError("Error creating user. Please try again.")
      }
    }
  }

  const handleDeleteClick = (user) => {
    setUserToDelete(user)
    setShowDeleteModal(true)
  }

  const handleDeleteConfirm = async () => {
    try {
      await authService.getApiInstance().delete(`/auth/user/${userToDelete.id}/`)
      setSuccessMessage("User deleted successfully!")
      setError("")
      setShowDeleteModal(false)
      setUserToDelete(null)
      fetchUsers()
    } catch (err) {
      setError(err.response?.data?.detail || "Error deleting user. Please try again.")
    }
  }

  const handleDeleteCancel = () => {
    setShowDeleteModal(false)
    setUserToDelete(null)
  }

  if (user?.role !== "admin") {
    return <div className={`p-4 ${isDark ? "text-white" : "text-gray-800"}`}>You don't have permission to access this page.</div>
  }

  const filteredUsers = users.filter((user) => {
    const searchMatch =
      user.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.last_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase())

    const roleMatch = roleFilter === "All" || user.role?.toLowerCase() === roleFilter.toLowerCase()

    return searchMatch && roleMatch
  })

  return (
    <div className={`p-6 ${isDark ? "bg-gray-900 text-white" : "bg-white text-gray-800"}`}>
      <div className="flex justify-between items-center mb-6">
        <h1 className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-800"}`}>Team Management</h1>
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Create New User
        </button>
      </div>

      <div className="mb-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="relative w-full md:w-64">
          <input
            type="text"
            placeholder="Search team members..."
            className={`w-full pl-10 pr-4 py-2 border rounded-md shadow-sm ${
              isDark ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-300 text-gray-800"
            }`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="absolute left-3 top-2.5 text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className={`text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}>Role:</span>
          <div className="flex space-x-2">
            {["All", "Manager", "Agent"].map((role) => (
              <button
                key={role}
                onClick={() => setRoleFilter(role)}
                className={`px-3 py-1 text-sm rounded-full ${
                  roleFilter === role 
                    ? "bg-blue-600 text-white" 
                    : isDark 
                      ? "bg-gray-700 text-gray-300 hover:bg-gray-600" 
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {role}
              </button>
            ))}
          </div>
        </div>
      </div>

      {error && <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">{error}</div>}
      {successMessage && (
        <div className="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
          {successMessage}
        </div>
      )}

      <div className={`shadow rounded-lg overflow-hidden ${isDark ? "bg-gray-800" : "bg-white"}`}>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className={isDark ? "bg-gray-700" : "bg-gray-50"}>
            <tr>
              <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${isDark ? "text-gray-300" : "text-gray-500"}`}>Name</th>
              <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${isDark ? "text-gray-300" : "text-gray-500"}`}>
                Username
              </th>
              <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${isDark ? "text-gray-300" : "text-gray-500"}`}>Email</th>
              <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${isDark ? "text-gray-300" : "text-gray-500"}`}>Role</th>
              <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${isDark ? "text-gray-300" : "text-gray-500"}`}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody className={`divide-y ${isDark ? "bg-gray-800 divide-gray-700" : "bg-white divide-gray-200"}`}>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr key={`${user.username}-${user.email}`}>
                  <td className={`px-6 py-4 whitespace-nowrap ${isDark ? "text-gray-300" : "text-gray-800"}`}>
                    {user.first_name} {user.last_name}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap ${isDark ? "text-gray-300" : "text-gray-800"}`}>{user.username}</td>
                  <td className={`px-6 py-4 whitespace-nowrap ${isDark ? "text-gray-300" : "text-gray-800"}`}>{user.email}</td>
                  <td className={`px-6 py-4 whitespace-nowrap capitalize ${isDark ? "text-gray-300" : "text-gray-800"}`}>{user.role}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button onClick={() => handleDeleteClick(user)} className="text-red-600 hover:text-red-800">
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className={`px-6 py-4 text-center ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                  No users found matching your filters
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showCreateModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
          <div className={`relative top-1 mx-auto p-5 border w-96 shadow-lg rounded-md ${isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-300"}`}>
            <div className="flex justify-between items-center mb-4">
              <h3 className={`text-lg font-medium ${isDark ? "text-white" : "text-gray-800"}`}>Create New User</h3>
              <button onClick={() => setShowCreateModal(false)} className={`${isDark ? "text-gray-300" : "text-gray-500"} hover:text-gray-700`}>
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {["username", "email", "password", "password_confirm", "first_name", "last_name", "phone_number"].map(
                (field) => (
                  <div key={field}>
                    <label className={`block text-sm font-medium capitalize ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                      {field.replace("_", " ")}
                    </label>
                    <input
                      type={field.includes("password") ? "password" : field === "email" ? "email" : "text"}
                      name={field}
                      value={formData[field]}
                      onChange={handleChange}
                      required={field !== "phone_number"}
                      className={`mt-1 block w-full border rounded-md shadow-sm p-2 ${
                        isDark ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-800"
                      }`}
                    />
                  </div>
                )
              )}
              <div>
                <label className={`block text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}>Role</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className={`mt-1 block w-full border rounded-md shadow-sm p-2 ${
                    isDark ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-800"
                  }`}
                >
                  <option value="agent">Agent</option>
                  <option value="manager">Manager</option>
                </select>
              </div>
              <button type="submit" className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Create User
              </button>
            </form>
          </div>
        </div>
      )}

      {showDeleteModal && userToDelete && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
          <div className={`relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md ${isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-300"}`}>
            <div className="flex justify-between items-center mb-4">
              <h3 className={`text-lg font-medium ${isDark ? "text-white" : "text-gray-800"}`}>Delete User</h3>
              <button onClick={handleDeleteCancel} className={`${isDark ? "text-gray-300" : "text-gray-500"} hover:text-gray-700`}>
                ×
              </button>
            </div>
            <p className={`mb-4 ${isDark ? "text-gray-300" : "text-gray-800"}`}>
              Are you sure you want to delete{" "}
              <span className="font-semibold">
                {userToDelete.first_name} {userToDelete.last_name}
              </span>
              ? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={handleDeleteCancel}
                className={`px-4 py-2 rounded ${isDark ? "bg-gray-600 text-gray-300 hover:bg-gray-700" : "bg-gray-300 text-gray-700 hover:bg-gray-400"}`}
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Delete User
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default TeamManagement
