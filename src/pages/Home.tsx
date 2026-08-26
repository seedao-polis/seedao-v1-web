import Header from '../components/home/Header';
import banner from '../assets/home/banner.jpg';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import PageMeta from '../components/SEO/PageMeta';

export const BannerImg = styled.div`
  position: relative;
  img {
    width: 100%;
  }
  a {
    opacity: 0;
  }
  @media (max-width: 768px) {
    a {
      display: none;
    }
  }
`;

const Metaforo = styled.a`
  display: block;
  width: 8vw;
  height: 7vw;
  position: absolute;
  left: 19vw;
  top: 11vw;
  background: rgba(0, 0, 0, 0.5);
`;
const AAAny = styled.a`
  display: block;
  width: 6.8vw;
  height: 5vw;
  position: absolute;
  left: 69vw;
  top: 6.4vw;
  background: rgba(0, 0, 0, 0.5);
`;
const Cascad3 = styled.a`
  display: block;
  width: 8vw;
  height: 10vw;
  position: absolute;
  left: 80vw;
  top: 22vw;
  background: rgba(0, 0, 0, 0.5);
`;
const Wormhole3 = styled.a`
  display: block;
  width: 9vw;
  height: 10vw;
  position: absolute;
  left: 62vw;
  top: 25vw;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 100px;
`;

const DeSchool = styled.a`
  display: block;
  width: 8vw;
  height: 7vw;
  position: absolute;
  left: 9.5vw;
  top: 15vw;
  background: rgba(0, 0, 0, 0.5);
`;
const SeeU = styled.a`
  display: block;
  width: 8vw;
  height: 8vw;
  position: absolute;
  left: 84vw;
  top: 13vw;
  background: rgba(0, 0, 0, 0.5);
`;
const Ensoul = styled.a`
  display: block;
  width: 8vw;
  height: 8vw;
  position: absolute;
  left: 46vw;
  top: 28vw;
  border-radius: 50px;
  background: rgba(0, 0, 0, 0.5);
`;
const PFP = styled.a`
  display: block;
  width: 8vw;
  height: 7vw;
  position: absolute;
  left: 89vw;
  top: 32vw;
  background: rgba(0, 0, 0, 0.5);
`;
const Sellix = styled.a`
  display: block;
  width: 7vw;
  height: 10vw;
  position: absolute;
  left: 79.5vw;
  top: 36vw;
  background: rgba(0, 0, 0, 0.5);
`;
const Echo = styled.a`
  display: block;
  width: 5.5vw;
  height: 8vw;
  position: absolute;
  left: 62vw;
  top: 2.5vw;
  background: rgba(0, 0, 0, 0.5);
`;
const DAOLink = styled.a`
  display: block;
  width: 10vw;
  height: 7vw;
  position: absolute;
  left: 52.5vw;
  top: 22vw;
  border-radius: 40px;
  background: rgba(0, 0, 0, 0.5);
`;
const SeeDAO = styled.a`
  display: block;
  width: 8vw;
  height: 7vw;
  position: absolute;
  left: 70vw;
  top: 20vw;
  border-radius: 40px;
  background: rgba(0, 0, 0, 0.5);
`;
const Joyid = styled.a`
  display: block;
  width: 8vw;
  height: 8vw;
  position: absolute;
  left: 55vw;
  top: 8vw;
  border-radius: 40px;
  background: rgba(0, 0, 0, 0.5);
`;

const TitTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 100px;
  .top {
    font-size: 48px;
  }
  .tips {
    font-size: 24px;
    margin: 20px 0;
  }
  @media (max-width: 768px) {
    .top {
      font-size: 30px;
    }
    .tips {
      font-size: 16px;
    }
  }
`;

const Home = () => {
  const { t } = useTranslation();

  // Define structured data for the home page
  const homeStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'SEEDAO - Together Create Freedom',
    description:
      'SEEDAO is a decentralized autonomous organization dedicated to fostering innovation, collaboration, and freedom in the Web3 ecosystem.',
    url: 'https://seedao.xyz/',
    mainEntity: {
      '@type': 'Organization',
      name: 'SEEDAO',
      url: 'https://seedao.xyz',
      logo: 'https://seedao.xyz/logo192.png',
    },
  };

  return (
    <section>
      <PageMeta
        title="SEEDAO - Together Create Freedom"
        description="SEEDAO is a decentralized autonomous organization dedicated to fostering innovation, collaboration, and freedom in the Web3 ecosystem. Join our community to shape the future of decentralized governance."
        canonicalPath="/"
        structuredData={homeStructuredData}
      />
      <Header />
      <TitTop>
        <div className="top">{t('map')}</div>
        <div className="tips">{t('mapTips')}</div>
      </TitTop>
      <BannerImg>
        <Metaforo href="https://forum.seedao.xyz/" target="_blank" rel="noreferrer" />
        <AAAny
          href="https://apps.apple.com/ca/app/aaany-ask-anyone-anything/id6450619356"
          target="_blank"
          rel="noreferrer"
        />
        <Cascad3 href="https://www.cascad3.com/" target="_blank" rel="noreferrer" />
        <Wormhole3 href="https://alpha.wormhole3.io" target="_blank" rel="noreferrer" />
        <DeSchool href="https://deschool.app/" target="_blank" rel="noreferrer" />
        <SeeU href="https://seeu.network/" target="_blank" rel="noreferrer" />
        <Ensoul href="https://www.ensoul.io/" target="_blank" rel="noreferrer" />
        <PFP href="https://www.pfp-dao.io/" target="_blank" rel="noreferrer" />
        <Sellix href="https://sellix.io/" target="_blank" rel="noreferrer" />
        <Echo href="https://echo3.world/" target="_blank" rel="noreferrer" />
        <DAOLink href="https://app.daolink.space" target="_blank" rel="noreferrer" />
        <SeeDAO href="https://app-v1.seedao.xyz/" target="_blank" rel="noreferrer" />
        <Joyid href="https://joy.id/" target="_blank" rel="noreferrer" />
        <img src={banner} alt="" />
      </BannerImg>
    </section>
  );
};

export default Home;
