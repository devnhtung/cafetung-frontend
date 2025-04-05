import Link from "next/link";

interface NavLinkProps {
  href: string;
  title: string;
  className?: string;
  onClick?: () => void;
}
function Navlink({ className, href, title }: NavLinkProps) {
  return (
    <Link className={className} href={href} scroll={false}>
      {title}
    </Link>
  );
}

export default Navlink;
