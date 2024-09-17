// src/utils/toggleSignInUpMode.js
export const toggleSignInUpMode = () => {
  const sign_in_btn = document.querySelector("#sign-in-btn");
  const sign_up_btn = document.querySelector("#sign-up-btn");
  const container = document.querySelector(".container");

  if (!sign_in_btn || !sign_up_btn || !container) return;

  const handleSignUp = () => {
    container.classList.add("sign-up-mode");
  };

  const handleSignIn = () => {
    container.classList.remove("sign-up-mode");
  };

  sign_up_btn.addEventListener("click", handleSignUp);
  sign_in_btn.addEventListener("click", handleSignIn);

  // Cleanup function to remove event listeners when needed
  return () => {
    sign_up_btn.removeEventListener("click", handleSignUp);
    sign_in_btn.removeEventListener("click", handleSignIn);
  };
};
