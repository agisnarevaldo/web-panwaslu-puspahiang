import "../globals.css";

export const metadata = {
  title: 'Login | Panwascam Puspahiang',
  description: 'Developed by Agisna Revaldo',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
