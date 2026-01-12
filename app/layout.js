import './globals.css'

export const metadata = {
  title: 'Programme Task Sequencer | Ubiqs Property',
  description: 'Generate compliance task sequences for capital works programmes',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
