import BuildHeader from '../components/build/BuildHeader';
import BuildDetails from '../components/build/BuildDetails';
import PageMeta from '../components/SEO/PageMeta';

const Build = () => {
  // Define structured data for the build page
  const buildStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'SEEDAO - Build With Us',
    description:
      'Join SEEDAO in building the future of decentralized applications. Learn about our development initiatives and how you can contribute to our ecosystem.',
    url: 'https://seedao.xyz/build',
    mainEntity: {
      '@type': 'Article',
      headline: 'Build With SEEDAO',
      description:
        'Opportunities and resources for developers and contributors in the SEEDAO ecosystem.',
      publisher: {
        '@type': 'Organization',
        name: 'SEEDAO',
        logo: 'https://seedao.xyz/logo192.png',
      },
    },
  };

  return (
    <section>
      <PageMeta
        title="SEEDAO - Build With Us | Development Opportunities"
        description="Join SEEDAO in building the future of decentralized applications. Learn about our development initiatives and how you can contribute to our ecosystem."
        canonicalPath="/build"
        structuredData={buildStructuredData}
      />
      <div>
        <BuildHeader />
        <BuildDetails />
      </div>
    </section>
  );
};

export default Build;
