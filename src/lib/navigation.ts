/** Central navigation model used by the navbar, footer and mobile menu. */

export interface NavItem {
  label: string;
  href: string;
}

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Menu", href: "/menu" },
  { label: "Cakes", href: "/cakes" },
  { label: "Gallery", href: "/gallery" },
  { label: "Offers", href: "/offers" },
  { label: "Reviews", href: "/reviews" },
  { label: "Contact", href: "/contact" },
];

export function isActivePath(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}
