import { Banner } from "@/models/banner.model";
import styled from "styled-components";

interface Props {
  banner: Banner;
}
const BannerItem = ({ banner }: Props) => {
  return (
    <BannerItemStyle>
      <div className="img">
        <img src={banner.image} alt={banner.title} />
      </div>
      <div className="content">
        <h2>{banner.title}</h2>
        <p>{banner.description}</p>
      </div>
    </BannerItemStyle>
  );
};

const BannerItemStyle = styled.div`
  flex: 0 0 100%;
  text-align: center;

  position: relative;

  .img {
    img {
      width: 100%;
      max-width: 100%;
    }
  }

  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    position: absolute;
    top: 0;
    left: 0;
    padding-left: 4rem;
    width: 40%;
    height: 100%;
    background: linear-gradient(to right, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0));

    h2 {
      color: #111;
      font-size: 2rem;
      font-weight: 700;
      margin-bottom: 1rem;
    }

    p {
      color: #2b2b2b;
      font-size: 1.4rem;
      margin: 0;
    }
  }

  @media ${({ theme }) => theme.mediaQuery.mobile} {
    .content {
      h2 {
        font-size: 2.8rem;
      }
      p {
        font-size: 2rem;
      }
    }
  }

  @media ${({ theme }) => theme.mediaQuery.tablet} {
    .content {
      h2 {
        font-size: 2.5rem;
      }
      p {
        font-size: 1.7rem;
      }
    }
  }
`;

export default BannerItem;
