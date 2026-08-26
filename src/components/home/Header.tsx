import { useLottie } from 'lottie-react';
import homeBanner from '../../assets/Home-banner.json';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

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
export const HeaderImg = styled.div`
  flex-shrink: 0;
  @media (max-width: 768px) {
    max-width: 100vw;
    margin-left: 0;
    padding-top: 10vw;
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
