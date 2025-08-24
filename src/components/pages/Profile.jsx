import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { account, databases, storage, ID } from '../../appwrite';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Card from '../ui/Card';

const Profile = () => {
    const { user, logout } = useAuth();
    const [profile, setProfile] = useState({
        name: '',
        email: '',
        height: '',
        weight: '',
        age: '',
        fitnessGoal: '',
        profilePictureUrl: '',
    });
    const [imageFile, setImageFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [profileExists, setProfileExists] = useState(false);

    // Toast state
    const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

    // States for password change
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    // Show toast function
    const showToast = (message, type = 'success') => {
        setToast({ show: true, message, type });
        setTimeout(() => {
            setToast({ show: false, message: '', type: 'success' });
        }, 3000);
    };

    useEffect(() => {
        if (user) {
            fetchUserProfile();
            setProfile(prev => ({
                ...prev,
                name: user.name,
                email: user.email,
            }));
        }
    }, [user]);

    const fetchUserProfile = async () => {
        try {
            const response = await databases.getDocument(
                import.meta.env.VITE_APPWRITE_DATABASE_ID,
                import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID,
                user.$id
            );
            setProfile(prev => ({
                ...prev,
                height: response.height || '',
                weight: response.weight || '',
                age: response.age || '',
                fitnessGoal: response.fitnessGoal || '',
                profilePictureUrl: response.profilePictureUrl || '',
            }));
            setProfileExists(true);
        } catch (error) {
            if (error.code === 404) {
                console.log('Profile document does not exist yet');
                setProfileExists(false);
            } else {
                console.error('Error fetching profile:', error);
                showToast('Error fetching profile', 'error');
            }
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfile({ ...profile, [name]: value });
    };

    const handleImageChange = (e) => {
        setImageFile(e.target.files[0]);
    };

    const uploadProfilePicture = async () => {
        if (!imageFile) return profile.profilePictureUrl;

        try {
            if (profile.profilePictureUrl) {
                try {
                    const urlParts = profile.profilePictureUrl.split('/');
                    const fileId = urlParts[urlParts.length - 1];
                    await storage.deleteFile(
                        import.meta.env.VITE_APPWRITE_PROFILE_BUCKET_ID,
                        fileId
                    );
                } catch (error) {
                    console.error('Error deleting old profile picture:', error);
                }
            }

            const response = await storage.createFile(
                import.meta.env.VITE_APPWRITE_PROFILE_BUCKET_ID,
                ID.unique(),
                imageFile
            );

            const fileUrl = storage.getFileView(
                import.meta.env.VITE_APPWRITE_PROFILE_BUCKET_ID,
                response.$id
            );

            return fileUrl.href;
        } catch (error) {
            console.error('Error uploading image:', error);
            showToast('Error uploading image', 'error');
            return profile.profilePictureUrl;
        }
    };

    const saveProfile = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            let profilePictureUrl = profile.profilePictureUrl;
            if (imageFile) {
                // Upload the new profile picture and get the URL
                profilePictureUrl = await uploadProfilePicture();

                // Update the component state with the new profile picture URL immediately
                setProfile(prev => ({
                    ...prev,
                    profilePictureUrl: profilePictureUrl
                }));
            }

            // Prepare the data object to save to the database
            const data = {
                userId: user.$id,
                name: profile.name,
                email: profile.email,
                height: profile.height ? parseFloat(profile.height) : null,
                weight: profile.weight ? parseFloat(profile.weight) : null,
                age: profile.age ? parseInt(profile.age) : null,
                fitnessGoal: profile.fitnessGoal,
                profilePictureUrl: profilePictureUrl, // Use the updated URL
            };

            let response;
            if (profileExists) {
                // Update existing profile document
                response = await databases.updateDocument(
                    import.meta.env.VITE_APPWRITE_DATABASE_ID,
                    import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID,
                    user.$id,
                    data
                );
                console.log('Profile updated:', response);
            } else {
                // Create new profile document
                response = await databases.createDocument(
                    import.meta.env.VITE_APPWRITE_DATABASE_ID,
                    import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID,
                    user.$id,
                    data
                );
                console.log('Profile created:', response);
                setProfileExists(true);
            }

            showToast('Profile saved successfully!', 'success');
        } catch (error) {
            console.error('Error saving profile:', error);
            let errorMessage = 'Failed to save profile';

            if (error.code === 401) {
                errorMessage = 'Permission denied. Please check your collection permissions.';
            } else if (error.code === 404) {
                errorMessage = 'Collection not found. Please check your database and collection IDs.';
            } else if (error.message) {
                errorMessage = `Failed to save profile: ${error.message}`;
            }

            showToast(errorMessage, 'error');
        } finally {
            setLoading(false);
        }
    };

    // Password change functions
    const handlePasswordInputChange = (e) => {
        const { name, value } = e.target;
        setPasswordData({ ...passwordData, [name]: value });
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();

        if (passwordData.newPassword !== passwordData.confirmPassword) {
            showToast('New passwords do not match', 'error');
            return;
        }

        if (passwordData.newPassword.length < 8) {
            showToast('Password must be at least 8 characters long', 'error');
            return;
        }

        if (!passwordData.currentPassword) {
            showToast('Please enter your current password', 'error');
            return;
        }

        setLoading(true);

        try {
            // Update password using Appwrite's updatePassword method
            // In the latest Appwrite SDK, updatePassword requires both old and new password
            await account.updatePassword(passwordData.newPassword, passwordData.currentPassword);

            showToast('Password changed successfully!', 'success');
            setShowPasswordModal(false);
            setPasswordData({
                currentPassword: '',
                newPassword: '',
                confirmPassword: ''
            });
        } catch (error) {
            console.error('Error changing password:', error);

            // Handle specific error messages
            if (error.code === 401) {
                showToast('Current password is incorrect', 'error');
            } else if (error.code === 429) {
                showToast('Too many attempts. Please try again later.', 'error');
            } else {
                showToast(`Failed to change password: ${error.message}`, 'error');
            }
        } finally {
            setLoading(false);
        }
    };

    if (!user) {
        return (
            <div className="container mx-auto px-4 py-12 text-center">
                <h1 className="text-3xl font-bold gradient-text mb-6">Profile</h1>
                <p className="text-gray-400 mb-8">Please log in to view your profile.</p>
                <a href="/login" className="inline-block px-6 py-3 rounded-lg orange-gradient text-black font-medium hover:orange-gradient-hover transition-all duration-300">
                    Log In
                </a>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12">
            {/* Toast Notification */}
            <AnimatePresence>
                {toast.show && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-lg shadow-lg text-white ${toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'
                            }`}
                    >
                        <div className="flex items-center">
                            <span className="mr-2">
                                {toast.type === 'success' ? '✓' : '✕'}
                            </span>
                            <span>{toast.message}</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-3xl font-bold gradient-text mb-6">Your Profile</h1>

                    <Card className="p-8 mb-8">
                        <div className="flex flex-col md:flex-row gap-8">
                            <div className="md:w-1/3 flex flex-col items-center">
                                <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-800 mb-4">
                                    {profile.profilePictureUrl ? (
                                        <img
                                            src={profile.profilePictureUrl}
                                            alt="Profile"
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-4xl bg-gradient-to-br from-orange-900/30 to-orange-500/30">
                                            {user.name.charAt(0)}
                                        </div>
                                    )}
                                </div>

                                <div className="mb-4">
                                    <label className="block text-gray-300 mb-2 text-center">Upload Profile Picture</label>
                                    <input
                                        type="file"
                                        onChange={handleImageChange}
                                        accept="image/*"
                                        className="text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-orange-500 file:text-black hover:file:bg-orange-600"
                                    />
                                </div>
                            </div>

                            <div className="md:w-2/3">
                                <form onSubmit={saveProfile}>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                        <div>
                                            <label htmlFor="name" className="block text-gray-300 mb-2">
                                                Full Name
                                            </label>
                                            <Input
                                                type="text"
                                                id="name"
                                                name="name"
                                                value={profile.name}
                                                onChange={handleInputChange}
                                                placeholder="Your full name"
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="email" className="block text-gray-300 mb-2">
                                                Email
                                            </label>
                                            <Input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={profile.email}
                                                onChange={handleInputChange}
                                                placeholder="your@email.com"
                                                disabled
                                            />
                                            <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                                        </div>

                                        <div>
                                            <label htmlFor="height" className="block text-gray-300 mb-2">
                                                Height (cm)
                                            </label>
                                            <Input
                                                type="number"
                                                id="height"
                                                name="height"
                                                value={profile.height}
                                                onChange={handleInputChange}
                                                placeholder="170"
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="weight" className="block text-gray-300 mb-2">
                                                Weight (kg)
                                            </label>
                                            <Input
                                                type="number"
                                                id="weight"
                                                name="weight"
                                                value={profile.weight}
                                                onChange={handleInputChange}
                                                placeholder="70"
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="age" className="block text-gray-300 mb-2">
                                                Age
                                            </label>
                                            <Input
                                                type="number"
                                                id="age"
                                                name="age"
                                                value={profile.age}
                                                onChange={handleInputChange}
                                                placeholder="30"
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="fitnessGoal" className="block text-gray-300 mb-2">
                                                Fitness Goal
                                            </label>
                                            <div className="relative">
                                                <select
                                                    id="fitnessGoal"
                                                    name="fitnessGoal"
                                                    value={profile.fitnessGoal}
                                                    onChange={handleInputChange}
                                                    className="input-orange rounded-lg px-4 py-3 w-full focus:outline-none appearance-none bg-gray-900 border border-orange-500/30 text-white"
                                                >
                                                    <option value="">Select a goal</option>
                                                    <option value="weight-loss">Weight Loss</option>
                                                    <option value="muscle-gain">Muscle Gain</option>
                                                    <option value="endurance">Improve Endurance</option>
                                                    <option value="strength">Increase Strength</option>
                                                    <option value="general-fitness">General Fitness</option>
                                                </select>
                                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-orange-500">
                                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <Button
                                        type="submit"
                                        className="w-full"
                                        disabled={loading}
                                    >
                                        {loading ? 'Saving...' : 'Save Profile'}
                                    </Button>
                                </form>
                            </div>
                        </div>
                    </Card>

                    <Card className="p-6">
                        <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center py-3 border-b border-gray-800">
                                <div>
                                    <h3 className="font-medium">Change Password</h3>
                                    <p className="text-sm text-gray-400">Update your account password</p>
                                </div>
                                <Button
                                    variant="secondary"
                                    onClick={() => setShowPasswordModal(true)}
                                >
                                    Change
                                </Button>
                            </div>
                        </div>
                    </Card>
                </div>
            </motion.div>

            {/* Change Password Modal */}
            {showPasswordModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <Card className="w-full max-w-md">
                        <div className="p-6">
                            <h2 className="text-2xl font-bold mb-4">Change Password</h2>

                            <form onSubmit={handleChangePassword}>
                                <div className="mb-4">
                                    <label htmlFor="currentPassword" className="block text-gray-300 mb-2">
                                        Current Password
                                    </label>
                                    <Input
                                        type="password"
                                        id="currentPassword"
                                        name="currentPassword"
                                        value={passwordData.currentPassword}
                                        onChange={handlePasswordInputChange}
                                        placeholder="Enter current password"
                                        required
                                    />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="newPassword" className="block text-gray-300 mb-2">
                                        New Password
                                    </label>
                                    <Input
                                        type="password"
                                        id="newPassword"
                                        name="newPassword"
                                        value={passwordData.newPassword}
                                        onChange={handlePasswordInputChange}
                                        placeholder="Enter new password"
                                        required
                                    />
                                </div>

                                <div className="mb-6">
                                    <label htmlFor="confirmPassword" className="block text-gray-300 mb-2">
                                        Confirm New Password
                                    </label>
                                    <Input
                                        type="password"
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        value={passwordData.confirmPassword}
                                        onChange={handlePasswordInputChange}
                                        placeholder="Confirm new password"
                                        required
                                    />
                                </div>

                                <div className="flex justify-end space-x-3">
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        onClick={() => {
                                            setShowPasswordModal(false);
                                            setPasswordData({
                                                currentPassword: '',
                                                newPassword: '',
                                                confirmPassword: ''
                                            });
                                        }}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        disabled={loading}
                                    >
                                        {loading ? 'Changing...' : 'Change Password'}
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </Card>
                </div>
            )}
        </div>
    );
};

export default Profile;