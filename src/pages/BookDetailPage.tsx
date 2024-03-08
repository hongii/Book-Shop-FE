import { useParams } from "react-router-dom";
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
  const { bookDetail, toggleLike } = useBookDetail(bookId);

  const handleClickLike = () => {
    toggleLike();
  };

  if (!bookDetail) return null;

  return (
    <BookDetailPageStyle>
      <header>
        <div className="img">
          <img src={getImgSrc(+bookDetail.imgUrl)} alt={bookDetail.title} />
        </div>
        <div className="info">
          <Title size="large" color="text">
            {bookDetail.title}
          </Title>
          {bookInfoList.map((item) => {
            return (
              <dl key={item.key}>
                <dt>{item.label}</dt>
                <dd>
                  {item.filter ? item.filter(bookDetail) : bookDetail[item.key as keyof BookDetail]}
                </dd>
              </dl>
            );
          })}
          <p className="summary">{bookDetail.summary}</p>
          <LikeButton book={bookDetail} onClick={handleClickLike} />
          <AddToCart book={bookDetail} />
        </div>
      </header>
      <section className="contents">
        <Title size="medium">상세 설명</Title>
        <EllipsisBox line={7}>{bookDetail.detail}</EllipsisBox>
        <Title size="medium">목차</Title>
        <p className="index">{bookDetail.contents}</p>
      </section>
    </BookDetailPageStyle>
  );
};

const BookDetailPageStyle = styled.section`
  width: 100%;
  margin: 0 auto;
  max-width: ${({ theme }) => theme.layout.width.large};
  padding: 2rem;
  position: relative;

  header {
    display: flex;
    gap: 1.6rem;
    padding: 0 0 24px 0;
  }

  .img {
    flex: 1;
    width: 100%;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .info {
    flex: 1;

    display: flex;
    flex-direction: column;
    gap: 1rem;

    dl {
      margin: 0;
      display: flex;
    }

    dt {
      font-size: 1.6rem;
      color: ${({ theme }) => theme.color.secondary};
      width: 80px;
    }

    dd {
      font-size: 1.3rem;
    }

    a {
      color: ${({ theme }) => theme.color.third};
      text-decoration: underline;
    }
  }

  p {
    font-size: 1.3rem;
    margin: 1.2rem 0;
  }
`;

export default BookDetailPage;
