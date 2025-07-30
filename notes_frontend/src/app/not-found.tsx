import Link from "next/link";
export default function NotFound() {
  return (
    <div className="flex items-center justify-center h-screen bg-[var(--background)]">
      <div className="max-w-md w-full text-center">
        <h1 className="text-5xl font-bold mb-6 text-primary">404</h1>
        <p className="text-lg mb-4">Page Not Found</p>
        <Link href="/" className="inline-block px-4 py-2 bg-primary text-white rounded font-semibold">Return Home</Link>
      </div>
    </div>
  );
}
