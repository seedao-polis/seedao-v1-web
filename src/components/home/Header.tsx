import { useLottie } from 'lottie-react';
import homeBanner from '../../assets/Home-banner.json';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import twitter from '../../assets/footer/twitter.png';
import Dis from '../../assets/footer/Dis.png';
import mi from '../../assets/footer/Mi.png';
import TwitterHover from '../../assets/footer/hover/twitter.png';
import DisHover from '../../assets/footer/hover/Dis.png';
import miHover from '../../assets/footer/hover/Mi.png';

export const HeaderSection = styled.div`
  background: linear-gradient(0deg, #fbf5ef 0.09%, #f9f6ff 96.69%);
  display: flex;
  align-content: center;
  justify-content: center;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column-reverse;
    padding-bottom: 100vw;
  }
`;

const MidBox = styled.div`
  display: flex;
  align-content: center;
  justify-content: flex-end;
  width: 100%;
  position: relative;

  @media (max-width: 768px) {
    max-width: 100vw;
    flex-direction: column;
  }
`;
export const HeaderLeft = styled.div`
  padding-top: 90px;
  position: absolute;
  left: 5vw;
  top: 0;
  z-index: 99;
  @media (max-width: 768px) {
    text-align: center;
    top: 65vw;
    left: 0;
    //padding-left: 0;
    //order: 1;
    //padding-top: 0;
  }
`;
export const HeaderTitle = styled.h1`
  font-family: 'Inter-SemiBold';
  width: 33%;
  padding-left: 4%;
  box-sizing: border-box;
  &.en {
    width: 800px;
  }
  & > div {
    min-width: 700px !important;
    box-sizing: content-box;
  }
  .Top1 {
    font-weight: 600;
    margin-bottom: 32px;
    font-size: 60px;
    text-transform: uppercase;
  }
  .tips {
    font-size: 24px;
    display: flex;
    align-items: center;
    & > div {
      margin-right: 20px;
    }
  }
  //.cn{ padding-left: 120px;}

  //@media (max-width: 1024px) {
  //  font-size: 50px;
  //  max-width: 300px;
  //}
  @media (max-width: 768px) {
    text-align: center;
    margin-left: 0;
    text-transform: none;
    & > div {
      min-width: 90vw !important;
    }
    &.en {
      width: 100%;
    }
    .Top1 {
      font-weight: 600;
      margin-bottom: 32px;
      font-size: 32px;
      text-transform: uppercase;
    }
    .tips {
      font-size: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      & > div {
        margin-right: 20px;
      }
    }
  }
`;
export const JoinButton = styled.button`
  border: none;
  background-color: #a6a2f9;
  color: #000;
  font-size: 20px;
  margin-left: 4%;
  font-family: 'DMSans-Bold';
  padding: 17px 46px;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 40px;
  @media (max-width: 768px) {
    width: 88%;
    margin-left: 0;
  }
`;

export const HeaderImg = styled.div`
  flex-shrink: 0;
  @media (max-width: 768px) {
    max-width: 100vw;
    margin-left: 0;
    padding-top: 10vw;
  }
`;

const BtnLine = styled.div`
    margin: 30px 0 0 4vw;
  img{
    max-width: 40px;
    margin-right: 20px;
    
  }
  a{
    .hover{
      display: none;
    }
    .nor{
      display: inline-block;
    }
    &:hover{
      .hover{
        display: inline-block;
      }
      .nor{
        display: none;
      }
    }
    
`;

const Header = () => {
  const options = {
    animationData: homeBanner,
    loop: true,
  };
  const { t, i18n } = useTranslation();

  const { View } = useLottie(options);
  return (
    <HeaderSection>
      {/* left side */}
      <MidBox>
        <HeaderLeft>
          <HeaderTitle className={`${i18n.language}`}>
            <div className="Top1">{t('Home-Cover-Title-1')}</div>
            <div className="tips">
              <div className={i18n.language}>{t('Home-Cover-Title-2')}</div>
            </div>
          </HeaderTitle>
          <div>
            <a href="https://seedao.top/sns" target="_blank" rel="noreferrer">
              <JoinButton>{t('Earn-Membership')}</JoinButton>
            </a>
            <BtnLine>
              <a href="https://discord.com/invite/seedao-xyz" target="_blank" rel="noreferrer">
                <img src={Dis} alt="" className="nor" />
                <img src={DisHover} alt="" className="hover" />
              </a>
              {/* <a
                            href="https://t.me/theseedao"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <img src={Tg} alt=""  className="nor" />
                            <img src={TgHover} alt="" className="hover" />
                        </a> */}
              <a href="https://twitter.com/see_dao" target="_blank" rel="noreferrer">
                <img src={twitter} alt="" className="nor" />
                <img src={TwitterHover} alt="" className="hover" />
              </a>
              <a href="https://seedao.mirror.xyz" target="_blank" rel="noreferrer">
                <img src={mi} alt="" className="nor" />
                <img src={miHover} alt="" className="hover" />
              </a>
            </BtnLine>
          </div>
        </HeaderLeft>
        <HeaderImg>
          {/* <img src={View} alt="" /> */}
          {View}
        </HeaderImg>
      </MidBox>
    </HeaderSection>
  );
};

export default Header;
