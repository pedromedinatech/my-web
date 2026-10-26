"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, List, ArrowUpRight } from "@phosphor-icons/react";

const pageLinks = [
  { href: "/", label: "home" },
  { href: "/about", label: "about" },
  { href: "/blog", label: "blog" },
  { href: "/photos", label: "photos" },
  { href: "/read", label: "read" },
  { href: "/now", label: "now" },
];

const contactLinks = [
  { label: "iampedromedina@gmail.com", href: "mailto:iampedromedina@gmail.com" },
  { label: "x", href: "https://x.com/pedroomedinaa_" },
  { label: "instagram", href: "https://www.instagram.com/pedrooomedina/" },
  { label: "linkedin", href: "https://www.linkedin.com/in/pedro-medina-becerra-0a4b89291/" },
];

// Height of the compact bar (h-14). Pages start their content at pt-28 / pt-32,
// so the bar never covers anything while the page sits at the top.
const BAR_H = 56;
// Scroll distance after which the tall two-column nav collapses into the bar.
const COMPACT_AFTER = 4;

// Short, eased transition; switched off for prefers-reduced-motion.
const FADE =
  "transition-[opacity,visibility,transform,color,background-color,border-color] duration-200 ease-out motion-reduce:transition-none";

// Visible keyboard focus that follows the text colour (white on the photo, black on white).
const FOCUS =
  "rounded-[1px] focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-current";

export function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  // compact:  the page has been scrolled; the nav becomes a single-line bar.
  // overHero: the nav still sits on the home photo (transparent, white text).
  // The footer is paper now, so it never needs light text.
  const [compact, setCompact] = useState(false);
  const [overHero, setOverHero] = useState(isHome);

  useEffect(() => { setMounted(true); }, []);
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  useEffect(() => {
    const compute = () => {
      const y = window.scrollY;
      setCompact(y > COMPACT_AFTER);

      // Any block marked data-nav-on-dark (the home photo, the 404 night panel)
      // puts the nav in light text while the bar sits over it.
      const dark = document.querySelector("[data-nav-on-dark]");
      const r = dark?.getBoundingClientRect();
      setOverHero(!!r && r.top < BAR_H && r.bottom > BAR_H);
    };

    compute();
    window.addEventListener("scroll", compute, { passive: true });
    window.addEventListener("resize", compute, { passive: true });
    return () => {
      window.removeEventListener("scroll", compute);
      window.removeEventListener("resize", compute);
    };
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setMenuOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  // White bar as soon as the page is scrolled, except while still over the home photo.
  const solid = compact && !overHero;
  // White text only while the nav is transparent over the home photo.
  const onDark = !solid && overHero;

  const expandedTextColor = onDark ? "text-white" : "text-ink";
  const barLinkColor = (isActive: boolean) =>
    onDark
      ? isActive ? "text-white" : "text-white/60 hover:text-white focus-visible:text-white"
      : isActive ? "text-ink" : "text-muted hover:text-ink focus-visible:text-ink";
  const iconColor = menuOpen || !onDark ? "text-ink" : "text-white";
  const showBar = solid && !menuOpen;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 h-14 ${showBar ? "" : "pointer-events-none"}`}
      >
        {/* ── Bar background: translucent paper (content scrolls under it), only once scrolled off the photo ── */}
        <div
          aria-hidden
          className={`absolute inset-0 border-b ${FADE} ${
            showBar
              ? "bg-paper/80 border-line opacity-100"
              : "bg-paper/0 border-transparent opacity-0"
          }`}
          style={{ backdropFilter: "blur(20px) saturate(160%)", WebkitBackdropFilter: "blur(20px) saturate(160%)" }}
        />

        <nav aria-label="Main navigation" className="hidden md:block">
          {/* ── Desktop, top of the page: the original two-column block, top-right ── */}
          <div
            className={`pointer-events-auto absolute top-7 right-12 lg:right-16 flex items-start gap-20 whitespace-nowrap ${FADE} ${
              compact ? "invisible opacity-0 -translate-y-1" : "visible opacity-100 translate-y-0"
            }`}
          >
            {/* Column 1: page links */}
            <div className="flex flex-col gap-[5px]">
              {pageLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    aria-current={isActive ? "page" : undefined}
                    style={{ fontWeight: 300, fontSize: "15px", letterSpacing: "0" }}
                    className={`leading-relaxed transition-opacity duration-200 ${FOCUS} ${expandedTextColor} ${
                      isActive ? "opacity-100" : "opacity-50 hover:opacity-100 focus-visible:opacity-100"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            {/* Column 2: email + location — only from xl up, where it always fits */}
            <div className="hidden xl:flex flex-col gap-[5px]">
              <a
                href="mailto:iampedromedina@gmail.com"
                style={{ fontWeight: 300, fontSize: "15px", letterSpacing: "0" }}
                className={`leading-relaxed transition-all duration-300 ease-out opacity-50 hover:opacity-100 focus-visible:opacity-100 hover:translate-x-2 motion-reduce:transition-none motion-reduce:hover:translate-x-0 inline-block ${FOCUS} ${expandedTextColor}`}
              >
                iampedromedina@gmail.com
              </a>
              <span
                style={{ fontWeight: 300, fontSize: "15px", letterSpacing: "0" }}
                className={`leading-relaxed opacity-30 ${expandedTextColor}`}
              >
                based in sevilla, spain
              </span>
            </div>
          </div>

          {/* ── Desktop, once scrolled: one line of small links inside the bar ── */}
          <ul
            className={`pointer-events-auto absolute inset-y-0 right-12 lg:right-16 flex items-center gap-7 whitespace-nowrap ${FADE} ${
              compact ? "visible opacity-100 translate-y-0" : "invisible opacity-0 translate-y-1"
            }`}
          >
            {pageLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={isActive ? "page" : undefined}
                    style={{ fontWeight: 300, fontSize: "13px", letterSpacing: "0.01em" }}
                    className={`transition-colors duration-200 motion-reduce:transition-none ${FOCUS} ${barLinkColor(isActive)}`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* ── Mobile hamburger, centred in the 56px bar ── */}
        <button
          className={`press pointer-events-auto absolute top-3 right-5 md:hidden p-1.5 hover:opacity-50 ${FADE} ${FOCUS} ${iconColor}`}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          {menuOpen ? <X size={20} weight="light" /> : <List size={20} weight="light" />}
        </button>
      </header>

      {/* ── Mobile full-screen menu: opens from the right, where the button is, and closes back the same way ── */}
      {mounted && (
        <div
          id="mobile-menu"
          aria-hidden={!menuOpen}
          className="fixed inset-0 z-40 bg-paper flex flex-col justify-end px-6 pb-16 md:hidden"
          style={{
            clipPath: menuOpen ? "inset(0 0 0 0%)" : "inset(0 0 0 100%)",
            // visibility keeps the closed menu's links out of the tab order
            visibility: menuOpen ? "visible" : "hidden",
            transition: menuOpen
              ? "clip-path 350ms cubic-bezier(0.23, 1, 0.32, 1), visibility 0s"
              : "clip-path 160ms cubic-bezier(0.23, 1, 0.32, 1), visibility 0s linear 160ms",
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
                  className={`text-[2.75rem] font-black tracking-[-0.03em] text-ink leading-none block py-2 hover:opacity-30 transition-opacity duration-150 ${FOCUS}`}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Contact links */}
          <ul className="flex flex-col gap-2 border-t border-line pt-6">
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
                  className={`inline-flex items-center gap-1 text-sm text-muted hover:text-ink transition-colors duration-150 ${FOCUS}`}
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
