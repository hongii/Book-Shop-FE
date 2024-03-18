import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { useBookDetail } from "@/hooks/useBookDetail";
import { getImgSrc } from "@/utils/image";
import Title from "@/components/common/Title";
import { BookDetail } from "@/models/book.model";
import { formatDate, formatNumber } from "@/utils/format";
import { Link } from "react-router-dom";
import EllipsisBox from "@/components/common/EllipsisBox";
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

const bookInfoList = [
  {
    label: "카테고리",
    key: "categoryName",
    filter: (book: BookDetail) => (
      <Link to={`/books?page=1&category_id=${book.categoryId}`}>{book.categoryName}</Link>
    ),
  },
  { label: "포맷", key: "form" },
  { label: "페이지", key: "pages" },
  { label: "ISBN", key: "isbn" },
  {
    label: "출간일",
    key: "publishedDate",
    filter: (book: BookDetail) => formatDate(book.publishedDate, ""),
  },
  { label: "가격", key: "price", filter: (book: BookDetail) => `${formatNumber(book.price)}원` },
];

const BookDetailPage = () => {
  const { bookId } = useParams();
  const { isLoggedIn } = useAuthStore();
  const { showConfirm } = useAlert();
  const navigate = useNavigate();
  const { bookDetail, toggleLike, isBookDetailLoading, bookReview, isBookReviewLoading } =
    useBookDetail(bookId);
  const [isImgOpen, setIsImgOpen] = useState<boolean>(false);

  if (!bookId) return <Error />;
  if (isBookDetailLoading || isBookReviewLoading) return <Loading />;
  if (!bookDetail || !bookReview) return <Error />;

  const handleClickLike = () => {
    if (!isLoggedIn) {
      showConfirm("로그인이 필요합니다. 로그인 후 이용해주세요.", () => navigate("/login"));
      return;
    }

    toggleLike(+bookId);
  };

  return (
    <BookDetailPageStyle>
      <header>
        <div className="img">
          <img
            onClick={() => setIsImgOpen(true)}
            src={getImgSrc(+bookDetail.imgUrl)}
            alt={bookDetail.title}
          />
        </div>
        {isImgOpen && (
          <Modal onClosed={() => setIsImgOpen(false)}>
            <ModalBookImg>
              <img src={getImgSrc(+bookDetail.imgUrl)} alt={bookDetail.title} />
            </ModalBookImg>
          </Modal>
        )}
        <div className="info-contianer">
          <div className="info">
            <Title size="large" color="text">
              {bookDetail.title}
            </Title>
            {bookInfoList.map((item) => {
              return (
                <dl key={item.key}>
                  <dt>{item.label}</dt>
                  <dd>
                    {item.filter
                      ? item.filter(bookDetail)
                      : bookDetail[item.key as keyof BookDetail]}
                  </dd>
                </dl>
              );
            })}
            {/* <p className="summary">{bookDetail.summary}</p> */}
            <EllipsisBox line={4}>{bookDetail.summary}</EllipsisBox>
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
              <p className="detail">{bookDetail.detail}</p>
            </div>
          </Tab>
          <Tab title="목차">
            <div>
              <Title size="medium">목차</Title>
              <p className="index">{bookDetail.contents}</p>
            </div>
          </Tab>
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

  header {
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
    flex: 1;

    display: flex;
    flex-direction: column;
    gap: 1rem;

    dl {
      margin: 0;
      display: flex;
      justify-content: space-between;
    }

    dt {
      color: ${({ theme }) => theme.color.secondary};
    }

    a {
      color: ${({ theme }) => theme.color.third};
      text-decoration: underline;
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
    header {
      flex-wrap: wrap;
    }

    dt {
      font-size: 2.4rem;
    }

    dd {
      font-size: 2.2rem;
    }

    p {
      font-size: 2.2rem;
    }
  }

  @media ${({ theme }) => theme.mediaQuery.tablet} {
    dt {
      font-size: 2.2rem;
    }

    dd {
      font-size: 1.8rem;
    }

    p {
      font-size: 1.8rem;
    }
  }

  @media ${({ theme }) => theme.mediaQuery.desktop} {
    dt {
      font-size: 2rem;
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
