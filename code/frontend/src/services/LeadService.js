// src/services/LeadService.js
// This is now a mock service that works with sample data instead of API calls

// Sample leads data - this would normally come from an API
const sampleLeads = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "+1234-567-8901",
    status: "New",
    source: "Website",
    interest: "Green Valley Homes",
    assignedTo: "Alex Johnson",
    assignedToId: 1,
    priority: "Medium",
    notes: "Interested in 3-bedroom properties",
    created: "2025-04-15T10:30:00",
    lastUpdated: "2025-04-15T10:30:00",
    lastActivity: "Added as new lead",
    tags: ["Residential", "First-time buyer"],
    company: "Tech Solutions Inc.",
    position: "Software Engineer",
    budget: "$500,000 - $700,000",
    timeline: "3-6 months",
    requirements: "3 bedrooms, 2 bathrooms, garage, near schools",
  },
  {
    id: 2,
    name: "Emily Johnson",
    email: "emily.j@example.com",
    phone: "+1345-678-9012",
    status: "Contacted",
    source: "WhatsApp",
    interest: "Urban Heights Tower",
    assignedTo: "Maria Rodriguez",
    assignedToId: 2,
    priority: "High",
    created: "2025-04-14T14:45:00",
    lastUpdated: "2025-04-15T09:15:00",
    lastActivity: "Scheduled call for tomorrow",
    tags: ["Commercial", "Investor"],
    company: "Johnson Investments",
    position: "Investment Manager",
    budget: "$1,000,000+",
    timeline: "1-3 months",
    requirements: "Office space, downtown location, modern amenities",
  },
  {
    id: 3,
    name: "Michael Rodriguez",
    email: "mrodriguez@example.com",
    phone: "+1456-789-0123",
    status: "Qualified",
    source: "Facebook",
    interest: "Lakeside Villas",
    assignedTo: "David Wilson",
    assignedToId: 3,
    priority: "Medium",
    created: "2025-04-13T11:20:00",
    lastUpdated: "2025-04-14T16:30:00",
    lastActivity: "Completed site visit",
    tags: ["Residential", "Vacation home"],
    budget: "$800,000 - $1,200,000",
    timeline: "6-12 months",
    requirements: "Waterfront property, 4+ bedrooms, pool",
  },
  {
    id: 4,
    name: "Sarah Thompson",
    email: "sthompson@example.com",
    phone: "+1567-890-1234",
    status: "Converted",
    source: "Referral",
    interest: "Sunset Apartments",
    assignedTo: "James Chen",
    assignedToId: 4,
    priority: "Low",
    created: "2025-04-12T09:00:00",
    lastUpdated: "2025-04-14T11:45:00",
    lastActivity: "Signed purchase agreement",
    tags: ["Residential", "Downsizing"],
    company: "Thompson Design",
    position: "Creative Director",
    budget: "$300,000 - $450,000",
    timeline: "Immediate",
    requirements: "2 bedrooms, modern design, close to downtown",
  },
  {
    id: 5,
    name: "David Wilson",
    email: "dwilson@example.com",
    phone: "+1678-901-2345",
    status: "Dropped",
    source: "Direct Call",
    interest: "Metro Business Park",
    assignedTo: "Laura Miller",
    assignedToId: 5,
    priority: "Low",
    created: "2025-04-11T15:10:00",
    lastUpdated: "2025-04-13T10:20:00",
    lastActivity: "Decided not to proceed",
    tags: ["Commercial", "Office space"],
    company: "Wilson Enterprises",
    position: "CEO",
    budget: "$2,000,000+",
    timeline: "3-6 months",
    requirements: "Large office complex, parking, conference facilities",
  },
]

const LeadService = {
  // Get leads with pagination and filters
  getLeads: async (params = {}) => {
    // Simulate API delay
    return new Promise((resolve) => {
      setTimeout(() => {
        let filteredLeads = [...sampleLeads]

        // Apply filters
        if (params.search) {
          const query = params.search.toLowerCase()
          filteredLeads = filteredLeads.filter(
            (lead) =>
              lead.name.toLowerCase().includes(query) ||
              lead.email.toLowerCase().includes(query) ||
              lead.phone.includes(query) ||
              (lead.company && lead.company.toLowerCase().includes(query)),
          )
        }

        if (params.status) {
          filteredLeads = filteredLeads.filter((lead) => lead.status === params.status)
        }

        if (params.source) {
          filteredLeads = filteredLeads.filter((lead) => lead.source === params.source)
        }

        if (params.assignee) {
          filteredLeads = filteredLeads.filter((lead) => lead.assignedToId.toString() === params.assignee)
        }

        // Calculate pagination
        const page = params.page || 1
        const pageSize = params.pageSize || 10
        const totalCount = filteredLeads.length
        const totalPages = Math.ceil(totalCount / pageSize)
        const startIndex = (page - 1) * pageSize
        const paginatedLeads = filteredLeads.slice(startIndex, startIndex + pageSize)

        resolve({
          data: paginatedLeads,
          totalCount,
          totalPages,
          currentPage: page,
        })
      }, 500)
    })
  },

  // Get a single lead by ID
  getLead: async (id) => {
    // Simulate API delay
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const lead = sampleLeads.find((lead) => lead.id === id)
        if (lead) {
          resolve(lead)
        } else {
          reject(new Error(`Lead with ID ${id} not found`))
        }
      }, 300)
    })
  },

  // Create a new lead
  createLead: async (leadData) => {
    // Simulate API delay
    return new Promise((resolve) => {
      setTimeout(() => {
        const newLead = {
          ...leadData,
          id: Math.max(...sampleLeads.map((lead) => lead.id)) + 1,
          created: new Date().toISOString(),
          lastUpdated: new Date().toISOString(),
          lastActivity: "Added as new lead",
        }
        sampleLeads.unshift(newLead)
        resolve(newLead)
      }, 500)
    })
  },

  // Update an existing lead
  updateLead: async (id, leadData) => {
    // Simulate API delay
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = sampleLeads.findIndex((lead) => lead.id === id)
        if (index !== -1) {
          sampleLeads[index] = {
            ...sampleLeads[index],
            ...leadData,
            lastUpdated: new Date().toISOString(),
          }
          resolve(sampleLeads[index])
        } else {
          reject(new Error(`Lead with ID ${id} not found`))
        }
      }, 500)
    })
  },

  // Delete a lead
  deleteLead: async (id) => {
    // Simulate API delay
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = sampleLeads.findIndex((lead) => lead.id === id)
        if (index !== -1) {
          const deletedLead = sampleLeads.splice(index, 1)[0]
          resolve(deletedLead)
        } else {
          reject(new Error(`Lead with ID ${id} not found`))
        }
      }, 500)
    })
  },

  // Import leads from CSV/Excel
  importLeads: async (formData) => {
    // Simulate API delay
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulate importing leads
        const importedLeads = [
          {
            id: Math.max(...sampleLeads.map((lead) => lead.id)) + 1,
            name: "Imported Lead 1",
            email: "imported1@example.com",
            phone: "+1987-654-3210",
            status: "New",
            source: "Import",
            interest: "Royal Gardens",
            assignedTo: "Alex Johnson",
            assignedToId: 1,
            priority: "Medium",
            created: new Date().toISOString(),
            lastUpdated: new Date().toISOString(),
            lastActivity: "Imported lead",
          },
          {
            id: Math.max(...sampleLeads.map((lead) => lead.id)) + 2,
            name: "Imported Lead 2",
            email: "imported2@example.com",
            phone: "+1876-543-2109",
            status: "New",
            source: "Import",
            interest: "City Center Plaza",
            assignedTo: "Maria Rodriguez",
            assignedToId: 2,
            priority: "Low",
            created: new Date().toISOString(),
            lastUpdated: new Date().toISOString(),
            lastActivity: "Imported lead",
          },
        ]

        sampleLeads.unshift(...importedLeads)
        resolve({ success: true, count: importedLeads.length })
      }, 1000)
    })
  },

  // Export leads to CSV
  exportLeads: async (filters = {}) => {
    // Simulate API delay
    return new Promise((resolve) => {
      setTimeout(() => {
        // In a real implementation, this would generate a CSV file
        // Here we just return a mock Blob
        const csvContent =
          "id,name,email,phone,status,source\n" +
          "1,John Smith,john.smith@example.com,+1234-567-8901,New,Website\n" +
          "2,Emily Johnson,emily.j@example.com,+1345-678-9012,Contacted,WhatsApp"

        const blob = new Blob([csvContent], { type: "text/csv" })
        resolve(blob)
      }, 1000)
    })
  },
}

export default LeadService
