import { useBookDetail } from "@/hooks/useBookDetail";
import styled from "styled-components";
import Button from "@/components/common/Button";
import { useForm } from "react-hook-form";
import { BookReviewItem, BookReviewItemWrite } from "@/models/book.model";
import React, { useRef } from "react";
import { getUserName } from "@/store/authStore";

interface Props {
  bookId: string;
  children: React.ReactNode;
  toggleReviewButton: () => void;
}

const AddBookReview = ({ children, toggleReviewButton, bookId }: Props) => {
  const refId = useRef(8);

  const { addReview } = useBookDetail(bookId);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookReviewItemWrite>();

  const handleReview = (data: BookReviewItemWrite) => {
    const mockData: BookReviewItem = {
      id: refId.current++,
      userName: getUserName() as string,
      review: data.review,
      createdAt: new Date().toISOString(),
      score: data.score,
    };
    addReview({ bookId, reviewData: mockData });
    toggleReviewButton();
  };

  return (
    <AddBookReviewStyle>
      <form onSubmit={handleSubmit(handleReview)}>
        <fieldset>
          <textarea
            placeholder="내용을 입력해 주세요."
            {...register("review", {
              required: { value: true, message: "리뷰 내용을 작성해주세요" },
            })}
          ></textarea>
          {errors.review && <small className="error-msg">{errors.review.message}</small>}
        </fieldset>
        <div className="sub-content">
          <fieldset>
            <select
              {...register("score", { required: true, valueAsNumber: true })}
              defaultValue={5}
            >
              <option value="5">5점</option>
              <option value="4">4점</option>
              <option value="3">3점</option>
              <option value="2">2점</option>
              <option value="1">1점</option>
            </select>
          </fieldset>
          <fieldset>
            <Button size="medium" scheme="primary">
              작성 완료
            </Button>
          </fieldset>
          <fieldset>{children}</fieldset>
        </div>
      </form>
    </AddBookReviewStyle>
  );
};

const AddBookReviewStyle = styled.div`
  margin-top: 0.5rem;

  form {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    fieldset {
      border: 0;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      justify-content: end;
    }

    textarea {
      width: 100%;
      height: 10rem;
      resize: none;
      border-radius: ${({ theme }) => theme.borderRadius.default};
      border: 1px solid ${({ theme }) => theme.color.border};
    }
    .error-msg {
      color: red;
      font-size: 1rem;
    }

    .sub-content {
      display: flex;
      gap: 0.5rem;
      justify-content: flex-end;
      align-items: center;

      select {
        padding: 0.5rem;
        font-size: 1.25rem;
      }
    }
  }
`;

export default AddBookReview;
