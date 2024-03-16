import Title from "@/components/common/Title";
import Banner from "@/components/common/banner/Banner";
import MainBest from "@/components/main/MainBest";
import MainNewBooks from "@/components/main/MainNewBooks";
import MainReview from "@/components/main/MainReview";
import { useMain } from "@/hooks/useMain";
import styled from "styled-components";

const HomePage = () => {
  const { reviews, newBooks, bestBooks, banners } = useMain();

  return (
    <HomePageStyle>
      <Banner banners={banners} />
      <section className="section">
        <Title size="large">베스트 셀러</Title>
        <MainBest books={bestBooks} />
      </section>
      <section className="section">
        <Title size="large">신간 안내</Title>
        <MainNewBooks books={newBooks} />
      </section>
      <section className="section">
        <Title size="large">최신 리뷰</Title>
        <MainReview reviews={reviews} />
      </section>
    </HomePageStyle>
  );
};

const HomePageStyle = styled.div`
  margin: 1rem 0;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  .section {
    padding: 1rem 0;

    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
`;

export default HomePage;
