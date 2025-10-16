import Link from "next/link";

export default function Logo() {
  return (
    <div className="flex-1">
      <Link href="/" className="text-4xl font-semibold text-slate-700">
        <span className="text-green-600">go</span>cart
        <span className="text-green-600 text-5xl leading-0">.</span>
      </Link>
    </div>
  );
}
