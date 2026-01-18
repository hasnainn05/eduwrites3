import React from "react";

interface WhatsAppIconProps {
  size?: number;
  className?: string;
  showText?: boolean;
  text?: string;
}

export const WhatsAppIcon: React.FC<WhatsAppIconProps> = ({
  size = 14,
  className = "",
  showText = false,
  text = "+1 365 8291551",
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={`text-[#25D366] ${className}`}
    >
      <path d="M12 0C5.38 0 0 5.38 0 12c0 2.12.54 4.16 1.51 5.94L0 24l6.48-1.51C8.78 23.45 10.35 24 12 24c6.62 0 12-5.38 12-12S18.62 0 12 0zm0 22c-1.54 0-3.05-.41-4.36-1.18l-.31-.18-3.24.76.77-3.15-.2-.31C2.45 15.95 2 14.02 2 12c0-5.52 4.48-10 10-10s10 4.48 10 10-4.48 10-10 10z" />
      <path d="M17.45 11.68c-.24-.12-1.42-.7-1.64-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.01-.37-1.93-1.19-.71-.64-1.19-1.42-1.33-1.66-.14-.24-.02-.37.11-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.19-.48-.39-.41-.54-.42-.14-.01-.3-.01-.46-.01-.16 0-.42.06-.64.31-.22.24-.84.82-.84 2.01 0 1.19.86 2.33.98 2.49.12.16 1.69 2.58 4.1 3.62.57.24 1.02.39 1.37.5.57.18 1.1.16 1.51.09.46-.07 1.41-.58 1.61-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28z" />
    </svg>
  );
};

export const WhatsAppButton: React.FC<{
  phoneNumber?: string;
  message?: string;
  children?: React.ReactNode;
  className?: string;
  showIcon?: boolean;
  iconSize?: number;
}> = ({
  phoneNumber = "13658291551",
  message = "Hi, I'm interested in EduWrites services",
  children,
  className = "",
  showIcon = true,
  iconSize = 14,
}) => {
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      title="Chat on WhatsApp"
    >
      {showIcon && <WhatsAppIcon size={iconSize} />}
      {children}
    </a>
  );
};

export const WhatsAppLink: React.FC<{
  phoneNumber?: string;
  className?: string;
  displayText?: string;
  iconSize?: number;
  showIcon?: boolean;
}> = ({
  phoneNumber = "13658291551",
  className = "",
  displayText = "+1 365 8291551",
  iconSize = 14,
  showIcon = true,
}) => {
  const whatsappUrl = `https://wa.me/${phoneNumber}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      title="Chat on WhatsApp"
    >
      <div className="flex items-center gap-1.5">
        {showIcon && <WhatsAppIcon size={iconSize} />}
        <span>{displayText}</span>
      </div>
    </a>
  );
};
