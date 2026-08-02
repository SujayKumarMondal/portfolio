import './globals.css';

export const metadata = {
  title: 'Sujay Kumar Mondal | Professional Portfolio',
  description:
    'Python backend developer portfolio featuring experience in FastAPI, Django, PostgreSQL, Redis, and scalable APIs.',
  icons: {
    icon: [{ url: '/favicon.ico', rel: 'icon' }],
  },
  keywords: [
    'Sujay Kumar Mondal',
    'Python Backend Developer',
    'FastAPI',
    'Django',
    'PostgreSQL',
    'API Development',
    'Portfolio',
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
