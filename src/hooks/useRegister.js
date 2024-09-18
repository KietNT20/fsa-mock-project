import { PATH } from "@/constant/path";
import { registerUser } from "@/services/authService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useRegister = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { mutate: doRegisterUser, isPending } = useMutation({
        mutationKey: ["register"],
        mutationFn: ({ email, name, password }) =>
            registerUser({ email, name, password }),
        onSuccess: (response) => {
            toast.dismiss();
            // Assuming the response contains user data
            const userData = response;
            console.log("Register Success:", userData);
            queryClient.setQueryData(["user"], userData);
            toast.success("Register successfully!!");

            // Delay the confirm dialog to allow toast to show first
            setTimeout(() => {
                const navigateToLogin = window.confirm(
                    "Register successfully! Do you want to return to the login page?"
                );

                if (navigateToLogin) {
                    navigate(PATH.HOME);
                }
            }, 500); // 500ms delay for the toast to show
        },
        onError: (err) => {
            toast.dismiss();
            console.error("Register Error:", err);
            toast.error("Register failed");

            // Delay the confirm dialog to allow toast to show first
            setTimeout(() => {
                window.confirm("Registration failed. Please try again.");
            }, 500); // 500ms delay for the toast to show
        },
    });

    return { doRegisterUser, isPending };
};
