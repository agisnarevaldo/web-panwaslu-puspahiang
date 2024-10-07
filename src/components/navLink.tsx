import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";

type NavLinkProps = {
  href: string;
  icon: string;
  text: string;
};

export default function NavLink({ href, icon, text }: NavLinkProps) {
  return (
    <Link
      href={href}
      className="flex font-medium antialiased text-lg items-center gap-1 h-[2.4rem] px-3 rounded-md hover:bg-yellow-200 dark:hover:bg-yellow-900"
    >
      <Icon icon={icon} />
      {text}
    </Link>
  );
}
