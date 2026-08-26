import image3 from '../../assets/footer/y2z.svg';
import hashkey from '../../assets/footer/hashkey.svg';
import image5 from '../../assets/footer/image-5.svg';
import image6 from '../../assets/footer/image-6.svg';
import image7 from '../../assets/footer/image-7.svg';
import image8 from '../../assets/footer/image-8.svg';
import image9 from '../../assets/footer/image-9.svg';
import image10 from '../../assets/footer/image-10.svg';
import image11 from '../../assets/footer/image-11.svg';
import image12 from '../../assets/footer/image-12.svg';

import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { Link } from 'react-router-dom';

export const FooterContainer = styled.section`
  z-index: 1;
  margin: 20px auto;

  padding: 50px 0 54px 7vw;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  .powerby {
    color: #b0aca7;
    //text-align: right;
    font-size: 14px;
  }
  .btmBox {
    color: #000000;
    font-weight: 400;
    display: flex;
    gap: 20px;
    align-items: center;
    margin-top: 20px;
    a {
      text-decoration: none;
      font-size: 14px;
      color: #b0aca7;
    }
  }
  @media (max-width: 768px) {
    padding: 0;
    border-top: 0;
    .powerby {
      text-align: center;
    }
    .btmBox {
      text-align: center;
      flex-direction: column;
    }
  }
`;

export const FooterSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  /* margin: 48px 60px; */
  color: #b0aca7;
  opacity: 0.8;
  & > li {
    width: 33.3333333%;
    display: flex;
    justify-content: center;
    position: relative;
  }
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    /* gap: 20px; */
    justify-content: center;
    text-align: center;
    margin: 0;
    padding: 40px 13px;
    & > li {
      width: 100%;
    }
  }
`;
export const PartnersContainer = styled.div`
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    /* text-align: center; */
  }
  /* width: 33%; */
`;
export const PartnerTitle = styled.p`
  font-size: 18px;
  font-weight: 700;
  padding-bottom: 23px;
  font-family: 'DMSans-Bold';
  text-transform: uppercase;
`;
export const Partners = styled.ul`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
  li {
    margin: 0 20px 20px 0;
    flex-shrink: 0;
  }

  @media (max-width: 768px) {
    max-width: 100vw;
    justify-content: center;
    li {
      margin: 0 12px 20px 0;
      flex-shrink: 0;
    }
  }
`;

// portfolio
export const Portfolio = styled.ul`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  max-width: 450px;
  li {
    margin: 0 13px 20px 0;
    flex-shrink: 0;
  }
  @media (max-width: 768px) {
    max-width: 100vw;
    justify-content: center;
    li {
      margin: 0 8px 20px 0;
      flex-shrink: 0;
    }
  }
`;

export const Cooperation = styled.div`
  /* width: 33%; */
  line-height: 40px;
  padding: 0 14px;
  display: flex;
  flex-direction: column;
  min-width: 280px;
  a {
    font-size: 16px;
    font-weight: 400;
    color: #b0aca7;
    text-decoration: none;

    &:hover {
      color: #000;
    }
  }
  @media (max-width: 768px) {
    margin-top: 35px;
  }
`;

const Footer = () => {
  const { t } = useTranslation();
  return (
    <FooterContainer>
      <FooterSection>
        <li>
          <PartnersContainer>
            <PartnerTitle>{t('Partners')}</PartnerTitle>
            <Partners>
              {/* <Logo1 src={image3} /> */}
              <li>
                <img src={image3} alt="" />
              </li>
              <li>
                <img src={hashkey} alt="" />
              </li>
              <li>
                <img src={image5} alt="" />
              </li>
              <li>
                <img src={image6} alt="" />
              </li>
              <li>
                <img src={image7} alt="" />
              </li>
              <li>
                <img src={image8} alt="" />
              </li>
              <li>
                <img src={image9} alt="" />
              </li>
              <li>
                <img src={image10} alt="" />
              </li>
              <li>
                <img src={image11} alt="" />
              </li>
              <li>
                <img src={image12} alt="" />
              </li>
            </Partners>
            {/* portfolio section */}
          </PartnersContainer>
        </li>
      </FooterSection>
      <div className="btmBox">
        <p>© {new Date().getFullYear()} SeeDAO. All Rights Reserved.</p>
        <p className="powerby">Powered with ❤️ by SeeDAO Polis Team</p>

        <Link to="/tos">{t('Terms-of-Services')}</Link>
        <Link to="/privacy">{t('Privacy-Policy')}</Link>
      </div>
    </FooterContainer>
  );
};

export default Footer;
