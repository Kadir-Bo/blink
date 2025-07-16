import { useAuth, useDatabase } from "context";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleAuthProvider, reauthenticateWithPopup } from "firebase/auth";
import { useModal } from "context/ModalContext";
// 📄 PersonalInformation component
const PersonalInformation = () => {
  const { currentUser, updateUserProfile } = useAuth();
  const { getUser, updateUser } = useDatabase();

  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    displayName: "",
    email: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUser();

        setFormData({
          displayName: data?.displayName || "",
          email: currentUser?.email || "",
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [getUser, currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // update Firestore
      await updateUser({ displayName: formData.displayName });
      // update Firebase Auth user
      await updateUserProfile({ displayName: formData.displayName });
      alert("Profile updated!");
    } catch (err) {
      console.error(err);
      alert("Failed to update profile.");
    }
  };
  return (
    <div>
      <h5 className="font-semibold mb-4">Personal Information</h5>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-sm">
        <div>
          <label className="block text-sm">Display Name</label>
          <input
            type="text"
            name="displayName"
            value={formData.displayName}
            onChange={handleChange}
            className="border rounded w-full px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm">Email (read-only)</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            disabled
            className="border rounded w-full px-3 py-2 bg-gray-100"
          />
        </div>
        <button
          type="submit"
          className="bg-emerald-700 text-white px-4 py-2 rounded hover:bg-emerald-800"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

// 📄 AccountSettings component
const AccountSettings = () => {
  const { deleteUser: deleteUserFromDB } = useDatabase();
  const { currentUser, updateUserPassword } = useAuth();
  const { closeModal } = useModal();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [updatingPassword, setUpdatingPassword] = useState(false);
  const navigate = useNavigate();
  const handleChangePassword = () => {
    navigate("/help/forgot-password");
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm("Are you sure you want to delete your account?"))
      return;

    try {
      // Re-authenticate if Google user
      const provider = new GoogleAuthProvider();
      await reauthenticateWithPopup(currentUser, provider);

      // Delete Firestore user doc
      await deleteUserFromDB();

      // Delete Auth user
      await currentUser.delete();

      alert("Your account has been deleted.");
      closeModal();
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Failed to delete account: " + err.message);
    }
  };
  const handlePasswordUpdate = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmNewPassword) {
      alert("New passwords do not match!");
      return;
    }

    setUpdatingPassword(true);

    try {
      await updateUserPassword(currentPassword, newPassword);
      alert("Password updated successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
    } catch (err) {
      console.error(err);
      alert("Failed to update password: " + err.message);
    } finally {
      setUpdatingPassword(false);
    }
  };
  return (
    currentUser && (
      <div className="flex flex-col gap-8">
        <h5 className="font-semibold mb-2">Account Settings</h5>
        <form onSubmit={handlePasswordUpdate} className=" max-w-sm">
          <h6 className="font-semibold mb-2">Update Password</h6>
          <input
            type="password"
            placeholder="Current Password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="border rounded w-full px-3 py-2 mb-2"
            required
          />
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="border rounded w-full px-3 py-2 mb-2"
            required
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            className="border rounded w-full px-3 py-2 mb-4"
            required
          />
          <button
            type="submit"
            disabled={updatingPassword}
            className="bg-emerald-700 text-white px-4 py-2 rounded hover:bg-emerald-800 text-sm"
          >
            Update Password
          </button>
        </form>
        <hr />
        <div>
          <p className="text-gray-800 text-sm">
            Deleting your account is permanent and cannot be undone.
          </p>
          <button
            className="bg-red-700 text-white px-4 py-2 rounded hover:bg-red-800 text-sm mt-2"
            onClick={handleDeleteAccount}
          >
            Delete Account
          </button>
        </div>
      </div>
    )
  );
};

// 📄 UserSettingsModal main component
const UserSettingsModal = () => {
  const [activeSetting, setActiveSetting] = useState("personal");

  const settingItems = [
    {
      id: "personal",
      label: "Personal Information",
      component: <PersonalInformation />,
    },
    {
      id: "account",
      label: "Account Settings",
      component: <AccountSettings />,
    },
  ];

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h4 className="font-medium text-lg">Settings</h4>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar / Menu */}
        <div className="flex flex-col gap-2 w-full lg:w-1/4">
          {settingItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSetting(item.id)}
              className={`text-left px-4 py-2 rounded transition-all duration-100
                ${
                  activeSetting === item.id
                    ? "bg-gray-200 text-gray-800"
                    : "text-gray-800 hover:bg-gray-100"
                }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Active Content */}
        <div className="flex-1 bg-white px-4 rounded">
          {settingItems.find((item) => item.id === activeSetting)?.component}
        </div>
      </div>
    </div>
  );
};

export default UserSettingsModal;
