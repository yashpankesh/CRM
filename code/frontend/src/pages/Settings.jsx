import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import authService from "../services/authService";
import { toast } from "react-toastify";
import {
  User,
  Lock,
  Bell,
  Palette,
  Mail,
  Phone,
  Camera,
  Shield,
  BellRing,
  BellOff,
  Sun,
  Moon,
  Monitor
} from "lucide-react";

function Settings() {
  const { theme, setTheme } = useTheme();
  const { user, setUser } = useAuth();
  const fileInputRef = useRef(null);
  const [activeTab, setActiveTab] = useState("profile");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    phone_number: "",
    role: ""
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || "",
        email: user.email || "",
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        phone_number: user.phone_number || "",
        role: user.role || ""
      });
    }
  }, [user]);

  const isDark = theme === "dark";
  const bgColor = isDark ? "bg-gray-800" : "bg-white";
  const textColor = isDark ? "text-gray-100" : "text-gray-800";
  const borderColor = isDark ? "border-gray-700" : "border-gray-200";
  const secondaryText = isDark ? "text-gray-400" : "text-gray-500";
  const inputBg = isDark ? "bg-gray-700" : "bg-gray-50";
  const inputBorder = isDark ? "border-gray-600" : "border-gray-300";
  const buttonHover = isDark ? "hover:bg-gray-700" : "hover:bg-gray-100";

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "security", label: "Security", icon: Shield },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "preferences", label: "Preferences", icon: Palette },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const updatedUser = await authService.updateUserProfile(formData);
      setUser(updatedUser);
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error(error.response?.data?.detail || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size should be less than 5MB');
      return;
    }

    const loadingToast = toast.loading('Updating profile image...');
    try {
      const updatedUser = await authService.updateProfileImage(file);
      setUser(updatedUser);
      toast.success('Profile image updated successfully!');
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Failed to update profile image');
    } finally {
      toast.dismiss(loadingToast);
    }
  };

  const renderProfileSettings = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-6">
        <div className="relative">
          <div className={`w-24 h-24 rounded-full ${inputBg} flex items-center justify-center overflow-hidden`}>
            <img
              src={user?.profile_image || "https://via.placeholder.com/96"}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <button
            onClick={handleImageClick}
            className={`absolute bottom-0 right-0 p-2 rounded-full ${bgColor} border ${borderColor} ${buttonHover}`}
          >
            <Camera className="w-4 h-4" />
          </button>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
        <div>
          <h3 className={`text-lg font-medium ${textColor}`}>{formData.first_name} {formData.last_name}</h3>
          <p className={secondaryText}>{formData.role}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className={`block text-sm font-medium ${secondaryText} mb-2`}>
            First Name
          </label>
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleInputChange}
            className={`w-full px-4 py-2 rounded-lg border ${inputBg} ${inputBorder} ${textColor}`}
            placeholder="Enter first name"
          />
        </div>
        <div>
          <label className={`block text-sm font-medium ${secondaryText} mb-2`}>
            Last Name
          </label>
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleInputChange}
            className={`w-full px-4 py-2 rounded-lg border ${inputBg} ${inputBorder} ${textColor}`}
            placeholder="Enter last name"
          />
        </div>
        <div>
          <label className={`block text-sm font-medium ${secondaryText} mb-2`}>
            Email
          </label>
          <div className="relative">
            <Mail className={`absolute left-3 top-2.5 w-5 h-5 ${secondaryText}`} />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full pl-10 pr-4 py-2 rounded-lg border ${inputBg} ${inputBorder} ${textColor}`}
              placeholder="Enter email address"
            />
          </div>
        </div>
        <div>
          <label className={`block text-sm font-medium ${secondaryText} mb-2`}>
            Phone Number
          </label>
          <div className="relative">
            <Phone className={`absolute left-3 top-2.5 w-5 h-5 ${secondaryText}`} />
            <input
              type="tel"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleInputChange}
              className={`w-full pl-10 pr-4 py-2 rounded-lg border ${inputBg} ${inputBorder} ${textColor}`}
              placeholder="Enter phone number"
            />
          </div>
        </div>
        <div>
          <label className={`block text-sm font-medium ${secondaryText} mb-2`}>
            Username
          </label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            className={`w-full px-4 py-2 rounded-lg border ${inputBg} ${inputBorder} ${textColor}`}
            placeholder="Enter username"
          />
        </div>
        <div>
          <label className={`block text-sm font-medium ${secondaryText} mb-2`}>
            Role
          </label>
          <input
            type="text"
            value={formData.role}
            className={`w-full px-4 py-2 rounded-lg border ${inputBg} ${inputBorder} ${textColor}`}
            disabled
          />
        </div>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div className={`p-4 rounded-lg border ${borderColor} ${buttonHover}`}>
        <h3 className={`text-lg font-medium ${textColor} mb-2`}>Password</h3>
        <p className={secondaryText}>Last changed 2 months ago</p>
        <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Change Password
        </button>
      </div>

      {/* <div className={`p-4 rounded-lg border ${borderColor} ${buttonHover}`}>
        <h3 className={`text-lg font-medium ${textColor} mb-2`}>Two-Factor Authentication</h3>
        <p className={secondaryText}>Add an extra layer of security to your account</p>
        <button className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
          Enable 2FA
        </button>
      </div> */}

      {/* <div className={`p-4 rounded-lg border ${borderColor} ${buttonHover}`}>
        <h3 className={`text-lg font-medium ${textColor} mb-2`}>Active Sessions</h3>
        <p className={secondaryText}>Manage your active sessions across devices</p>
        <button className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
          Sign Out All Devices
        </button>
      </div> */}
    </div>
  );

  // const renderNotificationSettings = () => (
  //   <div className="space-y-6">
  //     <div className={`p-4 rounded-lg border ${borderColor}`}>
  //       <div className="flex items-center justify-between">
  //         <div className="flex items-center space-x-3">
  //           <BellRing className={`w-6 h-6 ${textColor}`} />
  //           <div>
  //             <h3 className={`font-medium ${textColor}`}>Email Notifications</h3>
  //             <p className={secondaryText}>Receive updates via email</p>
  //           </div>
  //         </div>
  //         <label className="relative inline-flex items-center cursor-pointer">
  //           <input
  //             type="checkbox"
  //             checked={formData.notifications.email}
  //             onChange={(e) =>
  //               setFormData({
  //                 ...formData,
  //                 notifications: { ...formData.notifications, email: e.target.checked },
  //               })
  //             }
  //             className="sr-only peer"
  //           />
  //           <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
  //         </label>
  //       </div>
  //     </div>

  //     <div className={`p-4 rounded-lg border ${borderColor}`}>
  //       <div className="flex items-center justify-between">
  //         <div className="flex items-center space-x-3">
  //           <Bell className={`w-6 h-6 ${textColor}`} />
  //           <div>
  //             <h3 className={`font-medium ${textColor}`}>Push Notifications</h3>
  //             <p className={secondaryText}>Receive notifications in-app</p>
  //           </div>
  //         </div>
  //         <label className="relative inline-flex items-center cursor-pointer">
  //           <input
  //             type="checkbox"
  //             checked={formData.notifications.push}
  //             onChange={(e) =>
  //               setFormData({
  //                 ...formData,
  //                 notifications: { ...formData.notifications, push: e.target.checked },
  //               })
  //             }
  //             className="sr-only peer"
  //           />
  //           <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
  //         </label>
  //       </div>
  //     </div>

  //     <div className={`p-4 rounded-lg border ${borderColor}`}>
  //       <div className="flex items-center justify-between">
  //         <div className="flex items-center space-x-3">
  //           <BellOff className={`w-6 h-6 ${textColor}`} />
  //           <div>
  //             <h3 className={`font-medium ${textColor}`}>SMS Notifications</h3>
  //             <p className={secondaryText}>Receive updates via SMS</p>
  //           </div>
  //         </div>
  //         <label className="relative inline-flex items-center cursor-pointer">
  //           <input
  //             type="checkbox"
  //             checked={formData.notifications.sms}
  //             onChange={(e) =>
  //               setFormData({
  //                 ...formData,
  //                 notifications: { ...formData.notifications, sms: e.target.checked },
  //               })
  //             }
  //             className="sr-only peer"
  //           />
  //           <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
  //         </label>
  //       </div>
  //     </div>
  //   </div>
  // );

  const renderPreferenceSettings = () => (
    <div className="space-y-6">
      <div className={`p-4 rounded-lg border ${borderColor}`}>
        <h3 className={`text-lg font-medium ${textColor} mb-4`}>Theme Settings</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => setTheme("light")}
            className={`flex items-center space-x-2 p-3 rounded-lg border ${
              theme === "light" ? "border-blue-500 bg-blue-500 " : borderColor
            }`}
          >
            <Sun className="w-5 h-5 text-yellow-500" />
            <span className={textColor}>Light</span>
          </button>
          <button
            onClick={() => setTheme("dark")}
            className={`flex items-center space-x-2 p-3 rounded-lg border ${
              theme === "dark" ? "border-blue-500 bg-blue-500 " : borderColor
            }`}
          >
            <Moon className="w-5 h-5 text-blue-500" />
            <span className={textColor}>Dark</span>
          </button>
          <button
            onClick={() => setTheme("system")}
            className={`flex items-center space-x-2 p-3 rounded-lg border ${
              theme === "system" ? "border-blue-500 bg-blue-500 " : borderColor
            }`}
          >
            <Monitor className="w-5 h-5 text-gray-500" />
            <span className={textColor}>System</span>
          </button>
        </div>
      </div>

      {/* <div className={`p-4 rounded-lg border ${borderColor}`}>
        <h3 className={`text-lg font-medium ${textColor} mb-4`}>Language & Region</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={`block text-sm font-medium ${secondaryText} mb-2`}>
              Language
            </label>
            <select
              value={formData.preferences.language}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  preferences: { ...formData.preferences, language: e.target.value },
                })
              }
              className={`w-full px-4 py-2 rounded-lg border ${inputBg} ${inputBorder} ${textColor}`}
            >
              <option value="English">English</option>
              <option value="Spanish">Spanish</option>
              <option value="French">French</option>
              <option value="German">German</option>
            </select>
          </div>
          <div>
            <label className={`block text-sm font-medium ${secondaryText} mb-2`}>
              Time Zone
            </label>
            <select
              value={formData.preferences.timeZone}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  preferences: { ...formData.preferences, timeZone: e.target.value },
                })
              }
              className={`w-full px-4 py-2 rounded-lg border ${inputBg} ${inputBorder} ${textColor}`}
            >
              <option value="UTC-8">Pacific Time (UTC-8)</option>
              <option value="UTC-5">Eastern Time (UTC-5)</option>
              <option value="UTC+0">Greenwich Mean Time (UTC+0)</option>
              <option value="UTC+1">Central European Time (UTC+1)</option>
            </select>
          </div>
        </div>
      </div> */}
    </div>
  );

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className={`text-2xl font-semibold ${textColor}`}>Settings</h1>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Save Changes
          </button>
        </div>

        <div className="flex space-x-2 border-b border-gray-200 dark:border-gray-700">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 border-b-2 transition-colors ${
                activeTab === tab.id
                  ? "border-blue-600 text-blue-600"
                  : `border-transparent ${secondaryText} hover:text-blue-600`
              }`}
            >
              <tab.icon className="w-5 h-5" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        <div className={`${bgColor} rounded-xl shadow-sm p-6 border ${borderColor}`}>
          {activeTab === "profile" && renderProfileSettings()}
          {activeTab === "security" && renderSecuritySettings()}
          {/* {activeTab === "notifications" && renderNotificationSettings()} */}
          {activeTab === "preferences" && renderPreferenceSettings()}
        </div>
      </div>
    </div>
  );
}

export default Settings;
