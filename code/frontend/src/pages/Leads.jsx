"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useTheme } from "../context/ThemeContext"
import { useAuth } from "../context/AuthContext"
import {
  Search,
  Plus,
  FileUp,
  Edit,
  Trash2,
  UserPlus,
  RefreshCw,
  Download,
  Globe,
  Phone,
  Facebook,
  MessageCircle,
  Users,
  ChevronLeft,
  ChevronRight,
  Mail,
  Briefcase,
  Clock,
  DollarSign,
  Target,
  FileText,
  Tag,
  Save,
  X,
  AlertCircle,
  CheckCircle2,
} from "lucide-react"
import { toast } from "react-toastify"
import Spinner from "../components/common/Spinner"

// ===== useUserRole Hook =====
function useUserRole() {
  const rolePermissions = {
    admin: [
      "create_leads",
      "edit_leads",
      "delete_leads",
      "view_all_leads",
      "import_leads",
      "export_leads",
      "assign_leads",
      "create_users", // Only admin can create users
    ],
    manager: ["create_leads", "edit_leads", "view_all_leads", "import_leads", "export_leads", "assign_leads"],
    agent: ["create_leads", "edit_leads", "view_all_leads"],
    viewer: ["view_all_leads"],
  }

  // In a real app, this would come from your auth context or API
  const [userRole, setUserRole] = useState("admin")

  const hasPermission = (permission) => {
    return rolePermissions[userRole].includes(permission)
  }

  // For demo purposes, allow changing the role
  const changeRole = (role) => {
    setUserRole(role)
  }

  return {
    userRole,
    hasPermission,
    changeRole,
  }
}

// ===== AddLeadDialog Component =====
function AddLeadDialog({ isOpen, onClose, onSubmit, users }) {
  const { theme } = useTheme()
  const isDark = theme === "dark"
  const [activeTab, setActiveTab] = useState("basic")

  const [formData, setFormData] = useState({
    // Basic Information
    name: "",
    email: "",
    phone: "",
    company: "",
    position: "",

    // Lead Details
    status: "New",
    source: "Website",
    interest: "",
    priority: "Medium",
    assignedToId: users[0]?.id || 1,

    // Additional Information
    budget: "",
    timeline: "",
    requirements: "",
    notes: "",
    tags: [],
  })

  const [tagInput, setTagInput] = useState("")

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddTag = (e) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault()
      if (!formData.tags.includes(tagInput.trim())) {
        setFormData((prev) => ({
          ...prev,
          tags: [...prev.tags, tagInput.trim()],
        }))
      }
      setTagInput("")
    }
  }

  const handleRemoveTag = (tagToRemove) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Find the assigned user's name and avatar
    const assignedUser = users.find((user) => user.id === formData.assignedToId)

    onSubmit({
      ...formData,
      assignedTo: assignedUser?.name || "Unassigned",
      assignedToAvatar: assignedUser?.avatar,
    })

    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
      position: "",
      status: "New",
      source: "Website",
      interest: "",
      priority: "Medium",
      assignedToId: users[0]?.id || 1,
      budget: "",
      timeline: "",
      requirements: "",
      notes: "",
      tags: [],
    })
    setActiveTab("basic")
  }

  const isFormValid = () => {
    return formData.name.trim() !== "" && formData.email.trim() !== "" && formData.phone.trim() !== ""
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        className={`${isDark ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"} rounded-lg shadow-lg w-full max-w-[600px] max-h-[90vh] overflow-y-auto`}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Add New Lead</h2>
            <button
              onClick={onClose}
              className={`${isDark ? "text-gray-400 hover:text-gray-300" : "text-gray-500 hover:text-gray-700"}`}
            >
              <X size={24} />
            </button>
          </div>
          <p className={`${isDark ? "text-gray-400" : "text-gray-500"} mb-6`}>
            Enter the lead's information to add them to your system.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <div className={`flex border-b ${isDark ? "border-gray-700" : "border-gray-200"}`}>
                <button
                  type="button"
                  className={`px-4 py-2 ${activeTab === "basic" ? `border-b-2 ${isDark ? "border-blue-500" : "border-blue-600"} font-medium` : ""}`}
                  onClick={() => setActiveTab("basic")}
                >
                  Basic Info
                </button>
                <button
                  type="button"
                  className={`px-4 py-2 ${activeTab === "details" ? `border-b-2 ${isDark ? "border-blue-500" : "border-blue-600"} font-medium` : ""}`}
                  onClick={() => setActiveTab("details")}
                >
                  Lead Details
                </button>
                <button
                  type="button"
                  className={`px-4 py-2 ${activeTab === "additional" ? `border-b-2 ${isDark ? "border-blue-500" : "border-blue-600"} font-medium` : ""}`}
                  onClick={() => setActiveTab("additional")}
                >
                  Additional Info
                </button>
              </div>
            </div>

            {activeTab === "basic" && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className={`block text-sm font-medium ${isDark ? "text-gray-200" : "text-gray-700"}`}
                  >
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    placeholder="John Smith"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className={`w-full p-2 border rounded-md ${isDark ? "bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400" : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"}`}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className={`block text-sm font-medium ${isDark ? "text-gray-200" : "text-gray-700"}`}
                    >
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className={`w-full p-2 border rounded-md ${isDark ? "bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400" : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"}`}
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="phone"
                      className={`block text-sm font-medium ${isDark ? "text-gray-200" : "text-gray-700"}`}
                    >
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      placeholder="+1234567890"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className={`w-full p-2 border rounded-md ${isDark ? "bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400" : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"}`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label
                      htmlFor="company"
                      className={`block text-sm font-medium ${isDark ? "text-gray-200" : "text-gray-700"}`}
                    >
                      Company
                    </label>
                    <input
                      id="company"
                      name="company"
                      placeholder="Company Name"
                      value={formData.company}
                      onChange={handleChange}
                      className={`w-full p-2 border rounded-md ${isDark ? "bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400" : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"}`}
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="position"
                      className={`block text-sm font-medium ${isDark ? "text-gray-200" : "text-gray-700"}`}
                    >
                      Position
                    </label>
                    <input
                      id="position"
                      name="position"
                      placeholder="Job Title"
                      value={formData.position}
                      onChange={handleChange}
                      className={`w-full p-2 border rounded-md ${isDark ? "bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400" : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"}`}
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => setActiveTab("details")}
                    className={`px-4 py-2 ${isDark ? "bg-blue-700 hover:bg-blue-800" : "bg-blue-600 hover:bg-blue-700"} text-white rounded-md`}
                  >
                    Next: Lead Details
                  </button>
                </div>
              </div>
            )}

            {activeTab === "details" && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label
                      htmlFor="status"
                      className={`block text-sm font-medium ${isDark ? "text-gray-200" : "text-gray-700"}`}
                    >
                      Status
                    </label>
                    <select
                      id="status"
                      value={formData.status}
                      onChange={(e) => handleSelectChange("status", e.target.value)}
                      className={`w-full p-2 border rounded-md ${isDark ? "bg-gray-700 border-gray-600 text-gray-100" : "bg-white border-gray-300 text-gray-900"}`}
                    >
                      <option value="New">New</option>
                      <option value="Contacted">Contacted</option>
                      <option value="Qualified">Qualified</option>
                      <option value="Proposal">Proposal</option>
                      <option value="Negotiation">Negotiation</option>
                      <option value="Converted">Converted</option>
                      <option value="Dropped">Dropped</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="priority"
                      className={`block text-sm font-medium ${isDark ? "text-gray-200" : "text-gray-700"}`}
                    >
                      Priority
                    </label>
                    <select
                      id="priority"
                      value={formData.priority}
                      onChange={(e) => handleSelectChange("priority", e.target.value)}
                      className={`w-full p-2 border rounded-md ${isDark ? "bg-gray-700 border-gray-600 text-gray-100" : "bg-white border-gray-300 text-gray-900"}`}
                    >
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                      <option value="Urgent">Urgent</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label
                      htmlFor="source"
                      className={`block text-sm font-medium ${isDark ? "text-gray-200" : "text-gray-700"}`}
                    >
                      Lead Source
                    </label>
                    <select
                      id="source"
                      value={formData.source}
                      onChange={(e) => handleSelectChange("source", e.target.value)}
                      className={`w-full p-2 border rounded-md ${isDark ? "bg-gray-700 border-gray-600 text-gray-100" : "bg-white border-gray-300 text-gray-900"}`}
                    >
                      <option value="Website">Website</option>
                      <option value="WhatsApp">WhatsApp</option>
                      <option value="Facebook">Facebook</option>
                      <option value="Referral">Referral</option>
                      <option value="Direct Call">Direct Call</option>
                      <option value="Email">Email</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="interest"
                      className={`block text-sm font-medium ${isDark ? "text-gray-200" : "text-gray-700"}`}
                    >
                      Interest
                    </label>
                    <input
                      id="interest"
                      name="interest"
                      placeholder="Property or service of interest"
                      value={formData.interest}
                      onChange={handleChange}
                      className={`w-full p-2 border rounded-md ${isDark ? "bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400" : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"}`}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="assignedTo"
                    className={`block text-sm font-medium ${isDark ? "text-gray-200" : "text-gray-700"}`}
                  >
                    Assign To
                  </label>
                  <select
                    id="assignedTo"
                    value={formData.assignedToId.toString()}
                    onChange={(e) => handleSelectChange("assignedToId", Number.parseInt(e.target.value, 10))}
                    className={`w-full p-2 border rounded-md ${isDark ? "bg-gray-700 border-gray-600 text-gray-100" : "bg-white border-gray-300 text-gray-900"}`}
                  >
                    {users.map((user) => (
                      <option key={user.id} value={user.id.toString()}>
                        {user.name} ({user.role})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={() => setActiveTab("basic")}
                    className={`px-4 py-2 border rounded-md ${isDark ? "border-gray-600 text-gray-300 hover:bg-gray-700" : "border-gray-300 text-gray-700 hover:bg-gray-100"}`}
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("additional")}
                    className={`px-4 py-2 ${isDark ? "bg-blue-700 hover:bg-blue-800" : "bg-blue-600 hover:bg-blue-700"} text-white rounded-md`}
                  >
                    Next: Additional Info
                  </button>
                </div>
              </div>
            )}

            {activeTab === "additional" && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label
                      htmlFor="budget"
                      className={`block text-sm font-medium ${isDark ? "text-gray-200" : "text-gray-700"}`}
                    >
                      Budget
                    </label>
                    <input
                      id="budget"
                      name="budget"
                      placeholder="e.g. $500,000 - $700,000"
                      value={formData.budget}
                      onChange={handleChange}
                      className={`w-full p-2 border rounded-md ${isDark ? "bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400" : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"}`}
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="timeline"
                      className={`block text-sm font-medium ${isDark ? "text-gray-200" : "text-gray-700"}`}
                    >
                      Timeline
                    </label>
                    <input
                      id="timeline"
                      name="timeline"
                      placeholder="e.g. 3-6 months"
                      value={formData.timeline}
                      onChange={handleChange}
                      className={`w-full p-2 border rounded-md ${isDark ? "bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400" : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"}`}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="requirements"
                    className={`block text-sm font-medium ${isDark ? "text-gray-200" : "text-gray-700"}`}
                  >
                    Requirements
                  </label>
                  <textarea
                    id="requirements"
                    name="requirements"
                    placeholder="Specific requirements or preferences"
                    value={formData.requirements}
                    onChange={handleChange}
                    rows={3}
                    className={`w-full p-2 border rounded-md ${isDark ? "bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400" : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"}`}
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="notes"
                    className={`block text-sm font-medium ${isDark ? "text-gray-200" : "text-gray-700"}`}
                  >
                    Notes
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    placeholder="Additional notes about this lead"
                    value={formData.notes}
                    onChange={handleChange}
                    rows={3}
                    className={`w-full p-2 border rounded-md ${isDark ? "bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400" : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"}`}
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="tags"
                    className={`block text-sm font-medium ${isDark ? "text-gray-200" : "text-gray-700"}`}
                  >
                    Tags
                  </label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {formData.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`px-2 py-1 rounded-full text-sm flex items-center gap-1 ${isDark ? "bg-gray-700 text-gray-200" : "bg-gray-200 text-gray-800"}`}
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => handleRemoveTag(tag)}
                          className={`ml-1 rounded-full ${isDark ? "hover:bg-gray-600" : "hover:bg-gray-300"} p-1`}
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                  <input
                    id="tags"
                    placeholder="Type a tag and press Enter"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={handleAddTag}
                    className={`w-full p-2 border rounded-md ${isDark ? "bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400" : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"}`}
                  />
                  <p className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"} mt-1`}>
                    Press Enter to add a tag
                  </p>
                </div>

                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={() => setActiveTab("details")}
                    className={`px-4 py-2 border rounded-md ${isDark ? "border-gray-600 text-gray-300 hover:bg-gray-700" : "border-gray-300 text-gray-700 hover:bg-gray-100"}`}
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={!isFormValid()}
                    className={`px-4 py-2 ${isDark ? "bg-blue-700 hover:bg-blue-800" : "bg-blue-600 hover:bg-blue-700"} text-white rounded-md ${
                      !isFormValid() ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    Create Lead
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}

// ===== ImportLeadsDialog Component =====
function ImportLeadsDialog({ isOpen, onClose, onImport }) {
  const { theme } = useTheme()
  const isDark = theme === "dark"
  const [file, setFile] = useState(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [error, setError] = useState(null)
  const [previewData, setPreviewData] = useState(null)

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0]
    if (!selectedFile) return

    setFile(selectedFile)
    setError(null)

    // Validate file type
    const validTypes = [
      "text/csv",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.ms-excel",
    ]
    if (!validTypes.includes(selectedFile.type)) {
      setError("Please upload a CSV or Excel file")
      return
    }

    // Simulate file parsing and preview
    setIsUploading(true)

    // Simulate progress
    let progress = 0
    const interval = setInterval(() => {
      progress += 10
      setUploadProgress(progress)

      if (progress >= 100) {
        clearInterval(interval)
        setIsUploading(false)

        // Generate sample preview data
        const sampleData = [
          {
            name: "John Smith",
            email: "john.smith@example.com",
            phone: "+1234-567-8901",
            status: "New",
            source: "Website",
            interest: "Green Valley Homes",
            priority: "Medium",
          },
          {
            name: "Emily Johnson",
            email: "emily.j@example.com",
            phone: "+1345-678-9012",
            status: "New",
            source: "WhatsApp",
            interest: "Urban Heights Tower",
            priority: "High",
          },
        ]

        setPreviewData(sampleData)
      }
    }, 200)

    return () => clearInterval(interval)
  }

  const handleImport = () => {
    if (!previewData) return

    onImport(previewData)

    // Reset state
    setFile(null)
    setPreviewData(null)
    setUploadProgress(0)
  }

  const handleDownloadTemplate = () => {
    // In a real implementation, this would generate and download a CSV template
    alert("This would download a CSV template in a real implementation")
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        className={`${isDark ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"} rounded-lg shadow-lg w-full max-w-[600px]`}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Import Leads</h2>
            <button
              onClick={onClose}
              className={`${isDark ? "text-gray-400 hover:text-gray-300" : "text-gray-500 hover:text-gray-700"}`}
            >
              <X size={24} />
            </button>
          </div>
          <p className={`${isDark ? "text-gray-400" : "text-gray-500"} mb-6`}>
            Upload a CSV or Excel file to import multiple leads at once.
          </p>

          <div className="space-y-4">
            {error && (
              <div
                className={`${isDark ? "bg-red-900/30 border-red-800 text-red-300" : "bg-red-100 border-red-400 text-red-700"} border px-4 py-3 rounded relative`}
              >
                <div className="flex items-center">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  <span className="font-bold">Error</span>
                </div>
                <p>{error}</p>
              </div>
            )}

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label
                  htmlFor="file-upload"
                  className={`block text-sm font-medium ${isDark ? "text-gray-200" : "text-gray-700"}`}
                >
                  Upload File
                </label>
                <button
                  onClick={handleDownloadTemplate}
                  className={`text-sm px-2 py-1 border rounded-md flex items-center gap-1 ${isDark ? "border-gray-600 text-gray-300 hover:bg-gray-700" : "border-gray-300 text-gray-700 hover:bg-gray-100"}`}
                >
                  <Download className="h-3 w-3" />
                  Download Template
                </button>
              </div>

              <div
                className={`border-2 border-dashed rounded-lg p-6 text-center ${isDark ? "border-gray-600" : "border-gray-300"}`}
              >
                {!file ? (
                  <div className="space-y-2">
                    <div className="flex justify-center">
                      <FileUp className={`h-8 w-8 ${isDark ? "text-gray-500" : "text-gray-400"}`} />
                    </div>
                    <div>
                      <p className={`text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                        Drag and drop your file here or click to browse
                      </p>
                      <p className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"} mt-1`}>
                        Supports CSV and Excel files
                      </p>
                    </div>
                    <input
                      id="file-upload"
                      type="file"
                      accept=".csv, .xlsx, .xls"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => document.getElementById("file-upload")?.click()}
                      className={`px-4 py-2 border rounded-md ${isDark ? "border-gray-600 text-gray-300 hover:bg-gray-700" : "border-gray-300 text-gray-700 hover:bg-gray-100"}`}
                    >
                      Select File
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <FileUp className="h-5 w-5 text-blue-500" />
                      <div className="flex-1 text-left">
                        <p className={`text-sm font-medium truncate ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                          {file.name}
                        </p>
                        <p className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                          {(file.size / 1024).toFixed(2)} KB
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setFile(null)
                          setPreviewData(null)
                          setUploadProgress(0)
                        }}
                        className={`text-sm ${isDark ? "text-gray-400 hover:text-gray-300" : "text-gray-500 hover:text-gray-700"}`}
                      >
                        Remove
                      </button>
                    </div>

                    {isUploading && (
                      <div className="space-y-2">
                        <div className={`w-full ${isDark ? "bg-gray-700" : "bg-gray-200"} rounded-full h-2.5`}>
                          <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${uploadProgress}%` }}></div>
                        </div>
                        <p className={`text-xs text-center ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                          Processing file... {uploadProgress}%
                        </p>
                      </div>
                    )}

                    {previewData && (
                      <div
                        className={`${isDark ? "bg-green-900/30 border-green-800 text-green-300" : "bg-green-100 border-green-400 text-green-700"} border px-4 py-3 rounded relative`}
                      >
                        <div className="flex items-center">
                          <CheckCircle2 className={`h-4 w-4 ${isDark ? "text-green-400" : "text-green-500"} mr-2`} />
                          <span className="font-bold">File Processed Successfully</span>
                        </div>
                        <p>Found {previewData.length} leads ready to import.</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {previewData && (
              <div className="space-y-2">
                <label className={`block text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                  Preview (First 2 Leads)
                </label>
                <div className={`border rounded-lg overflow-hidden ${isDark ? "border-gray-600" : "border-gray-300"}`}>
                  <table className="w-full text-sm">
                    <thead className={`${isDark ? "bg-gray-700" : "bg-gray-100"}`}>
                      <tr>
                        <th className={`px-4 py-2 text-left font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                          Name
                        </th>
                        <th className={`px-4 py-2 text-left font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                          Email
                        </th>
                        <th className={`px-4 py-2 text-left font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                          Phone
                        </th>
                        <th className={`px-4 py-2 text-left font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {previewData.slice(0, 2).map((lead, index) => (
                        <tr key={index} className={`border-t ${isDark ? "border-gray-600" : "border-gray-200"}`}>
                          <td className={`px-4 py-2 ${isDark ? "text-gray-300" : "text-gray-800"}`}>{lead.name}</td>
                          <td className={`px-4 py-2 ${isDark ? "text-gray-300" : "text-gray-800"}`}>{lead.email}</td>
                          <td className={`px-4 py-2 ${isDark ? "text-gray-300" : "text-gray-800"}`}>{lead.phone}</td>
                          <td className={`px-4 py-2 ${isDark ? "text-gray-300" : "text-gray-800"}`}>{lead.status}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <button
              onClick={onClose}
              className={`px-4 py-2 border rounded-md ${isDark ? "border-gray-600 text-gray-300 hover:bg-gray-700" : "border-gray-300 text-gray-700 hover:bg-gray-100"}`}
            >
              Cancel
            </button>
            <button
              onClick={handleImport}
              disabled={!previewData || isUploading}
              className={`px-4 py-2 ${isDark ? "bg-blue-700 hover:bg-blue-800" : "bg-blue-600 hover:bg-blue-700"} text-white rounded-md ${
                !previewData || isUploading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Import {previewData ? `${previewData.length} Leads` : ""}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ===== LeadDetailsDialog Component =====
function LeadDetailsDialog({ isOpen, onClose, lead, onUpdate, onDelete, users, canEdit, canDelete }) {
  const { theme } = useTheme()
  const isDark = theme === "dark"
  const [isEditing, setIsEditing] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")

  const [formData, setFormData] = useState({ ...lead })
  const [tagInput, setTagInput] = useState("")

  // Format date for display
  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      })
    } catch (error) {
      return dateString
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddTag = (e) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault()
      if (!formData.tags?.includes(tagInput.trim())) {
        setFormData((prev) => ({
          ...prev,
          tags: [...(prev.tags || []), tagInput.trim()],
        }))
      }
      setTagInput("")
    }
  }

  const handleRemoveTag = (tagToRemove) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags?.filter((tag) => tag !== tagToRemove) || [],
    }))
  }

  const handleSave = () => {
    // Find the assigned user's name and avatar
    const assignedUser = users.find((user) => user.id === formData.assignedToId)

    onUpdate({
      ...formData,
      assignedTo: assignedUser?.name || "Unassigned",
      assignedToAvatar: assignedUser?.avatar,
    })

    setIsEditing(false)
  }

  const handleDelete = () => {
    onDelete(lead.id)
    setIsDeleteDialogOpen(false)
    onClose()
  }

  // Get status badge styling
  const getStatusBadge = (status) => {
    const statusClasses = {
      New: isDark ? "bg-blue-900/30 text-blue-300" : "bg-blue-100 text-blue-800",
      Contacted: isDark ? "bg-purple-900/30 text-purple-300" : "bg-purple-100 text-purple-800",
      Qualified: isDark ? "bg-emerald-900/30 text-emerald-300" : "bg-emerald-100 text-emerald-800",
      Proposal: isDark ? "bg-amber-900/30 text-amber-300" : "bg-amber-100 text-amber-800",
      Negotiation: isDark ? "bg-orange-900/30 text-orange-300" : "bg-orange-100 text-orange-800",
      Converted: isDark ? "bg-green-900/30 text-green-300" : "bg-green-100 text-green-800",
      Dropped: isDark ? "bg-red-900/30 text-red-300" : "bg-red-100 text-red-800",
    }

    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${statusClasses[status] || (isDark ? "bg-gray-800 text-gray-300" : "bg-gray-100 text-gray-800")}`}
      >
        {status}
      </span>
    )
  }

  // Get priority badge styling
  const getPriorityBadge = (priority) => {
    const priorityClasses = {
      Low: isDark ? "border-gray-600 text-gray-400" : "border-gray-300 text-gray-600",
      Medium: isDark ? "border-blue-700 text-blue-400" : "border-blue-300 text-blue-600",
      High: isDark ? "border-amber-700 text-amber-400" : "border-amber-300 text-amber-600",
      Urgent: isDark ? "border-red-700 text-red-400" : "border-red-300 text-red-600",
    }

    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium border ${priorityClasses[priority] || (isDark ? "border-gray-600 text-gray-400" : "border-gray-300 text-gray-600")}`}
      >
        {priority}
      </span>
    )
  }

  if (!isOpen) return null

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div
          className={`${isDark ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"} rounded-lg shadow-lg w-full max-w-[700px] max-h-[90vh] overflow-y-auto`}
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Lead Details</h2>
              <div className="flex items-center gap-2">
                {canEdit && !isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className={`flex items-center gap-1 px-3 py-1 border rounded-md text-sm ${isDark ? "border-gray-600 text-gray-300 hover:bg-gray-700" : "border-gray-300 text-gray-700 hover:bg-gray-100"}`}
                  >
                    <Edit className="h-4 w-4" />
                    Edit
                  </button>
                )}

                {isEditing && (
                  <>
                    <button
                      onClick={() => {
                        setFormData({ ...lead })
                        setIsEditing(false)
                      }}
                      className={`flex items-center gap-1 px-3 py-1 border rounded-md text-sm ${isDark ? "border-gray-600 text-gray-300 hover:bg-gray-700" : "border-gray-300 text-gray-700 hover:bg-gray-100"}`}
                    >
                      <X className="h-4 w-4" />
                      Cancel
                    </button>

                    <button
                      onClick={handleSave}
                      className={`flex items-center gap-1 px-3 py-1 ${isDark ? "bg-blue-700 hover:bg-blue-800" : "bg-blue-600 hover:bg-blue-700"} text-white rounded-md text-sm`}
                    >
                      <Save className="h-4 w-4" />
                      Save
                    </button>
                  </>
                )}

                {canDelete && !isEditing && (
                  <button
                    onClick={() => setIsDeleteDialogOpen(true)}
                    className={`flex items-center gap-1 px-3 py-1 ${isDark ? "bg-red-700 hover:bg-red-800" : "bg-red-600 hover:bg-red-700"} text-white rounded-md text-sm`}
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </button>
                )}

                <button
                  onClick={onClose}
                  className={`${isDark ? "text-gray-400 hover:text-gray-300" : "text-gray-500 hover:text-gray-700"}`}
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            <div className="mb-6">
              <div className={`flex border-b ${isDark ? "border-gray-700" : "border-gray-200"}`}>
                <button
                  type="button"
                  className={`px-4 py-2 ${activeTab === "overview" ? `border-b-2 ${isDark ? "border-blue-500" : "border-blue-600"} font-medium` : ""}`}
                  onClick={() => setActiveTab("overview")}
                >
                  Overview
                </button>
                <button
                  type="button"
                  className={`px-4 py-2 ${activeTab === "details" ? `border-b-2 ${isDark ? "border-blue-500" : "border-blue-600"} font-medium` : ""}`}
                  onClick={() => setActiveTab("details")}
                >
                  Details
                </button>
                <button
                  type="button"
                  className={`px-4 py-2 ${activeTab === "notes" ? `border-b-2 ${isDark ? "border-blue-500" : "border-blue-600"} font-medium` : ""}`}
                  onClick={() => setActiveTab("notes")}
                >
                  Notes & Tags
                </button>
              </div>
            </div>

            {activeTab === "overview" && (
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/3 space-y-4">
                  <div
                    className={`flex flex-col items-center p-4 border rounded-lg ${isDark ? "border-gray-600" : "border-gray-300"}`}
                  >
                    <div
                      className={`w-20 h-20 ${isDark ? "bg-gray-700 text-gray-200" : "bg-gray-200 text-gray-800"} rounded-full flex items-center justify-center text-2xl font-bold mb-2`}
                    >
                      {formData.name.charAt(0)}
                    </div>

                    {isEditing ? (
                      <input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`text-center font-semibold border rounded-md p-1 w-full ${isDark ? "bg-gray-700 border-gray-600 text-gray-100" : "bg-white border-gray-300 text-gray-900"}`}
                      />
                    ) : (
                      <h2 className="text-xl font-semibold text-center">{formData.name}</h2>
                    )}

                    {formData.company && !isEditing && (
                      <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"} text-center`}>
                        {formData.company}
                      </p>
                    )}

                    {isEditing && (
                      <input
                        name="company"
                        value={formData.company || ""}
                        onChange={handleChange}
                        placeholder="Company"
                        className={`text-center mt-2 border rounded-md p-1 w-full ${isDark ? "bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400" : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"}`}
                      />
                    )}

                    <div className="flex items-center gap-2 mt-4">
                      {getStatusBadge(formData.status)}
                      {getPriorityBadge(formData.priority)}
                    </div>
                  </div>

                  <div className={`border rounded-lg p-4 space-y-3 ${isDark ? "border-gray-600" : "border-gray-300"}`}>
                    <h3 className={`font-medium ${isDark ? "text-gray-200" : "text-gray-800"}`}>Contact Information</h3>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Mail className={`h-4 w-4 ${isDark ? "text-gray-500" : "text-gray-400"}`} />
                        {isEditing ? (
                          <input
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            type="email"
                            className={`border rounded-md p-1 w-full ${isDark ? "bg-gray-700 border-gray-600 text-gray-100" : "bg-white border-gray-300 text-gray-900"}`}
                          />
                        ) : (
                          <span className={`text-sm ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                            {formData.email}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <Phone className={`h-4 w-4 ${isDark ? "text-gray-500" : "text-gray-400"}`} />
                        {isEditing ? (
                          <input
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className={`border rounded-md p-1 w-full ${isDark ? "bg-gray-700 border-gray-600 text-gray-100" : "bg-white border-gray-300 text-gray-900"}`}
                          />
                        ) : (
                          <span className={`text-sm ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                            {formData.phone}
                          </span>
                        )}
                      </div>

                      {(formData.position || isEditing) && (
                        <div className="flex items-center gap-2">
                          <Briefcase className={`h-4 w-4 ${isDark ? "text-gray-500" : "text-gray-400"}`} />
                          {isEditing ? (
                            <input
                              name="position"
                              value={formData.position || ""}
                              onChange={handleChange}
                              placeholder="Position"
                              className={`border rounded-md p-1 w-full ${isDark ? "bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400" : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"}`}
                            />
                          ) : (
                            <span className={`text-sm ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                              {formData.position}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="md:w-2/3 space-y-4">
                  <div className={`border rounded-lg p-4 space-y-3 ${isDark ? "border-gray-600" : "border-gray-300"}`}>
                    <h3 className={`font-medium ${isDark ? "text-gray-200" : "text-gray-800"}`}>Lead Information</h3>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>Status</p>
                        {isEditing ? (
                          <select
                            value={formData.status}
                            onChange={(e) => handleSelectChange("status", e.target.value)}
                            className={`w-full p-2 border rounded-md ${isDark ? "bg-gray-700 border-gray-600 text-gray-100" : "bg-white border-gray-300 text-gray-900"}`}
                          >
                            <option value="New">New</option>
                            <option value="Contacted">Contacted</option>
                            <option value="Qualified">Qualified</option>
                            <option value="Proposal">Proposal</option>
                            <option value="Negotiation">Negotiation</option>
                            <option value="Converted">Converted</option>
                            <option value="Dropped">Dropped</option>
                          </select>
                        ) : (
                          <p className="font-medium">{getStatusBadge(formData.status)}</p>
                        )}
                      </div>

                      <div>
                        <p className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>Priority</p>
                        {isEditing ? (
                          <select
                            value={formData.priority}
                            onChange={(e) => handleSelectChange("priority", e.target.value)}
                            className={`w-full p-2 border rounded-md ${isDark ? "bg-gray-700 border-gray-600 text-gray-100" : "bg-white border-gray-300 text-gray-900"}`}
                          >
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                            <option value="Urgent">Urgent</option>
                          </select>
                        ) : (
                          <p className="font-medium">{getPriorityBadge(formData.priority)}</p>
                        )}
                      </div>

                      <div>
                        <p className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>Source</p>
                        {isEditing ? (
                          <select
                            value={formData.source}
                            onChange={(e) => handleSelectChange("source", e.target.value)}
                            className={`w-full p-2 border rounded-md ${isDark ? "bg-gray-700 border-gray-600 text-gray-100" : "bg-white border-gray-300 text-gray-900"}`}
                          >
                            <option value="Website">Website</option>
                            <option value="WhatsApp">WhatsApp</option>
                            <option value="Facebook">Facebook</option>
                            <option value="Referral">Referral</option>
                            <option value="Direct Call">Direct Call</option>
                            <option value="Email">Email</option>
                            <option value="Other">Other</option>
                          </select>
                        ) : (
                          <p className={`font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                            {formData.source}
                          </p>
                        )}
                      </div>

                      <div>
                        <p className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>Interest</p>
                        {isEditing ? (
                          <input
                            name="interest"
                            value={formData.interest}
                            onChange={handleChange}
                            className={`w-full p-2 border rounded-md ${isDark ? "bg-gray-700 border-gray-600 text-gray-100" : "bg-white border-gray-300 text-gray-900"}`}
                          />
                        ) : (
                          <p className={`font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                            {formData.interest}
                          </p>
                        )}
                      </div>

                      <div>
                        <p className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>Assigned To</p>
                        {isEditing ? (
                          <select
                            value={formData.assignedToId.toString()}
                            onChange={(e) => handleSelectChange("assignedToId", Number.parseInt(e.target.value, 10))}
                            className={`w-full p-2 border rounded-md ${isDark ? "bg-gray-700 border-gray-600 text-gray-100" : "bg-white border-gray-300 text-gray-900"}`}
                          >
                            {users.map((user) => (
                              <option key={user.id} value={user.id.toString()}>
                                {user.name}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <div className="flex items-center gap-2">
                            <div
                              className={`w-6 h-6 ${isDark ? "bg-gray-700 text-gray-200" : "bg-gray-200 text-gray-800"} rounded-full flex items-center justify-center text-xs font-bold`}
                            >
                              {formData.assignedTo.charAt(0)}
                            </div>
                            <span className={`font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                              {formData.assignedTo}
                            </span>
                          </div>
                        )}
                      </div>

                      <div>
                        <p className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>Created</p>
                        <p className={`font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                          {formatDate(formData.created)}
                        </p>
                      </div>

                      <div>
                        <p className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>Last Updated</p>
                        <p className={`font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                          {formatDate(formData.lastUpdated)}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className={`border rounded-lg p-4 space-y-3 ${isDark ? "border-gray-600" : "border-gray-300"}`}>
                    <h3 className={`font-medium ${isDark ? "text-gray-200" : "text-gray-800"}`}>Last Activity</h3>
                    <p className={`text-sm ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                      {formData.lastActivity || "No activity recorded"}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "details" && (
              <div className="space-y-6">
                <div className={`border rounded-lg p-4 space-y-4 ${isDark ? "border-gray-600" : "border-gray-300"}`}>
                  <h3 className={`font-medium ${isDark ? "text-gray-200" : "text-gray-800"}`}>Budget & Timeline</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="budget"
                        className={`block text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}
                      >
                        Budget
                      </label>
                      {isEditing ? (
                        <input
                          id="budget"
                          name="budget"
                          value={formData.budget || ""}
                          onChange={handleChange}
                          placeholder="e.g. $500,000 - $700,000"
                          className={`w-full p-2 border rounded-md ${isDark ? "bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400" : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"}`}
                        />
                      ) : (
                        <div className="flex items-center gap-2 mt-1">
                          <DollarSign className={`h-4 w-4 ${isDark ? "text-gray-500" : "text-gray-400"}`} />
                          <span className={`${isDark ? "text-gray-300" : "text-gray-700"}`}>
                            {formData.budget || "Not specified"}
                          </span>
                        </div>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="timeline"
                        className={`block text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}
                      >
                        Timeline
                      </label>
                      {isEditing ? (
                        <input
                          id="timeline"
                          name="timeline"
                          value={formData.timeline || ""}
                          onChange={handleChange}
                          placeholder="e.g. 3-6 months"
                          className={`w-full p-2 border rounded-md ${isDark ? "bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400" : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"}`}
                        />
                      ) : (
                        <div className="flex items-center gap-2 mt-1">
                          <Clock className={`h-4 w-4 ${isDark ? "text-gray-500" : "text-gray-400"}`} />
                          <span className={`${isDark ? "text-gray-300" : "text-gray-700"}`}>
                            {formData.timeline || "Not specified"}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className={`border rounded-lg p-4 space-y-4 ${isDark ? "border-gray-600" : "border-gray-300"}`}>
                  <h3 className={`font-medium ${isDark ? "text-gray-200" : "text-gray-800"}`}>Requirements</h3>

                  {isEditing ? (
                    <textarea
                      name="requirements"
                      value={formData.requirements || ""}
                      onChange={handleChange}
                      placeholder="Specific requirements or preferences"
                      rows={4}
                      className={`w-full p-2 border rounded-md ${isDark ? "bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400" : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"}`}
                    />
                  ) : (
                    <div className="flex items-start gap-2">
                      <Target className={`h-4 w-4 ${isDark ? "text-gray-500" : "text-gray-400"} mt-1`} />
                      <p className={`whitespace-pre-line ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                        {formData.requirements || "No requirements specified"}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === "notes" && (
              <div className="space-y-6">
                <div className={`border rounded-lg p-4 space-y-4 ${isDark ? "border-gray-600" : "border-gray-300"}`}>
                  <h3 className={`font-medium ${isDark ? "text-gray-200" : "text-gray-800"}`}>Notes</h3>

                  {isEditing ? (
                    <textarea
                      name="notes"
                      value={formData.notes || ""}
                      onChange={handleChange}
                      placeholder="Add notes about this lead"
                      rows={6}
                      className={`w-full p-2 border rounded-md ${isDark ? "bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400" : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"}`}
                    />
                  ) : (
                    <div className="flex items-start gap-2">
                      <FileText className={`h-4 w-4 ${isDark ? "text-gray-500" : "text-gray-400"} mt-1`} />
                      <p className={`whitespace-pre-line ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                        {formData.notes || "No notes added"}
                      </p>
                    </div>
                  )}
                </div>

                <div className={`border rounded-lg p-4 space-y-4 ${isDark ? "border-gray-600" : "border-gray-300"}`}>
                  <h3 className={`font-medium ${isDark ? "text-gray-200" : "text-gray-800"}`}>Tags</h3>

                  {isEditing ? (
                    <div className="space-y-2">
                      <div className="flex flex-wrap gap-2">
                        {formData.tags?.map((tag) => (
                          <span
                            key={tag}
                            className={`px-2 py-1 rounded-full text-sm flex items-center gap-1 ${isDark ? "bg-gray-700 text-gray-200" : "bg-gray-200 text-gray-800"}`}
                          >
                            {tag}
                            <button
                              type="button"
                              onClick={() => handleRemoveTag(tag)}
                              className={`ml-1 rounded-full ${isDark ? "hover:bg-gray-600" : "hover:bg-gray-300"} p-1`}
                            >
                              ×
                            </button>
                          </span>
                        ))}
                      </div>

                      <input
                        placeholder="Type a tag and press Enter"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyDown={handleAddTag}
                        className={`w-full p-2 border rounded-md ${isDark ? "bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400" : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"}`}
                      />
                      <p className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                        Press Enter to add a tag
                      </p>
                    </div>
                  ) : (
                    <div className="flex items-start gap-2">
                      <Tag className={`h-4 w-4 ${isDark ? "text-gray-500" : "text-gray-400"} mt-1`} />
                      <div className="flex flex-wrap gap-2">
                        {formData.tags && formData.tags.length > 0 ? (
                          formData.tags.map((tag) => (
                            <span
                              key={tag}
                              className={`px-2 py-1 rounded-full text-sm ${isDark ? "bg-gray-700 text-gray-200" : "bg-gray-200 text-gray-800"}`}
                            >
                              {tag}
                            </span>
                          ))
                        ) : (
                          <span className={`${isDark ? "text-gray-400" : "text-gray-500"}`}>No tags added</span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {isDeleteDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            className={`${isDark ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"} rounded-lg shadow-lg w-full max-w-md p-6`}
          >
            <h2 className="text-xl font-bold mb-4">Are you sure?</h2>
            <p className="mb-6">This will permanently delete the lead "{lead.name}". This action cannot be undone.</p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsDeleteDialogOpen(false)}
                className={`px-4 py-2 border rounded-md ${isDark ? "border-gray-600 text-gray-300 hover:bg-gray-700" : "border-gray-300 text-gray-700 hover:bg-gray-100"}`}
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className={`px-4 py-2 ${isDark ? "bg-red-700 hover:bg-red-800" : "bg-red-600 hover:bg-red-700"} text-white rounded-md`}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

// ===== Main Leads Component =====
function Leads() {
  const navigate = useNavigate()
  const { theme } = useTheme()
  const { user } = useAuth()
  const { hasPermission } = useUserRole()
  const isDark = theme === "dark"

  // State management
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("All Statuses")
  const [sourceFilter, setSourceFilter] = useState("All Sources")
  const [assigneeFilter, setAssigneeFilter] = useState("All Assignees")
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false)
  const [isImportModalOpen, setIsImportModalOpen] = useState(false)
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)
  const [leads, setLeads] = useState([])
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedLead, setSelectedLead] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [totalLeads, setTotalLeads] = useState(0)
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  // Sources and statuses for filters
  const leadSources = ["Website", "WhatsApp", "Facebook", "Referral", "Direct Call", "Email", "Exhibition"]
  const leadStatuses = [
    "New",
    "Contacted",
    "Site Visit Scheduled",
    "Site Visit Done",
    "Negotiation",
    "Converted",
    "Dropped",
  ]

  // Sample users data
  const sampleUsers = [
    { id: 1, name: "Alex Johnson", role: "Sales Manager", avatar: "/avatars/alex.jpg" },
    { id: 2, name: "Maria Rodriguez", role: "Sales Agent", avatar: "/avatars/maria.jpg" },
    { id: 3, name: "David Wilson", role: "Sales Agent", avatar: "/avatars/david.jpg" },
    { id: 4, name: "James Chen", role: "Sales Agent", avatar: "/avatars/james.jpg" },
    { id: 5, name: "Laura Miller", role: "Sales Agent", avatar: "/avatars/laura.jpg" },
  ]

  // Sample leads data
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

  // Load sample data on component mount
  useEffect(() => {
    const loadSampleData = () => {
      try {
        setLoading(true)

        // Filter leads based on search and filters
        let filteredLeads = [...sampleLeads]

        if (searchQuery) {
          const query = searchQuery.toLowerCase()
          filteredLeads = filteredLeads.filter(
            (lead) =>
              lead.name.toLowerCase().includes(query) ||
              lead.email.toLowerCase().includes(query) ||
              lead.phone.includes(query) ||
              (lead.company && lead.company.toLowerCase().includes(query)),
          )
        }

        if (statusFilter !== "All Statuses") {
          filteredLeads = filteredLeads.filter((lead) => lead.status === statusFilter)
        }

        if (sourceFilter !== "All Sources") {
          filteredLeads = filteredLeads.filter((lead) => lead.source === sourceFilter)
        }

        if (assigneeFilter !== "All Assignees") {
          filteredLeads = filteredLeads.filter((lead) => lead.assignedToId.toString() === assigneeFilter)
        }

        // Calculate pagination
        const totalItems = filteredLeads.length
        const totalPagesCount = Math.ceil(totalItems / pageSize)

        // Get current page items
        const startIndex = (currentPage - 1) * pageSize
        const paginatedLeads = filteredLeads.slice(startIndex, startIndex + pageSize)

        setLeads(paginatedLeads)
        setTotalLeads(totalItems)
        setTotalPages(totalPagesCount)
        setUsers(sampleUsers)
        setError(null)
      } catch (err) {
        console.error("Error loading sample data:", err)
        setError("Failed to load leads. Please try again.")
        toast.error("Failed to load leads")
      } finally {
        setLoading(false)
      }
    }

    loadSampleData()
  }, [currentPage, pageSize, refreshTrigger, searchQuery, statusFilter, sourceFilter, assigneeFilter])

  // Handle adding new lead
  const handleAddLead = async (leadData) => {
    try {
      setLoading(true)

      // Create new lead with generated ID
      const newLead = {
        ...leadData,
        id: Math.max(...sampleLeads.map((lead) => lead.id)) + 1,
        created: new Date().toISOString(),
        lastUpdated: new Date().toISOString(),
        lastActivity: "Added as new lead",
      }

      // Add to sample leads
      sampleLeads.unshift(newLead)

      setIsLeadModalOpen(false)
      setRefreshTrigger((prev) => prev + 1)
      toast.success("Lead created successfully")
    } catch (err) {
      console.error("Error creating lead:", err)
      toast.error("Failed to create lead")
    } finally {
      setLoading(false)
    }
  }

  // Handle updating lead
  const handleUpdateLead = async (leadData) => {
    try {
      setLoading(true)

      // Find and update lead in sample data
      const leadIndex = sampleLeads.findIndex((lead) => lead.id === leadData.id)
      if (leadIndex !== -1) {
        sampleLeads[leadIndex] = {
          ...leadData,
          lastUpdated: new Date().toISOString(),
        }
      }

      setIsDetailsModalOpen(false)
      setSelectedLead(null)
      setRefreshTrigger((prev) => prev + 1)
      toast.success("Lead updated successfully")
    } catch (err) {
      console.error("Error updating lead:", err)
      toast.error("Failed to update lead")
    } finally {
      setLoading(false)
    }
  }

  // Handle deleting lead
  const handleDeleteLead = async (id) => {
    try {
      setLoading(true)

      // Remove lead from sample data
      const leadIndex = sampleLeads.findIndex((lead) => lead.id === id)
      if (leadIndex !== -1) {
        sampleLeads.splice(leadIndex, 1)
      }

      setRefreshTrigger((prev) => prev + 1)
      toast.success("Lead deleted successfully")
    } catch (err) {
      console.error("Error deleting lead:", err)
      toast.error("Failed to delete lead")
    } finally {
      setLoading(false)
    }
  }

  // Handle importing leads
  const handleImportLeads = (importedLeads) => {
    try {
      setLoading(true)

      // Add imported leads to sample data
      const newLeads = importedLeads.map((lead, index) => ({
        ...lead,
        id: Math.max(...sampleLeads.map((l) => l.id)) + index + 1,
        created: new Date().toISOString(),
        lastUpdated: new Date().toISOString(),
        lastActivity: "Imported lead",
      }))

      sampleLeads.unshift(...newLeads)
      setRefreshTrigger((prev) => prev + 1)
      toast.success(`${newLeads.length} leads imported successfully`)
    } catch (err) {
      console.error("Error importing leads:", err)
      toast.error("Failed to import leads")
    } finally {
      setLoading(false)
    }
  }

  // Handle adding new user
  const handleAddUser = async () => {
    // This would open a user form in a real implementation
    alert("Add User functionality would open here (Admin only)")
  }

  // Handle exporting leads to CSV
  const handleExportLeads = async () => {
    try {
      setLoading(true)

      // Simulate export by showing success message
      setTimeout(() => {
        toast.success("Leads exported successfully")
        setLoading(false)
      }, 1000)
    } catch (err) {
      console.error("Error exporting leads:", err)
      toast.error("Failed to export leads")
      setLoading(false)
    }
  }

  // Get status badge class
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "New":
        return isDark ? "bg-blue-900/30 text-blue-300" : "bg-blue-100 text-blue-700"
      case "Contacted":
        return isDark ? "bg-emerald-900/30 text-emerald-300" : "bg-emerald-100 text-emerald-700"
      case "Site Visit Scheduled":
        return isDark ? "bg-purple-900/30 text-purple-300" : "bg-purple-100 text-purple-700"
      case "Site Visit Done":
        return isDark ? "bg-orange-900/30 text-orange-300" : "bg-orange-100 text-orange-700"
      case "Negotiation":
        return isDark ? "bg-yellow-900/30 text-yellow-300" : "bg-yellow-100 text-yellow-700"
      case "Converted":
        return isDark ? "bg-green-900/30 text-green-300" : "bg-green-100 text-green-700"
      case "Dropped":
        return isDark ? "bg-red-900/30 text-red-300" : "bg-red-100 text-red-700"
      default:
        return isDark ? "bg-gray-800 text-gray-300" : "bg-gray-100 text-gray-700"
    }
  }

  // Get source icon
  const getSourceIcon = (source) => {
    switch (source) {
      case "Website":
        return <Globe size={16} className={isDark ? "text-blue-400" : "text-blue-600"} />
      case "WhatsApp":
        return <MessageCircle size={16} className={isDark ? "text-green-400" : "text-green-600"} />
      case "Facebook":
        return <Facebook size={16} className={isDark ? "text-blue-400" : "text-blue-600"} />
      case "Referral":
        return <Users size={16} className={isDark ? "text-orange-400" : "text-orange-600"} />
      case "Direct Call":
        return <Phone size={16} className={isDark ? "text-green-400" : "text-green-600"} />
      default:
        return null
    }
  }

  // View lead details
  const handleViewLead = (lead) => {
    setSelectedLead(lead)
    setIsDetailsModalOpen(true)
  }

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return date.toLocaleDateString() + " " + date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div className={`min-h-screen ${isDark ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-900"}`}>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="mb-8">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <div>
              <h1 className={`text-2xl font-bold mb-1 ${isDark ? "text-gray-100" : "text-gray-800"}`}>
                Lead Management
              </h1>
              <p className={isDark ? "text-gray-400" : "text-gray-600"}>
                View, filter, and manage all your leads in one place.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              {hasPermission("create_leads") && (
                <button
                  onClick={() => {
                    setSelectedLead(null)
                    setIsLeadModalOpen(true)
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 flex items-center gap-2 shadow-sm"
                  disabled={loading}
                >
                  <Plus size={18} />
                  <span>Add Lead</span>
                </button>
              )}

              {hasPermission("import_leads") && (
                <button
                  onClick={() => setIsImportModalOpen(true)}
                  className={`cursor-pointer px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-200 flex items-center gap-2 shadow-sm ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  <FileUp size={18} />
                  <span>Import</span>
                </button>
              )}

              {hasPermission("export_leads") && (
                <button
                  onClick={handleExportLeads}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all duration-200 flex items-center gap-2 shadow-sm"
                  disabled={loading}
                >
                  <Download size={18} />
                  <span>Export</span>
                </button>
              )}

              {hasPermission("create_users") && (
                <button
                  onClick={handleAddUser}
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all duration-200 flex items-center gap-2 shadow-sm"
                  disabled={loading}
                >
                  <UserPlus size={18} />
                  <span>Add User</span>
                </button>
              )}
            </div>
          </div>
        </header>

        {/* Filters Section */}
        <div
          className={`mb-6 p-4 rounded-lg shadow-sm border border-opacity-20 backdrop-blur-sm ${
            isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
          }`}
        >
          <div className="flex flex-col md:flex-row gap-4 flex-wrap">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <Search size={18} className={isDark ? "text-gray-400" : "text-gray-500"} />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search leads..."
                  className={`w-full pl-10 pr-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    isDark ? "bg-gray-700 border-gray-600 text-gray-100" : "bg-white border-gray-300 text-gray-900"
                  }`}
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className={`px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isDark ? "bg-gray-700 border-gray-600 text-gray-100" : "bg-white border-gray-300 text-gray-900"
                }`}
              >
                <option value="All Statuses">All Statuses</option>
                {leadStatuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>

              <select
                value={sourceFilter}
                onChange={(e) => setSourceFilter(e.target.value)}
                className={`px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isDark ? "bg-gray-700 border-gray-600 text-gray-100" : "bg-white border-gray-300 text-gray-900"
                }`}
              >
                <option value="All Sources">All Sources</option>
                {leadSources.map((source) => (
                  <option key={source} value={source}>
                    {source}
                  </option>
                ))}
              </select>

              <select
                value={assigneeFilter}
                onChange={(e) => setAssigneeFilter(e.target.value)}
                className={`px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isDark ? "bg-gray-700 border-gray-600 text-gray-100" : "bg-white border-gray-300 text-gray-900"
                }`}
              >
                <option value="All Assignees">All Assignees</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </select>

              <button
                onClick={() => setRefreshTrigger((prev) => prev + 1)}
                className={`p-2 rounded-lg border focus:outline-none ${
                  isDark
                    ? "bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600"
                    : "bg-white border-gray-300 text-gray-700 hover:bg-gray-100"
                }`}
                title="Refresh"
              >
                <RefreshCw size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Leads Table */}
        <div
          className={`rounded-xl shadow-sm border overflow-hidden relative ${
            isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
          }`}
        >
          {loading && (
            <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center z-10">
              <Spinner size="lg" />
            </div>
          )}

          {error && (
            <div className={`p-4 text-center ${isDark ? "text-red-400" : "text-red-600"}`}>
              {error}
              <button onClick={() => setRefreshTrigger((prev) => prev + 1)} className="ml-2 underline">
                Retry
              </button>
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className={isDark ? "bg-gray-700" : "bg-gray-50"}>
                <tr>
                  <th
                    className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                      isDark ? "text-gray-300" : "text-gray-500"
                    }`}
                  >
                    Lead
                  </th>
                  <th
                    className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                      isDark ? "text-gray-300" : "text-gray-500"
                    }`}
                  >
                    Status
                  </th>
                  <th
                    className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                      isDark ? "text-gray-300" : "text-gray-500"
                    }`}
                  >
                    Source
                  </th>
                  <th
                    className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                      isDark ? "text-gray-300" : "text-gray-500"
                    }`}
                  >
                    Interest
                  </th>
                  <th
                    className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                      isDark ? "text-gray-300" : "text-gray-500"
                    }`}
                  >
                    Assigned To
                  </th>
                  <th
                    className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                      isDark ? "text-gray-300" : "text-gray-500"
                    }`}
                  >
                    Created
                  </th>
                  <th
                    className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                      isDark ? "text-gray-300" : "text-gray-500"
                    }`}
                  >
                    Last Updated
                  </th>
                  <th
                    className={`px-6 py-3 text-right text-xs font-medium uppercase tracking-wider ${
                      isDark ? "text-gray-300" : "text-gray-500"
                    }`}
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className={`divide-y ${isDark ? "divide-gray-700" : "divide-gray-200"}`}>
                {leads.length === 0 ? (
                  <tr>
                    <td colSpan="8" className={`px-6 py-10 text-center ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                      {loading ? "Loading leads..." : "No leads found."}
                    </td>
                  </tr>
                ) : (
                  leads.map((lead) => (
                    <tr
                      key={lead.id}
                      className={`${isDark ? "hover:bg-gray-700" : "hover:bg-blue-50/50"} transition-all duration-200`}
                    >
                      <td className="px-6 py-4">
                        <div>
                          <div className={`text-sm font-medium ${isDark ? "text-gray-100" : "text-gray-800"}`}>
                            {lead.name}
                          </div>
                          <div className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>{lead.email}</div>
                          <div className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>{lead.phone}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusBadgeClass(lead.status)}`}
                        >
                          {lead.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          {getSourceIcon(lead.source)}
                          <span className={`text-sm ml-2 ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                            {lead.source}
                          </span>
                        </div>
                      </td>
                      <td className={`px-6 py-4 text-sm ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                        {lead.interest}
                      </td>
                      <td className={`px-6 py-4 text-sm ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                        {lead.assignedTo}
                      </td>
                      <td className={`px-6 py-4 text-sm ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                        {formatDate(lead.created)}
                      </td>
                      <td className={`px-6 py-4 text-sm ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                        {formatDate(lead.lastUpdated)}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleViewLead(lead)}
                            className={`p-1 rounded-md ${
                              isDark ? "text-blue-400 hover:bg-blue-900/30" : "text-blue-600 hover:bg-blue-100"
                            }`}
                            title="View/Edit"
                          >
                            <Edit size={18} />
                          </button>

                          {hasPermission("delete_leads") && (
                            <button
                              onClick={() => handleDeleteLead(lead.id)}
                              className={`p-1 rounded-md ${
                                isDark ? "text-red-400 hover:bg-red-900/30" : "text-red-600 hover:bg-red-100"
                              }`}
                              title="Delete"
                            >
                              <Trash2 size={18} />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className={`px-6 py-4 border-t ${isDark ? "border-gray-700" : "border-gray-200"}`}>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                Showing {leads.length > 0 ? (currentPage - 1) * pageSize + 1 : 0} to{" "}
                {Math.min(currentPage * pageSize, totalLeads)} of {totalLeads} results
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={pageSize}
                  onChange={(e) => {
                    setPageSize(Number(e.target.value))
                    setCurrentPage(1)
                  }}
                  className={`px-2 py-1 text-sm rounded border ${
                    isDark ? "bg-gray-700 border-gray-600 text-gray-200" : "bg-white border-gray-300 text-gray-700"
                  }`}
                >
                  {[10, 25, 50, 100].map((size) => (
                    <option key={size} value={size}>
                      {size} per page
                    </option>
                  ))}
                </select>

                <div className="flex gap-1">
                  <button
                    onClick={() => setCurrentPage(1)}
                    disabled={currentPage === 1}
                    className={`px-3 py-1 rounded text-sm ${
                      isDark
                        ? "bg-gray-700 text-gray-300 hover:bg-gray-600 disabled:bg-gray-800 disabled:text-gray-600"
                        : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400"
                    }`}
                  >
                    First
                  </button>

                  <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className={`px-3 py-1 rounded text-sm ${
                      isDark
                        ? "bg-gray-700 text-gray-300 hover:bg-gray-600 disabled:bg-gray-800 disabled:text-gray-600"
                        : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400"
                    }`}
                  >
                    <ChevronLeft size={16} />
                  </button>

                  <span className={`px-3 py-1 text-sm ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                    Page {currentPage} of {totalPages}
                  </span>

                  <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className={`px-3 py-1 rounded text-sm ${
                      isDark
                        ? "bg-gray-700 text-gray-300 hover:bg-gray-600 disabled:bg-gray-800 disabled:text-gray-600"
                        : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400"
                    }`}
                  >
                    <ChevronRight size={16} />
                  </button>

                  <button
                    onClick={() => setCurrentPage(totalPages)}
                    disabled={currentPage === totalPages}
                    className={`px-3 py-1 rounded text-sm ${
                      isDark
                        ? "bg-gray-700 text-gray-300 hover:bg-gray-600 disabled:bg-gray-800 disabled:text-gray-600"
                        : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400"
                    }`}
                  >
                    Last
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Lead Dialog */}
      <AddLeadDialog
        isOpen={isLeadModalOpen}
        onClose={() => setIsLeadModalOpen(false)}
        onSubmit={handleAddLead}
        users={users}
      />

      {/* Import Leads Dialog */}
      <ImportLeadsDialog
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
        onImport={handleImportLeads}
      />

      {/* Lead Details Dialog */}
      {selectedLead && (
        <LeadDetailsDialog
          isOpen={isDetailsModalOpen}
          onClose={() => {
            setIsDetailsModalOpen(false)
            setSelectedLead(null)
          }}
          lead={selectedLead}
          onUpdate={handleUpdateLead}
          onDelete={handleDeleteLead}
          users={users}
          canEdit={hasPermission("edit_leads")}
          canDelete={hasPermission("delete_leads")}
        />
      )}
    </div>
  )
}

export default Leads
