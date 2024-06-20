import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Title from "@/components/common/Title";
import { formatDate, formatNumber } from "@/utils/format";
import { Link } from "react-router-dom";
// import EllipsisBox from "@/components/common/EllipsisBox";
import LikeButton from "@/components/book/LikeButton";
import AddToCart from "@/components/book/AddToCart";
import { useAlert } from "@/hooks/useAlert";
import { useAuthStore } from "@/store/authStore";
import Error from "@/components/common/Error";
import Loading from "@/components/common/Loading";
import BookReview from "@/components/book/BookReview";
import { Tab, Tabs } from "@/components/common/Tabs";
import Modal from "@/components/common/Modal";
import { useState } from "react";
import { AladinBookDetail } from "@/models/aladinBook.model";
import { useAladinBookDetail } from "@/hooks/useAladinBookDetail";

const bookInfoList = [
  {
    label: "카테고리",
    key: "categoryName",
    filter: (book: AladinBookDetail) => (
      <Link to={`/books?page=1&category_id=${book.categoryId}`}>{book.categoryName}</Link>
    ),
  },
  {
    label: "가격",
    key: "priceStandard",
    filter: (book: AladinBookDetail) => `${formatNumber(book.priceStandard)}원`,
  },
  { label: "포맷", key: "form" },
  { label: "페이지", key: "itemPage" },
  { label: "ISBN13", key: "isbn13" },
  {
    label: "출간일",
    key: "pubDate",
    filter: (book: AladinBookDetail) => formatDate(book.pubDate, ""),
  },
  { label: "출판사", key: "publisher" },
  // { label: "상품의 별 평점", key: "ratingScore" },
  // { label: "상품에 별을 남긴 개수", key: "ratingCount" },
  // { label: "마이리뷰 남긴 개수", key: "myReviewCount" },
];

const BookDetailPage = () => {
  const { bookId } = useParams();
  const { isLoggedIn } = useAuthStore();
  const { showConfirm } = useAlert();
  const navigate = useNavigate();
  const { bookDetail, toggleLike, isBookDetailLoading, bookReview, isBookReviewLoading } =
    useAladinBookDetail(bookId);

  const [isImgOpen, setIsImgOpen] = useState<boolean>(false);

  if (!bookId) return <Error />;
  if (isBookDetailLoading || isBookReviewLoading) return <Loading />;
  if (!bookDetail || !bookReview) return <Error />;

  const handleClickLike = () => {
    if (!isLoggedIn) {
      showConfirm("로그인이 필요합니다. 로그인 후 이용해주세요.", () => navigate("/login"));
      return;
    }

    toggleLike({ bookId: +bookId, info: bookDetail });
  };

  return (
    <BookDetailPageStyle>
      <header className="header">
        <div className="img">
          <img onClick={() => setIsImgOpen(true)} src={bookDetail.cover} alt={bookDetail.title} />
        </div>
        {isImgOpen && (
          <Modal onClosed={() => setIsImgOpen(false)}>
            <ModalBookImg>
              <img src={bookDetail.cover} alt={bookDetail.title} />
            </ModalBookImg>
          </Modal>
        )}
        <div className="info-contianer">
          <div className="info">
            <Title size="medium" color="text">
              {bookDetail.title}
            </Title>
            {bookInfoList.map((item) => {
              return (
                <dl key={item.key}>
                  <dt>{item.label}</dt>
                  <dd>
                    {item.filter
                      ? item.filter(bookDetail)
                      : bookDetail[item.key as keyof AladinBookDetail]}
                  </dd>
                </dl>
              );
            })}
            {/* <p className="summary">{bookDetail.summary}</p> */}
            {/* <EllipsisBox line={4}>{bookDetail.summary}</EllipsisBox> */}
          </div>
          <div className="sub-info">
            <LikeButton book={bookDetail} onClick={handleClickLike} />
            <AddToCart book={bookDetail} />
          </div>
        </div>
      </header>
      <section className="contents">
        <Tabs>
          <Tab title="상세 설명">
            <div>
              <Title size="medium">상세 설명</Title>
              <p className="detail">{bookDetail.description}</p>
            </div>
          </Tab>
          {/* <Tab title="목차">
            <div>
              <Title size="medium">목차</Title>
              <p className="index">{bookDetail.description}</p>
            </div>
          </Tab> */}
          <Tab title="리뷰">
            <div>
              <Title size="medium">{`리뷰(${bookReview.length})`}</Title>
              <BookReview reviews={bookReview} bookId={bookId} />
            </div>
          </Tab>
        </Tabs>
      </section>
    </BookDetailPageStyle>
  );
};

const ModalBookImg = styled.div`
  display: flex;

  img {
    flex: 1;
    width: 100%;
  }
`;

const BookDetailPageStyle = styled.section`
  width: 100%;
  padding: 2rem;
  position: relative;

  .header {
    display: flex;
    gap: 3rem;
    padding: 0 0 1.8rem 0;
  }

  .img {
    flex: 1;
    min-width: 45%;

    img {
      cursor: pointer;
      width: 100%;
      object-fit: contain;
    }
  }

  .info-contianer {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1;
  }

  .info {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    dl {
      margin: 0;
      display: flex;
      justify-content: space-between;
      white-space: nowrap;
    }

    dt {
      color: ${({ theme }) => theme.color.secondary};
    }

    a {
      color: ${({ theme }) => theme.color.third};
      text-decoration: underline;
      white-space: break-spaces;
    }
  }

  .sub-info {
    margin-top: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  p {
    margin: 1.2rem 0;
  }

  .contents {
    display: flex;
    flex-direction: column;
    gap: 1.7rem;
  }

  @media ${({ theme }) => theme.mediaQuery.mobile} {
    .header {
      flex-direction: column;
    }

    .img {
      /* margin: 0 auto; */
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        cursor: pointer;
        width: inherit;
        max-width: 70%;
        object-fit: contain;
      }
    }
    dt {
      font-size: 2.2rem;
    }

    dd {
      font-size: 2rem;
    }

    p {
      font-size: 2rem;
    }
  }

  @media ${({ theme }) => theme.mediaQuery.tablet} {
    dt {
      font-size: 2rem;
    }

    dd {
      font-size: 1.8rem;
    }

    p {
      font-size: 1.8rem;
    }
  }

  @media ${({ theme }) => theme.mediaQuery.desktop} {
    width: 70%;
    /* max-width: ${({ theme }) => theme.layout.width.large}; */
    margin: 0 auto;

    dt {
      font-size: 1.8rem;
    }

    dd {
      font-size: 1.6rem;
    }

    p {
      font-size: 1.6rem;
    }
  }
`;

export default BookDetailPage;
