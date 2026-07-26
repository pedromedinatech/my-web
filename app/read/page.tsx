import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations/fade-in";

export const metadata: Metadata = {
  title: "Read",
  description: "Books, articles, and resources I recommend.",
};

interface ReadingItem {
  title: string;
  author: string;
  url?: string;
  myTake?: { label: string; href: string };
}

interface ReadingCategory {
  title: string;
  subtitle: string;
  items: ReadingItem[];
}

const categories: ReadingCategory[] = [
  {
    title: "[startups & building]",
    subtitle: "What I read about starting things from scratch and making them work.",
    items: [
      { title: "Do Things That Don't Scale", author: "Paul Graham", url: "https://paulgraham.com/ds.html" },
      { title: "How to Be Successful", author: "Sam Altman", url: "https://blog.samaltman.com/how-to-be-successful" },
      { title: "How to Get Rich (Without Getting Lucky)", author: "Naval Ravikant", url: "https://x.com/naval/status/1002103360646823936" },
    ],
  },
  {
    title: "[sales & persuasion]",
    subtitle: "How to communicate, convince, and open doors.",
    items: [
      { title: "How to Enter Side Doors", author: "Maja", url: "https://velvetnoise.substack.com" },
      { title: "How to Ask Mentors for Help", author: "Derek Sivers", url: "https://sive.rs/ment" },
      { title: "Learn to Sell, Learn to Build", author: "Naval Ravikant", url: "https://nav.al/build-sell" },
      { title: "Words", author: "Justin Jackson", url: "https://justinjackson.ca/words.html" },
      { title: "The Double Opt-In Introduction", author: "Fred Wilson", url: "https://avc.com/2009/11/the-double-optin-introduction/" },
      { title: "Sell Yourself", author: "Noah Zender", url: "https://www.noahzender.com/ideas/sell-yourself" },
      { title: "Speak First", author: "Noah Zender", url: "https://www.noahzender.com/ideas/speak-first" },
      { title: "The PAS Framework", author: "Noah Zender", url: "https://www.noahzender.com/ideas/the-pas-framework" },
    ],
  },
  {
    title: "[thinking & mental models]",
    subtitle: "Ideas that changed how I see the world.",
    items: [
      { title: "Keep Your Identity Small", author: "Paul Graham", url: "https://paulgraham.com/identity.html" },
      { title: "Crony Beliefs", author: "Kevin Simler", url: "https://meltingasphalt.com/crony-beliefs" },
      { title: "Obvious to You, Amazing to Others", author: "Derek Sivers", url: "https://sive.rs/obvious" },
      { title: "Maybe You're Not Actually Trying", author: "Cate Hall", url: "https://usefulfictions.substack.com/p/maybe-youre-not-actually-trying" },
      { title: "High Agency in 30 Minutes", author: "George Mack", url: "https://highagency.com/" },
      { title: "Regret Discounting", author: "Noah Zender", url: "https://www.noahzender.com/ideas/regret-discounting" },
      { title: "Information Arbitrage", author: "Noah Zender", url: "https://www.noahzender.com/ideas/information-arbitrage" },
    ],
  },
  {
    title: "[emotional intelligence & people]",
    subtitle: "Understanding others and showing up better.",
    items: [
      { title: "First Impressions & Magnetic Energy", author: "Cole Jaczko", url: "https://x.com/colejaczko/status/2072451006861078692" },
      { title: "The Quiet Art of Leading Any Conversation", author: "Jefferson Fisher", url: "https://www.youtube.com/watch?v=AwPNjPR-vVY&t=1s" },
      { title: "How to Be Polite", author: "Paul Ford", url: "https://ftrain.medium.com/how-to-be-polite-9bf1e69e888c" },
      { title: "The Benjamin Franklin Effect", author: "David McRaney", url: "https://youarenotsosmart.com/2011/10/05/the-benjamin-franklin-effect/" },
      { title: "You Are Contagious", author: "Vanessa Van Edwards", url: "https://www.youtube.com/watch?v=cef35Fk7YD8" },
      { title: "The Charisma Myth", author: "Olivia Fox Cabane", url: "https://www.forbes.com/sites/danschawbel/2012/04/13/how-to-master-the-art-and-science-of-charisma/" },
      { title: "The Laws of Human Nature", author: "Robert Greene", url: "https://singjupost.com/robert-greene-the-laws-of-human-nature-talks-at-google-transcript/" },
    ],
  },
  {
    title: "[ai & future]",
    subtitle: "Where things are going and what to do about it.",
    items: [
      { title: "The Future of Work When Work is Meaningless", author: "Dan Koe", url: "https://letters.thedankoe.com/p/the-future-of-work-when-work-is-meaningless" },
      { title: "The Epidemic of False Thinking", author: "Dan Koe", url: "https://www.youtube.com/watch?v=3rNqNvwNcrM" },
      { title: "Career Advice in the Age of AI", author: "Phil Chen", url: "https://x.com/philhchen/status/2072793818945167475" },
      { title: "Something Big is Happening", author: "Matt Shumer", url: "https://x.com/mattshumer_/status/2021256989876109403" },
    ],
  },
  {
    title: "[favorite books]",
    subtitle: "Books that stayed with me.",
    items: [
      { title: "The Almanack of Naval Ravikant", author: "Eric Jorgenson" },
      { title: "Deep Work", author: "Cal Newport" },
      { title: "Never Split the Difference", author: "Chris Voss" },
      { title: "1984", author: "George Orwell" },
      { title: "Tuesdays with Morrie", author: "Mitch Albom" },
      { title: "If Cats Disappeared from the World", author: "Genki Kawamura" },
      { title: "The Stranger", author: "Albert Camus" },
      { title: "The Picture of Dorian Gray", author: "Oscar Wilde" },
    ],
  },
];

export default function ReadPage() {
  return (
    <div className="max-w-layout mx-auto px-6 md:px-10 pt-28 md:pt-32 pb-20 md:pb-28">

      {/* ── Header ── */}
      <div className="mb-16 md:mb-20">
        <div className="flex items-end justify-between mb-6">
          <h1 className="text-display font-black tracking-tightest">read</h1>
          <Link
            href="/blog"
            className="text-xs tracking-wide font-medium inline-flex items-center gap-1.5 link-underline hover:opacity-60 transition-opacity duration-200"
          >
            read what I write
            <ArrowUpRight size={11} weight="bold" />
          </Link>
        </div>
        <p className="text-[#6B6B6B] text-base max-w-md">
          Books, articles, and resources I recommend.
        </p>
      </div>

      {/* ── Categories ── */}
      {categories.map((category) => (
        <section key={category.title} className="mb-16 md:mb-20">
          <FadeIn>
            <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-2">
              {category.title}
            </h2>
            <p className="text-[#6B6B6B] text-base mb-8">
              {category.subtitle}
            </p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <StaggerContainer staggerDelay={0.06}>
              {category.items.map((item) => (
                <StaggerItem key={item.title}>
                  <div className="flex items-center justify-between py-4 border-b border-[#E5E5E5]">
                    <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2">
                      {item.url ? (
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-bold text-base hover:opacity-60 transition-opacity duration-200 inline-flex items-center gap-1.5"
                        >
                          {item.title}
                          <ArrowUpRight size={12} weight="bold" className="shrink-0" />
                        </a>
                      ) : (
                        <span className="font-bold text-base">{item.title}</span>
                      )}
                      <span className="text-[#6B6B6B] text-sm">
                        {item.author}
                      </span>
                    </div>

                    {item.myTake && (
                      <Link
                        href={item.myTake.href}
                        className="text-xs tracking-wide font-medium text-[#6B6B6B] hover:text-[#0A0A0A] transition-colors duration-200 inline-flex items-center gap-1 shrink-0 ml-4"
                      >
                        {item.myTake.label}
                        <ArrowUpRight size={10} weight="bold" />
                      </Link>
                    )}
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </FadeIn>
        </section>
      ))}
    </div>
  );
}
