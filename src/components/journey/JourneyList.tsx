import bounties from '../../assets/journey/bounties.svg';
import seed from '../../assets/journey/seed.svg';
import nodes from '../../assets/journey/nodes.svg';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

const IntroList = () => {
  const { t } = useTranslation();
  return (
    <Box>
      <Lists>
        <li>
          <a href="https://app-v1.seedao.xyz/explore" target="_blank" rel="noreferrer">
            <img src={bounties} alt="Bounties" />
            <span>{t('Bounties')}</span>
          </a>
        </li>

        <li>
          <a href="https://seed-v1.seedao.xyz" target="_blank" rel="noreferrer">
            <img src={seed} alt="Seed NFT" />
            <span>{t('Seed-NFT')}</span>
          </a>
        </li>
        <li>
          <a href="https://node-v1.seedao.xyz" target="_blank" rel="noreferrer">
            <img src={nodes} alt="Nodes Consensus Congress" />
            <span>{t('Nodes-Consensus-Congress')}</span>
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
    padding: 0 30px;

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
      background: linear-gradient(180deg, #ffefed 0%, #fbf5ef 100%);
      &:hover {
        background: linear-gradient(180deg, #ffefed 0%, #fff 100%);
      }
    }
    &:nth-child(2) {
      background: linear-gradient(180deg, #ededff 0%, #fbf5ef 100%);
      &:hover {
        background: linear-gradient(180deg, #ededff 0%, #fff 100%);
      }
    }
    &:nth-child(3) {
      background: linear-gradient(180deg, #edf9ff 0%, #fbf5ef 100%);
      &:hover {
        background: linear-gradient(180deg, #edf9ff 0%, #fff 100%);
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
