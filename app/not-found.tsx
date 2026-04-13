import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-layout mx-auto px-6 md:px-10 py-32 md:py-48">
      <p className="text-xs tracking-wide text-[#6B6B6B] font-medium mb-6">
        error 404
      </p>
      <h1 className="text-display font-black tracking-tightest text-[#0A0A0A] mb-8">
        not<br />found
      </h1>
      <Link
        href="/"
        className="text-xs tracking-wide font-bold link-underline hover:opacity-60 transition-opacity duration-200"
      >
        back to home
      </Link>
    </div>
  );
}
