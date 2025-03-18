// components/SocialMediaLinks.tsx
import { FaFacebookF, FaInstagram, FaTiktok, FaThreads } from "react-icons/fa6";

interface SocialMediaItem {
  href: string;
  icon: React.ReactNode;
  tooltip: string;
}

const socialMediaLinks: SocialMediaItem[] = [
  {
    href: "https://facebook.com/cafetung.vn",
    icon: <FaFacebookF className="w-5 h-5 text-white" />,
    tooltip: "Facebook",
  },
  {
    href: "#",
    icon: <FaThreads className="w-5 h-5 text-white" />,
    tooltip: "Thread",
  },
  {
    href: "https://instagram.com/cafetung",
    icon: <FaInstagram className="w-5 h-5 text-white" />,
    tooltip: "Instagram",
  },
  {
    href: "#",
    icon: <FaTiktok className="w-6 h-6 text-white" />,
    tooltip: "Tiktok",
  },
];

export default function SocialMediaLinks() {
  return (
    <div className="absolute bottom-8 left-6 flex flex-col space-y-4 z-1">
      {socialMediaLinks.map((item, index) => (
        <div key={index} className="tooltip group">
          <a
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/70 hover:text-white transition duration-300"
          >
            {item.icon}
          </a>
          <span className="tooltip-text">{item.tooltip}</span>
        </div>
      ))}
    </div>
  );
}
