import "./globals.css"
import Link from "next/link"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {/* Navbar */}
        <header className="sticky top-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
            <Link href="/" className="text-lg font-bold">
              🏀 Hoop
            </Link>

            <nav className="flex gap-6 text-sm text-gray-300">
              <Link href="/games" className="hover:text-white">Games</Link>
              <Link href="/community" className="hover:text-white">Community</Link>
              <Link href="/profile" className="hover:text-white">Profile</Link>
            </nav>
          </div>
        </header>

        {/* Page */}
        <main className="mx-auto max-w-5xl px-4 py-6">
          {children}
        </main>
      </body>
    </html>
  )
}
