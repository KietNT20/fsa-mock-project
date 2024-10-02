// src/utils/avatarUtils.js
import { avataaars } from "@dicebear/collection"; // Import avatar style
import { createAvatar } from "@dicebear/core";

// Function to generate an avatar SVG using DiceBear
export const generateCartoonAvatar = (name) => {
  const avatar = createAvatar(avataaars, {
    seed: name,
    radius: 20,
    size: 180,
  });

  return `data:image/svg+xml;utf8,${encodeURIComponent(avatar)}`;
};
