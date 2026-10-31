import Link from "next/link";
import {
  ArrowRight,
  GithubLogo,
  InstagramLogo,
  LinkedinLogo,
  XLogo,
} from "@phosphor-icons/react/dist/ssr";
import { getAllPosts } from "@/lib/posts";
import { SubstackLogo } from "@/components/substack-logo";
import Image from "next/image";

const SUBSTACK = "https://pedromedinaa.substack.com";

// Pedro's photo: La Geria vineyards, Lanzarote.
const FOOTER_PHOTO = "/images/footer-lanzarote.webp";

const writingLinks = [
  { href: "/blog", label: "blog" },
  { href: "/now", label: "now" },
  { href: "/read", label: "read" },
  { href: "/about", label: "about" },
];

const socialLinks = [
  { label: "X", href: "https://x.com/pedroomedinaa_", Icon: XLogo },
  { label: "Instagram", href: "https://www.instagram.com/pedrooomedina/", Icon: InstagramLogo },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/pedro-medina-becerra-0a4b89291/", Icon: LinkedinLogo },
  { label: "GitHub", href: "https://github.com/pedromedinatech", Icon: GithubLogo },
];

const LINK =
  "text-[15px] text-muted hover:text-accent-ink transition-colors duration-150 rounded-[1px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-ink";

function ColumnTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-[13px] font-bold tracking-tight text-ink mb-4">{children}</h2>;
}

/*
 * Paper footer modelled on Trailrunningcal (saved in mymind): columns of links
 * over one of Pedro's landscape photos. The photo starts at the top edge of the
 * footer; the links sit on the sky and the forest bleeds off the bottom.
 */
export function Footer() {
  const year = new Date().getFullYear();
  const recent = getAllPosts().slice(0, 3);

  return (
    <footer className="relative mt-24 md:mt-32 overflow-hidden bg-paper flex flex-col">
      {/* Desktop: behind the whole footer from its top edge. Mobile: the columns
          are too tall to sit on the sky, so the photo goes below them. */}
      <div className="relative order-last aspect-[4/3] md:order-none md:absolute md:inset-0 md:aspect-auto">
        <Image
          src={FOOTER_PHOTO}
          alt=""
          fill
          sizes="100vw"
          quality={85}
          className="object-cover object-[50%_60%] md:object-top"
        />
        {/* Soft edge: the photo blurs and fades into the paper instead of starting on a hard line. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-20 md:h-36 backdrop-blur-md"
          style={{
            background: "linear-gradient(to bottom, rgb(var(--rgb-paper)) 0%, rgb(var(--rgb-paper) / 0.6) 35%, transparent 100%)",
            maskImage: "linear-gradient(to bottom, black 40%, transparent)",
            WebkitMaskImage: "linear-gradient(to bottom, black 40%, transparent)",
          }}
        />
      </div>

      <div className="relative flex flex-col md:min-h-[60vw]">
      <div className="max-w-layout mx-auto px-6 md:px-10 pt-14 md:pt-20 grid grid-cols-2 md:grid-cols-12 gap-x-8 gap-y-12">
        {/* Identity */}
        <div className="col-span-2 md:col-span-4">
          <Link href="/" className="text-[22px] font-black tracking-[-0.03em] text-ink">
            pedro medina
          </Link>
          <p className="mt-3 max-w-[30ch] text-[15px] leading-relaxed text-muted">
            Studying computer science, working at a startup in Seville, and writing one essay a week about what I learn.
          </p>
          <ul className="mt-5 flex items-center gap-4">
            {socialLinks.map(({ label, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="press inline-flex text-ink/70 hover:text-accent-ink transition-colors duration-150 rounded-[2px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-ink"
                >
                  <Icon size={20} weight="regular" />
                </a>
              </li>
            ))}
            <li>
              <a
                href={SUBSTACK}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Substack"
                className="press inline-flex text-ink/70 hover:text-accent-ink transition-colors duration-150 rounded-[2px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-ink"
              >
                <SubstackLogo size={17} color="currentColor" />
              </a>
            </li>
          </ul>
        </div>

        {/* Pages */}
        <nav aria-label="Footer" className="md:col-span-2">
          <ColumnTitle>pages</ColumnTitle>
          <ul className="flex flex-col gap-2.5">
            {writingLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={LINK}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Recent essays */}
        <div className="md:col-span-3">
          <ColumnTitle>recent essays</ColumnTitle>
          <ul className="flex flex-col gap-2.5">
            {recent.map((p) => (
              <li key={p.slug}>
                <Link href={`/blog/${p.slug}`} className={`${LINK} leading-snug inline-block`}>
                  {p.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div className="col-span-2 md:col-span-3">
          <ColumnTitle>newsletter</ColumnTitle>
          <p className="text-[15px] leading-relaxed text-muted mb-4">
            One essay every Sunday, in your inbox. Delivered by Substack.
          </p>
          <form
            action={`${SUBSTACK}/subscribe`}
            method="get"
            target="_blank"
            className="flex h-11 w-full max-w-[340px] border border-ink/25 focus-within:border-ink transition-colors duration-150"
          >
            <label htmlFor="footer-email" className="sr-only">Your email</label>
            <input
              id="footer-email"
              type="email"
              name="email"
              required
              autoComplete="email"
              placeholder="Your email"
              className="min-w-0 flex-1 bg-transparent px-3 text-[15px] text-ink placeholder:text-muted outline-none"
            />
            <button
              type="submit"
              aria-label="Subscribe on Substack"
              className="press grid w-11 place-items-center border-l border-ink/25 text-ink hover:bg-ink hover:text-paper transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-ink"
            >
              <ArrowRight size={16} weight="bold" />
            </button>
          </form>
        </div>
      </div>

      {/* Small print: over the dark forest on desktop, on paper on mobile */}
      <div className="max-w-layout mx-auto px-6 md:px-10 w-full mt-auto pt-12 md:pt-24 pb-6 flex flex-wrap items-center justify-between gap-3 text-[12px] text-muted md:text-paper/85">
        <p>© {year} pedro medina</p>
        <ul className="flex gap-5">
          <li><Link href="/contact" className="hover:text-accent-ink md:hover:text-paper transition-colors duration-150">contact</Link></li>
          <li><Link href="/privacy" className="hover:text-accent-ink md:hover:text-paper transition-colors duration-150">privacy</Link></li>
          <li><a href="/rss.xml" className="hover:text-accent-ink md:hover:text-paper transition-colors duration-150">rss</a></li>
        </ul>
      </div>
      </div>
    </footer>
  );
}
