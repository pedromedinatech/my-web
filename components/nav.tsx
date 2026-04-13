"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, List, ArrowUpRight } from "@phosphor-icons/react";

const pageLinks = [
  { href: "/about", label: "about" },
  { href: "/blog", label: "blog" },
];

const contactLinks = [
  { label: "iampedromedina@gmail.com", href: "mailto:iampedromedina@gmail.com" },
  { label: "x", href: "https://x.com/pedroomedinaa_" },
  { label: "instagram", href: "https://www.instagram.com/pedrooomedina/" },
  { label: "linkedin", href: "https://www.linkedin.com/in/pedro-medina-becerra-0a4b89291/" },
];

export function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const isHome = pathname === "/";
  const textColor = isHome ? "text-white" : "text-[#0A0A0A]";
  const iconColor = isHome && !scrolled ? "text-white" : "text-[#0A0A0A]";

  useEffect(() => { setMounted(true); }, []);
  useEffect(() => { setMenuOpen(false); }, [pathname]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      {/* ── Desktop: two-column top-right ── */}
      <nav
        className="fixed top-7 right-6 md:right-12 lg:right-16 z-50 hidden md:flex items-start gap-20"
        aria-label="Main navigation"
      >
        {/* Column 1: page links */}
        <div className="flex flex-col gap-[5px]">
          {pageLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                style={{ fontWeight: 300, fontSize: "15px", letterSpacing: "0" }}
                className={`leading-relaxed transition-opacity duration-200 ${textColor} ${
                  isActive ? "opacity-100" : "opacity-50 hover:opacity-100"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Column 2: email + location */}
        <div className="flex flex-col gap-[5px]">
          <a
            href="mailto:iampedromedina@gmail.com"
            style={{ fontWeight: 300, fontSize: "15px", letterSpacing: "0" }}
            className={`leading-relaxed transition-all duration-300 ease-out opacity-50 hover:opacity-100 hover:translate-x-2 inline-block ${textColor}`}
          >
            iampedromedina@gmail.com
          </a>
          <span
            style={{ fontWeight: 300, fontSize: "15px", letterSpacing: "0" }}
            className={`leading-relaxed opacity-30 ${textColor}`}
          >
            based in cordoba, spain
          </span>
        </div>
      </nav>

      {/* ── Mobile hamburger ── */}
      <button
        className={`fixed top-5 right-5 z-50 md:hidden p-1.5 transition-opacity hover:opacity-50 ${menuOpen ? "text-[#0A0A0A]" : iconColor}`}
        onClick={() => setMenuOpen((v) => !v)}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
      >
        {menuOpen ? <X size={20} weight="light" /> : <List size={20} weight="light" />}
      </button>

      {/* ── Mobile full-screen menu ── */}
      {mounted && (
        <div
          aria-hidden={!menuOpen}
          className="fixed inset-0 z-40 bg-white flex flex-col justify-end px-6 pb-16 md:hidden"
          style={{
            clipPath: menuOpen ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)",
            transition: menuOpen
              ? "clip-path 350ms cubic-bezier(0.23, 1, 0.32, 1)"
              : "clip-path 160ms cubic-bezier(0.23, 1, 0.32, 1)",
            pointerEvents: menuOpen ? "auto" : "none",
          }}
        >
          {/* Page links */}
          <ul className="flex flex-col gap-1 mb-10">
            {pageLinks.map((link, i) => (
              <li
                key={link.href}
                style={{
                  opacity: menuOpen ? 1 : 0,
                  transform: menuOpen ? "translateY(0)" : "translateY(10px)",
                  transition: menuOpen
                    ? `opacity 280ms ${i * 60 + 120}ms cubic-bezier(0.23,1,0.32,1), transform 280ms ${i * 60 + 120}ms cubic-bezier(0.23,1,0.32,1)`
                    : "opacity 80ms ease-out, transform 80ms ease-out",
                }}
              >
                <Link
                  href={link.href}
                  className="text-[2.75rem] font-black tracking-[-0.03em] text-[#0A0A0A] leading-none block py-2 hover:opacity-30 transition-opacity duration-150"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Contact links */}
          <ul className="flex flex-col gap-2 border-t border-[#E5E5E5] pt-6">
            {contactLinks.map((link, i) => (
              <li
                key={link.href}
                style={{
                  opacity: menuOpen ? 1 : 0,
                  transition: menuOpen
                    ? `opacity 200ms ${i * 40 + 350}ms ease-out`
                    : "opacity 60ms ease-out",
                }}
              >
                <a
                  href={link.href}
                  target={link.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm text-[#6B6B6B] hover:text-[#0A0A0A] transition-colors duration-150"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                  <ArrowUpRight size={11} weight="bold" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
