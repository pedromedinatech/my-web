import type { Metadata } from "next";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "How to reach Pedro Medina.",
  alternates: { canonical: "/contact" },
};

const LINK = "underline decoration-line underline-offset-[3px] hover:text-accent-ink hover:decoration-accent-ink transition-colors duration-150";

export default function ContactPage() {
  return (
    <div className="max-w-layout mx-auto px-6 md:px-10 pt-28 md:pt-32 pb-8">
      <h1 className="text-display font-black tracking-tightest">contact</h1>
      <div className="mt-10 max-w-[62ch] space-y-5 text-[17px] leading-relaxed">
        <p>
          The best way to reach me is email:{" "}
          <a href={`mailto:${SITE.email}`} className={LINK}>{SITE.email}</a>. I read everything I get and reply to most messages within a few days, usually on the weekend.
        </p>
        <p>
          Write to me if you read one of my essays and think I got something wrong, if you are building something early and want a hand with sales or customer support, or if you are in Seville and want to meet for a coffee or a run. I like hearing where people disagree more than where they agree.
        </p>
        <p>
          I&apos;m also on{" "}
          <a href="https://x.com/pedroomedinaa_" className={LINK} target="_blank" rel="noopener noreferrer">X</a>,{" "}
          <a href="https://www.instagram.com/pedrooomedina/" className={LINK} target="_blank" rel="noopener noreferrer">Instagram</a> and{" "}
          <a href="https://github.com/pedromedinatech" className={LINK} target="_blank" rel="noopener noreferrer">GitHub</a>. If you want the essays by email, they go out every Sunday on{" "}
          <a href={SITE.substack} className={LINK} target="_blank" rel="noopener noreferrer">Substack</a>.
        </p>
        <p className="text-muted">
          I don&apos;t do sponsored posts or sell links, so there is no need to ask.
        </p>
      </div>
    </div>
  );
}
