import Link from "next/link";

interface NavLinkProps {
  href: string;
  title: string;
  className: string;
}
function Navlink({ className, href, title }: NavLinkProps) {
  return (
    <Link className={className} href={href} scroll={false}>
      {title}
    </Link>
  );
}

export default Navlink;
