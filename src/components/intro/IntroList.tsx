import whitePaper from '../../assets/intro/white-paper.svg';
import meta from '../../assets/intro/meta.svg';
import seedao from '../../assets/intro/seedao.svg';
import city from '../../assets/intro/city-hall.svg';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

const IntroList = () => {
  const { t } = useTranslation();
  return (
    <Box>
      <Lists>
        <li>
          {/*<a href="SeeDAO-WhitePaper.pdf" download="SeeDAO-WhitePaper.pdf">*/}
          <a href="SeeDAO-WhitePaper.pdf" target="_blank" rel="noreferrer">
            <img src={whitePaper} alt="SeeDAO Whitepaper" />
            <span>{t('Link-Whitepaper')}</span>
          </a>
        </li>
        <li>
          <a
            // href="https://seedao.notion.site/8745195e74c34a90b1aa115504e20a97"
            href="SeeDAO-Meta.pdf"
            target="_blank"
            rel="noreferrer"
          >
            <img src={meta} alt="SeeDAO Meta" />
            <span>{t('Link-Meta')}</span>
          </a>
        </li>
        <li>
          <a href="https://app-v1.seedao.xyz" target="_blank" rel="noreferrer">
            <img src={seedao} alt="SeeDAO App" />
            <span>{t('Link-App')}</span>
          </a>
        </li>
        <li>
          <a
            href="https://seedao.notion.site/S6-979d37e0f3fb43bdaf456f95ab389d0e"
            target="_blank"
            rel="noreferrer"
          >
            <img src={city} alt="SeeDAO City Hall" />
            <span>{t('Link-City-Hall')}</span>
          </a>
        </li>
      </Lists>
    </Box>
  );
};

export default IntroList;

const Box = styled.div`
  margin: 50px 7vw 160px;
  @media (max-width: 768px) {
    margin: 0 24px 15px;
  }
`;

const Lists = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-items: center;
  justify-content: space-between;
  li {
    width: 32%;
    height: 206px;
    margin-bottom: 30px;
    /* max-width: 370px; */
    border-radius: 16px;
    box-shadow: 2px 5px 12px -13px rgba(201, 176, 151, 0.04);
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      margin-right: 23px;
    }
    span {
      font-family: 'DMSans-Bold';
      font-size: 20px;
      line-height: 20px;
    }
    a {
      color: #000;
      text-decoration: none;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    &:first-child {
      background: linear-gradient(180deg, #e4fef5 0%, #fbf5ef 100%);
      &:hover {
        background: linear-gradient(180deg, #e4fef5 0%, #fff 100%);
      }
    }
    &:nth-child(2) {
      background: linear-gradient(180deg, #ffefed 0%, #fbf5ef 100%);
      &:hover {
        background: linear-gradient(180deg, #ffefed 0%, #fff 100%);
      }
    }
    &:nth-child(3) {
      background: linear-gradient(180deg, #ededff 0%, #fbf5ef 100%);
      &:hover {
        background: linear-gradient(180deg, #ededff 0%, #fff 100%);
      }
    }
    &:nth-child(4) {
      background: linear-gradient(180deg, #edf9ff 0%, #fbf5ef 100%);
      &:hover {
        background: linear-gradient(180deg, #edf9ff 0%, #fff 100%);
      }
    }
    &:nth-child(5) {
      background: linear-gradient(180deg, #fffaed 0%, #fbf5ef 100%);
      &:hover {
        background: linear-gradient(180deg, #fffaed 0%, #fff 100%);
      }
    }
    &:nth-child(6) {
      background: linear-gradient(180deg, #edffed 0%, #fbf5ef 100%);
      &:hover {
        background: linear-gradient(180deg, #edffed 0%, #fff 100%);
      }
    }
  }

  @media (max-width: 768px) {
    li {
      width: 48%;
      height: 85px;
      margin-bottom: 12px;
      border-radius: 8px;
      img {
        width: 46px;
      }
      span {
        font-size: 10px;
        line-height: 10px;
      }
    }
  }
`;
