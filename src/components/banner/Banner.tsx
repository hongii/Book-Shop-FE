import styled from "styled-components";
import { useEffect, useMemo, useState } from "react";
import { FaAngleLeft } from "@react-icons/all-files/fa/FaAngleLeft";
import { FaAngleRight } from "@react-icons/all-files/fa/FaAngleRight";
import banner1 from "@/assets/images/banner1.jpg";
import banner2 from "@/assets/images/banner2.jpg";
import banner3 from "@/assets/images/banner3.jpg";
import banner4 from "@/assets/images/banner4.jpg";
import banner5 from "@/assets/images/banner5.jpg";

interface BannerType {
  id: number;
  src: string;
}

const banners: BannerType[] = [
  { id: 0, src: banner1 },
  { id: 1, src: banner2 },
  { id: 2, src: banner3 },
  { id: 3, src: banner4 },
  { id: 4, src: banner5 },
];

const Banner = () => {
  const [slideBanners, setSlideBanners] = useState<BannerType[]>([]); // 맨 앞 요소에 마지막 banner를 추가, 맨 뒤 요소에 첫번째 banner를 추가한 배열
  const [currentIdx, setCurrentIdx] = useState<number>(1); // slideBanners 배열에서의 active index를 관리
  const [indicatorIdx, setIndicatorIdx] = useState<number>(0); // 실제 banners 길이와 동일
  const [isTransition, setIsTransition] = useState<boolean>(true); // transition 효과 => slideBanners의 맨 첫 번째 또는 맨 마지막 요소일 경우 transition 효과 제거

  const bannerDataSize = banners.length;
  const sliderSize = bannerDataSize + 2;

  const handlePrev = () => {
    setCurrentIdx((prev) => (prev + (sliderSize - 1)) % sliderSize);
    setIndicatorIdx((prev) => (prev + (bannerDataSize - 1)) % bannerDataSize);
    setIsTransition(true);
  };

  const handleNext = () => {
    setCurrentIdx((prev) => (prev + 1) % sliderSize);
    setIndicatorIdx((prev) => (prev + 1) % bannerDataSize);
    setIsTransition(true);
  };

  const handleClickIndicator = (i: number) => {
    setIndicatorIdx(i);
    setCurrentIdx(i + 1);
    setIsTransition(true);
  };

  const transformValue = useMemo(() => {
    return currentIdx * -100;
  }, [currentIdx]);

  useEffect(() => {
    if (banners.length === 0) return;

    const slideBanners = [banners[banners.length - 1], ...banners, banners[0]];
    setSlideBanners(slideBanners);
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timer;

    if (currentIdx === sliderSize - 1) {
      timer = setTimeout(() => {
        setCurrentIdx(1);
        setIsTransition(false);
      }, 500);
    } else if (currentIdx === 0) {
      timer = setTimeout(() => {
        setCurrentIdx(bannerDataSize);
        setIsTransition(false);
      }, 500);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [currentIdx, bannerDataSize, sliderSize]);

  useEffect(() => {
    // 5초마다 자동으로 슬라이드 넘어가도록 구현
    const intervalId = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % sliderSize);
      setIndicatorIdx((prev) => (prev + 1) % bannerDataSize);
      setIsTransition(true);
    }, 5000);

    return () => clearInterval(intervalId);
  }, [sliderSize, bannerDataSize]);

  return (
    <BannerStyle>
      <BannerContainerStyle $isTransition={isTransition} $transformValue={transformValue}>
        {slideBanners.map((banner, i) => (
          <img className="banner-img" key={i} src={banner.src} alt="banner" />
        ))}
      </BannerContainerStyle>
      <BannerSlideBtnStyle>
        <button className="prev" onClick={handlePrev}>
          <FaAngleLeft />
        </button>
        <button className="next" onClick={handleNext}>
          <FaAngleRight />
        </button>
      </BannerSlideBtnStyle>
      <BannerIndicatorStyle>
        {banners.map((banner, i) => (
          <span
            key={i}
            className={indicatorIdx === banner.id ? "active" : ""}
            onClick={() => {
              handleClickIndicator(i);
            }}
          ></span>
        ))}
      </BannerIndicatorStyle>
    </BannerStyle>
  );
};

interface BannerContainerStyleProps {
  $transformValue: number;
  $isTransition: boolean;
}

const BannerStyle = styled.div`
  overflow: hidden;
  position: relative;
`;

const BannerContainerStyle = styled.div<BannerContainerStyleProps>`
  display: flex;
  transform: translateX(${({ $transformValue }) => $transformValue}%);
  transition: ${({ $isTransition }) => ($isTransition ? "transform 0.5s ease-in-out" : "none")};
  width: 100%;
  max-height: 300px;

  .banner-img {
    flex: 0 0 100%;
    width: 100%;
    object-fit: fill;
  }
`;

const BannerSlideBtnStyle = styled.div`
  button {
    cursor: pointer;
    border: none;
    padding: 0;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    font-size: 2rem;
    background-color: ${({ theme }) => theme.color.arrowBackgroundColor};
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);

    svg {
      fill: #fff;
    }

    &.prev {
      left: 0.6rem;
    }

    &.next {
      right: 0.6rem;
    }

    &:hover {
      opacity: 0.8;
    }
  }
`;

const BannerIndicatorStyle = styled.div`
  position: absolute;
  bottom: 0.8rem;
  left: 50%;
  transform: translateX(-50%);
  span {
    display: inline-block;
    width: 0.8rem;
    height: 0.8rem;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.color.arrowBackgroundColor};
    margin: 0 4px;
    cursor: pointer;

    &.active {
      background-color: #fff;
    }
  }
`;

export default Banner;
