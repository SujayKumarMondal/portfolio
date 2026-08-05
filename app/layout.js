import './globals.css';

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Sujay Kumar Mondal',
  jobTitle: 'Python Backend Engineer',
  description:
    'Python Backend Engineer specializing in FastAPI, PostgreSQL, REST APIs, authentication, scalable backend systems and cloud deployment.',
  url: 'https://sujay-kumar-mondal-portfolio.netlify.app/',
  sameAs: [
    'https://github.com/SujayKumarMondal',
    'https://www.linkedin.com/in/sujay-kumar-mondal-a125481b7/',
  ],
  knowsAbout: [
    'Python',
    'FastAPI',
    'Backend Engineer',
    'PostgreSQL',
    'REST API',
    'Docker',
    'Redis',
  ],
};

export const metadata = {
  metadataBase: new URL('https://sujay-kumar-mondal-portfolio.netlify.app/'),
  title: 'Sujay Kumar Mondal | Python Backend Engineer | FastAPI Developer',
  description:
    'Python Backend Engineer specializing in FastAPI, PostgreSQL, REST APIs, authentication, scalable backend systems and cloud deployment.',
  keywords: [
    'Sujay Kumar Mondal',
    'Python Backend Engineer',
    'FastAPI Developer',
    'FastAPI',
    'PostgreSQL',
    'REST API',
    'Docker',
    'Redis',
    'Backend Systems',
    'Portfolio',
  ],
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Sujay Kumar Mondal | Python Backend Engineer | FastAPI Developer',
    description:
      'Python Backend Engineer specializing in FastAPI, PostgreSQL, REST APIs, authentication, scalable backend systems and cloud deployment.',
    url: 'https://sujay-kumar-mondal-portfolio.netlify.app/',
    siteName: 'Sujay Kumar Mondal Portfolio',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sujay Kumar Mondal | Python Backend Engineer | FastAPI Developer',
    description:
      'Python Backend Engineer specializing in FastAPI, PostgreSQL, REST APIs, authentication, scalable backend systems and cloud deployment.',
  },
  icons: {
    icon: [{ url: '/favicon.ico', rel: 'icon' }],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {children}
      </body>
    </html>
  );
}
