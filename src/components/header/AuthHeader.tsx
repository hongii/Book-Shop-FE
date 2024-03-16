import styled from "styled-components";
import Dropdown from "@/components/common/Dropdown";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "@react-icons/all-files/fa/FaUserCircle";
import { FaRegUser } from "@react-icons/all-files/fa/FaRegUser";
import { FaSignOutAlt } from "@react-icons/all-files/fa/FaSignOutAlt";
import { useAuthStore } from "@/store/authStore";
import { logout } from "@/api/auth.api";
import { IoCartOutline } from "@react-icons/all-files/io5/IoCartOutline";
import { useAlert } from "@/hooks/useAlert";
import { useCartStore } from "@/store/cartStore";
import { useCarts } from "@/hooks/useCarts";
import { useEffect } from "react";

const AuthHeader = () => {
  const navigate = useNavigate();
  const { storeLogout } = useAuthStore();
  const { showAlert } = useAlert();
  const { carts } = useCarts();
  const { cartItemsCount, updateCartItemsCount } = useCartStore();

  const handleLogout = async () => {
    const { message } = await logout();
    storeLogout();
    showAlert(message);
    navigate("/");
  };

  useEffect(() => {
    if (carts) {
      updateCartItemsCount(carts.length);
    }
  }, [carts]);

  return (
    <AuthHeaderStyle>
      <div className="auth-cart">
        <Link to="/carts">
          <IoCartOutline />
          <span className="cart-icon-count">{cartItemsCount}</span>
        </Link>
      </div>
      <Dropdown toggleButtonIcon={<FaUserCircle />}>
        <ul>
          <li className="auth-link">
            <Link to="/orderlist">
              <FaRegUser /> &nbsp;주문내역
            </Link>
          </li>
          <li className="auth-link">
            <button className="logout-btn" onClick={handleLogout}>
              <FaSignOutAlt /> &nbsp;로그아웃
            </button>
          </li>
        </ul>
      </Dropdown>
    </AuthHeaderStyle>
  );
};

const AuthHeaderStyle = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  gap: 1rem;

  .auth-cart {
    position: relative;
    padding: 0;
    cursor: pointer;

    &:hover {
      opacity: 0.8;
    }

    a {
      padding: 0;
    }
    svg {
      width: 2.4rem;
      height: 2.4rem;
    }

    .cart-icon-count {
      position: absolute;
      text-align: center;
      top: -7px;
      right: -3px;
      border-radius: 50%;
      width: 1.6rem;
      height: 1.6rem;
      font-size: 1.3rem;
      color: #fff;
      background-color: ${({ theme }) => theme.color.third};
    }
  }

  .auth-link,
  .logout-btn {
    width: 100%;
    font-size: 1.3rem;
    font-weight: 600;
    color: ${({ theme }) => theme.color.text};
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    height: 100%;
    cursor: pointer;

    &:hover {
      opacity: 0.8;
    }

    ul {
      margin: 0;
    }

    a {
      padding: 0.8rem;
      display: block;

      &:hover {
        opacity: 0.8;
      }
    }

    .logout-btn {
      padding: 0.8rem;
      border-radius: 8px;
      border: none;
      background-color: transparent;
    }
  }
`;

export default AuthHeader;
