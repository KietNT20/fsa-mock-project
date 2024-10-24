import { API } from "@/api/apiUrl";
import { saveUserProfile } from "@/store/actions/userProfileAction";
import axiosInstance from "@/utils/axiosInstance";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const useAvatarUpload = () => {
    const { userProfile } = useSelector((state) => state.userProfile);

    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [avatarUrl, setAvatarUrl] = useState(null);

    const uploadAvatar = async (file) => {
        const formData = new FormData();
        formData.append("image", file);

        setIsLoading(true);
        setError(null);

        try {
            const response = await axiosInstance.post(API.AVATAR, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (response.fileAvartaPath) {
                setAvatarUrl(response.fileAvartaPath);

                dispatch(
                    saveUserProfile({
                        ...userProfile,
                        avarta: response.fileAvartaPath,
                    }),
                );
                console.log("Avatar URL1234:", userProfile);

                console.log("Avatar URL:", response.fileAvartaPath);
            } else {
                setError("Avatar URL not found in response.");
            }

            setIsLoading(false);
        } catch (err) {
            console.error("Error during upload:", err);
            setError(err.message);
            setIsLoading(false);
        }
    };

    return {
        isLoading,
        error,
        avatarUrl,
        uploadAvatar,
    };
};

export default useAvatarUpload;
