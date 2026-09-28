import { SubstackLogo } from "@/components/substack-logo";

export const SUBSTACK_SUBSCRIBE_URL =
  "https://pedromedinaa.substack.com/subscribe";

interface SubscribeCardProps {
  substackUrl?: string;
}

export function SubscribeCard({ substackUrl }: SubscribeCardProps) {
  return (
    <aside
      aria-label="Subscribe"
      className="mt-16 mx-auto w-full max-w-[640px] rounded-xl border border-[#E5E5E5] p-5 flex flex-wrap items-center justify-between gap-x-6 gap-y-4"
    >
      <div className="min-w-0 flex-1 basis-[260px]">
        <p className="font-extrabold tracking-tight text-[#0A0A0A]">
          One essay every week
        </p>
        <p className="mt-1 text-[13px] leading-snug text-[#6B6B6B]">
          Get the next one in your inbox. I publish it here and on Substack.
        </p>
        {substackUrl && (
          <a
            href={substackUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block rounded-sm text-[13px] text-[#6B6B6B] underline decoration-[#E5E5E5] underline-offset-2 hover:text-[#0A0A0A] hover:decoration-[#0A0A0A] transition-colors duration-200 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-[#0A0A0A]"
          >
            or comment on this post on Substack ↗
          </a>
        )}
      </div>
      <a
        href={SUBSTACK_SUBSCRIBE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex w-full sm:w-auto shrink-0 items-center justify-center gap-2 rounded-lg bg-[#FF6719] px-4 py-2.5 text-[13px] font-semibold text-white hover:bg-[#E85A10] transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0A0A0A]"
      >
        <SubstackLogo size={13} color="#FFFFFF" />
        Subscribe on Substack
      </a>
    </aside>
  );
}
