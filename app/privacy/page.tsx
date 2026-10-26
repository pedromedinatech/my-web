import type { Metadata } from "next";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy",
  description: "What this site collects and why.",
  alternates: { canonical: "/privacy" },
};

const LINK = "underline decoration-line underline-offset-[3px] hover:text-accent-ink hover:decoration-accent-ink transition-colors duration-150";

export default function PrivacyPage() {
  return (
    <div className="max-w-layout mx-auto px-6 md:px-10 pt-28 md:pt-32 pb-8">
      <h1 className="text-display font-black tracking-tightest">privacy</h1>
      <p className="mt-6 text-[13px] text-muted">Last updated: October 2026</p>
      <div className="mt-10 max-w-[62ch] space-y-5 text-[17px] leading-relaxed">
        <p>
          This is a personal site. I don&apos;t sell anything, I don&apos;t run ads and I don&apos;t use cookies. Here is everything that happens with data when you visit.
        </p>
        <h2 className="pt-4 text-[19px] font-bold tracking-tight">Analytics</h2>
        <p>
          I use Vercel Web Analytics to count visits: which pages are read, from which site people arrive, and the rough country and device type. It doesn&apos;t use cookies and it doesn&apos;t give me anything that identifies you as a person. I only look at totals.
        </p>
        <h2 className="pt-4 text-[19px] font-bold tracking-tight">Hosting</h2>
        <p>
          The site is hosted on Vercel, which, like any web host, processes your IP address to deliver the pages and keeps short-lived technical logs to keep the service running and secure.
        </p>
        <h2 className="pt-4 text-[19px] font-bold tracking-tight">Newsletter and email</h2>
        <p>
          The email field in the footer only opens my Substack page with your address filled in. If you subscribe, Substack stores your email under{" "}
          <a href="https://substack.com/privacy" className={LINK} target="_blank" rel="noopener noreferrer">its own privacy policy</a>, and you can unsubscribe from any email. If you write to me, I keep your message only to reply.
        </p>
        <h2 className="pt-4 text-[19px] font-bold tracking-tight">Your rights</h2>
        <p>
          Under the GDPR you can ask what data I have about you, ask me to correct it or delete it. Write to{" "}
          <a href={`mailto:${SITE.email}`} className={LINK}>{SITE.email}</a> and I&apos;ll take care of it.
        </p>
      </div>
    </div>
  );
}
