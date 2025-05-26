import "@/styles/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { GeistMono } from "geist/font/mono"
import { GeistSans } from "geist/font/sans"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import CursorBlob from "@/components/cursor-blob"

export const metadata = {
  title: "Bréval Le Floch | Creative Developer",
  description: "Portfolio of Bréval Le Floch - Creative Developer, CTO, and Co-founder",
  openGraph: {
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Bréval Le Floch - Creative Developer",
      },
    ],
  },
}

export default function RootLayout({
  children
}) {
  return (
    <html lang="en" suppressHydrationWarning className="light">
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange={false}
          forcedTheme={undefined}>
          <CursorBlob />
          <Navigation />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
