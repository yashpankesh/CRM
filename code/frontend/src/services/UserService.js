// src/services/UserService.js
// This is now a mock service that works with sample data instead of API calls

// Sample users data - this would normally come from an API
const sampleUsers = [
  { id: 1, name: "Alex Johnson", role: "Sales Manager", avatar: "/avatars/alex.jpg" },
  { id: 2, name: "Maria Rodriguez", role: "Sales Agent", avatar: "/avatars/maria.jpg" },
  { id: 3, name: "David Wilson", role: "Sales Agent", avatar: "/avatars/david.jpg" },
  { id: 4, name: "James Chen", role: "Sales Agent", avatar: "/avatars/james.jpg" },
  { id: 5, name: "Laura Miller", role: "Sales Agent", avatar: "/avatars/laura.jpg" },
]

const UserService = {
  // Get all users
  getUsers: async () => {
    // Simulate API delay
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(sampleUsers)
      }, 300)
    })
  },

  // Get a single user by ID
  getUser: async (id) => {
    // Simulate API delay
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = sampleUsers.find((user) => user.id === id)
        if (user) {
          resolve(user)
        } else {
          reject(new Error(`User with ID ${id} not found`))
        }
      }, 300)
    })
  },

  // Create a new user
  createUser: async (userData) => {
    // Simulate API delay
    return new Promise((resolve) => {
      setTimeout(() => {
        const newUser = {
          ...userData,
          id: Math.max(...sampleUsers.map((user) => user.id)) + 1,
        }
        sampleUsers.push(newUser)
        resolve(newUser)
      }, 500)
    })
  },

  // Update an existing user
  updateUser: async (id, userData) => {
    // Simulate API delay
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = sampleUsers.findIndex((user) => user.id === id)
        if (index !== -1) {
          sampleUsers[index] = { ...sampleUsers[index], ...userData }
          resolve(sampleUsers[index])
        } else {
          reject(new Error(`User with ID ${id} not found`))
        }
      }, 500)
    })
  },

  // Delete a user
  deleteUser: async (id) => {
    // Simulate API delay
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = sampleUsers.findIndex((user) => user.id === id)
        if (index !== -1) {
          const deletedUser = sampleUsers.splice(index, 1)[0]
          resolve(deletedUser)
        } else {
          reject(new Error(`User with ID ${id} not found`))
        }
      }, 500)
    })
  },
}

export default UserService
