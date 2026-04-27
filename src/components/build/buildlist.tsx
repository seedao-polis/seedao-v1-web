import seedao from '../../assets/build/build-seedao.svg';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

const BuildList = () => {
  const { t } = useTranslation();
  return (
    <Box>
      <Lists>
        <li>
          <a href="https://seedao.top/proposal" target="_blank" rel="noreferrer">
            <img src={seedao} alt="SeeDAO" />
            <span>{t('Link-Proposal')}</span>
          </a>
        </li>
      </Lists>
    </Box>
  );
};

export default BuildList;

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
