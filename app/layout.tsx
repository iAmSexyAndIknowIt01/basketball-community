import "./globals.css"
import Header from "@/components/Header"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-linear-to-b from-neutral-900 via-neutral-950 to-neutral-800 text-white min-h-screen">
        <Header />
        <main className="mx-auto max-w-5xl px-4 py-6">
          {children}
        </main>
      </body>
    </html>
  )
}
