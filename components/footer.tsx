import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";

const navLinks = [
  { href: "/", label: "home" },
  { href: "/about", label: "about" },
  { href: "/blog", label: "blog" },
];

const socialLinks = [
  { label: "X", href: "https://x.com/pedroomedinaa_" },
  { label: "Instagram", href: "https://www.instagram.com/pedrooomedina/" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/pedro-medina-becerra-0a4b89291/" },
  { label: "GitHub", href: "https://github.com/pedromedinatech" },
];

const EMAIL = "iampedromedina@gmail.com";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{ backgroundColor: "#121212" }}>

      {/* ── Main section ── */}
      <div className="max-w-layout mx-auto px-6 md:px-10 pt-16 pb-14 md:pt-20 md:pb-16 flex flex-col md:flex-row justify-between gap-14 md:gap-32">

        {/* Left: nav links */}
        <nav aria-label="Footer navigation">
          <ul className="flex flex-col gap-[6px]">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-white/50 hover:text-white transition-colors duration-200"
                  style={{
                    fontFamily: "'Inter Variable', 'Helvetica Neue', Arial, sans-serif",
                    fontWeight: 300,
                    fontSize: "0.8125rem",
                    letterSpacing: "0.01em",
                  }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right: email */}
        <div className="flex flex-col justify-start">
          <a
            href={`mailto:${EMAIL}`}
            className="text-white/60 hover:text-white transition-colors duration-200 w-fit"
            style={{
              fontFamily: "'Inter Variable', 'Helvetica Neue', Arial, sans-serif",
              fontWeight: 300,
              fontSize: "0.8125rem",
              letterSpacing: "0.01em",
            }}
          >
            {EMAIL}
          </a>
        </div>
      </div>

      {/* ── Bottom bar: copyright + social links ── */}
      <div
        className="max-w-layout mx-auto px-6 md:px-10 py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
        style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
      >
        <p
          className="text-[11px] tracking-wide text-white/20"
          style={{ fontFamily: "'Inter Variable', 'Helvetica Neue', Arial, sans-serif" }}
        >
          © {year} pedro medina
        </p>

        <ul className="flex items-center gap-6">
          {socialLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] tracking-wide text-white/20 inline-flex items-center gap-1 hover:text-white/60 transition-colors duration-200"
                style={{ fontFamily: "'Inter Variable', 'Helvetica Neue', Arial, sans-serif" }}
              >
                {link.label.toLowerCase()}
                <ArrowUpRight size={10} weight="bold" />
              </a>
            </li>
          ))}
        </ul>
      </div>

    </footer>
  );
}
