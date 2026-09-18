import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getUser, resendUserToken, updateUser } from "../../../api/users.api";
import { useI18n } from "../../../context/AppContext";
import Notification from '../../../components/ui/notification';
import type { UpdateUserData } from "../../../api/interfaces/users/updateUserData";

interface UserProfile {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    avatar_url: string | null;
    is_active: boolean;
    role: {
        id: number;
        name: string;
    };
}

const Profile = () => {

    const { id } = useParams();
    const { translator } = useI18n();

    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState<"success" | "error" | "warning">();
    const [messageVisibility, setMessageVisibility] = useState<"visible" | "hidden">("hidden");

    const [user, setUser] = useState<UserProfile | null>(null);
    const [refresh, setRefresh] = useState(0);

    useEffect(() => {

        if (!id) return;

        const fetchProfile = async () => {
            const profile = await getUser(Number(id));

            console.log(profile);

            setUser(profile);
        };

        fetchProfile();

    }, [id, refresh]);

    const handleUpdateProfile = async () => {
        try {
            const updateUserData: UpdateUserData = {
                first_name: user.first_name,
                last_name: user.last_name,
                avatar_url: user.avatar_url,
                is_active: user.is_active,
                phone: user.phone
            };
            const response = await updateUser(user.id, updateUserData);
            // setMessage(translator("user-updated"));
            setMessage(String(response.status));
            setMessageType("success");
            setRefresh( refresh + 1);
            setMessageVisibility("visible");
        } catch (error) {
            if (error.message.status === 403) {
                setMessage(translator("forbidden"));
            }
            setMessage(error.message);
            setMessageType("error");
            setMessageVisibility("visible");
        }
    }

    const resendToken = async () => {
        try {
            const response = await resendUserToken(user.id);
            setMessage(translator("resend-token"));
            setMessageType("success");
            setMessageVisibility("visible");
        } catch (error) {
            setMessage(error.message);
            setMessageType("error");
            setMessageVisibility("visible");
        }
    }

    if (!user) {
        return (
            <div className="mx-auto w-full h-full p-6">
                <p className="text-sm text-gray-500">
                    {translator("loading")}
                </p>
            </div>
        );
    }

    return (
        <div className="mx-auto w-full h-full overflow-y-auto p-6">

            {messageVisibility === "visible" && (
                <Notification
                    message={message}
                    type={messageType}
                    onClose={() => setMessageVisibility("hidden")}
                />
            )}

            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-semibold text-gray-900">
                    {translator("profile")}
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                    {translator("manage_account_information")}
                </p>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

                {/* Profile card */}
                <div className="rounded-lg border border-gray-200 bg-white p-6">

                    <div className="flex flex-col items-center">

                        {/* Avatar */}
                        {user.avatar_url ? (
                            <img
                                src={user.avatar_url}
                                alt={`${user.first_name} ${user.last_name}`}
                                className="h-24 w-24 rounded-full object-cover"
                            />
                        ) : (
                            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gray-100 text-2xl font-medium text-gray-600">
                                {user.first_name?.charAt(0)}
                                {user.last_name?.charAt(0)}
                            </div>
                        )}

                        {/* Name */}
                        <h2 className="mt-4 text-lg font-semibold text-gray-900">
                            {user.first_name} {user.last_name}
                        </h2>

                        {/* Email */}
                        <p className="mt-1 text-sm text-gray-500">
                            {user.email}
                        </p>

                        {/* Status */}
                        <span
                            className={`mt-3 rounded-full px-3 py-1 text-xs font-medium ${
                                user.is_active
                                    ? "bg-green-100 text-green-700"
                                    : "bg-red-100 text-red-700"
                            }`}
                        >
                            {user.is_active
                                ? translator("active")
                                : translator("inactive")}
                        </span>

                    </div>

                </div>

                {/* Personal information */}
                <div className="rounded-lg border border-gray-200 bg-white p-6 lg:col-span-2">

                    <div className="mb-6">
                        <h2 className="text-lg font-semibold text-gray-900">
                            {translator("personal_information")}
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            {translator("account_information")}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                        {/* First name */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                {translator("first_name")}
                            </label>

                            <input
                                type="text"
                                value={user.first_name}
                                onChange={(e) =>
                                    setUser({
                                        ...user,
                                        first_name: e.target.value
                                    })
                                }
                                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-500"
                            />
                        </div>

                        {/* Last name */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                {translator("last_name")}
                            </label>

                            <input
                                type="text"
                                value={user.last_name}
                                onChange={(e) =>
                                    setUser({
                                        ...user,
                                        last_name: e.target.value
                                    })
                                }
                                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-500"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                {translator("email")}
                            </label>

                            <input
                                type="email"
                                value={user.email}
                                onChange={(e) =>
                                    setUser({
                                        ...user,
                                        email: e.target.value
                                    })
                                }
                                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-500"
                            />
                        </div>

                        {/* Phone */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                {translator("phone")}
                            </label>

                            <input
                                type="text"
                                value={user.phone}
                                onChange={(e) =>
                                    setUser({
                                        ...user,
                                        phone: e.target.value
                                    })
                                }
                                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-500"
                            />
                        </div>

                        {/* Role */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                {translator("role")}
                            </label>

                            <input
                                type="text"
                                value={user.role?.name ?? ""}
                                disabled
                                className="w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-500"
                            />
                        </div>

                        {/* Account status */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                {translator("account_status")}
                            </label>

                            {user.role?.name === "Admin" ? (
                                <input
                                    type="text"
                                    value={
                                        user.is_active
                                            ? translator("active")
                                            : translator("inactive")
                                    }
                                    disabled
                                    className="w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-500"
                                />
                            ) : (
                                <div className="flex items-center gap-6 py-2">

                                    <label className="flex items-center gap-2 text-sm text-gray-700">
                                        <input
                                            type="radio"
                                            name="account_status"
                                            checked={user.is_active === true}
                                            onChange={() =>
                                                setUser({
                                                    ...user,
                                                    is_active: true
                                                })
                                            }
                                        />
                                        {translator("active")}
                                    </label>

                                    <label className="flex items-center gap-2 text-sm text-gray-700">
                                        <input
                                            type="radio"
                                            name="account_status"
                                            checked={user.is_active === false}
                                            onChange={() =>
                                                setUser({
                                                    ...user,
                                                    is_active: false
                                                })
                                            }
                                        />
                                        {translator("inactive")}
                                    </label>

                                </div>
                            )}
                        </div>

                    </div>

                    {/* Save */}
                    <div className="mt-6 flex justify-end">
                        <button
                            type="button"
                            onClick={() => handleUpdateProfile()}
                            className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
                        >
                            {translator("save_changes")}
                        </button>
                    </div>

                </div>

            </div>


            <div className="mt-6 flex gap-5 rounded border border-gray-200 bg-white p-6 md:flex-row">

                {/* Security */}
                <div className="rounded border border-gray-200 bg-white p-6">
                    <div className="mb-6">
                        <h2 className="text-lg font-semibold text-gray-900">
                            {translator("security")}
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            {translator("manage_account_password")}
                        </p>
                    </div>

                    <button
                        type="button"
                        className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                        {translator("change_password")}
                    </button>
                </div>

                {/* Account activation */}
                {!user.is_active && (
                    <div className="rounded border border-gray-200 bg-white p-6">
                        <div className="mb-6">
                            <h2 className="text-lg font-semibold text-gray-900">
                                {translator("account_activation")}
                            </h2>

                            <p className="mt-1 text-sm text-gray-500">
                                {translator("resend_activation_token_description")}
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={() => resendToken()}
                            className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                        >
                            {translator("resend_activation_token")}
                        </button>
                    </div>
                )}

            </div>

        </div>
    );
};

export default Profile;