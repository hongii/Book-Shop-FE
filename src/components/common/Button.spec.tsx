import { render, screen } from "@testing-library/react";
import { BookShopThemeProvider } from "../../context/ThemeContext";
import Button from "./Button";

describe("Title Component Testing!", () => {
  it("render check", () => {
    // 1. 렌더 => Title컴포넌트 렌더
    render(
      <BookShopThemeProvider>
        <Button size="large" scheme="primary">
          button
        </Button>
      </BookShopThemeProvider>,
    );

    // 2. 확인 => 화면상에 해당 문구("title")가 있는지 확인
    expect(screen.getByText("button")).toBeInTheDocument();
  });

  it("size props 적용 확인", () => {
    // 1. 렌더 => Title컴포넌트 렌더
    render(
      <BookShopThemeProvider>
        <Button size="large" scheme="primary">
          button
        </Button>
      </BookShopThemeProvider>,
    );

    // 2. 확인 => 지정한 폰트 사이즈가 large일 경우, 2rem이 맞는지 확인
    expect(screen.getByRole("button")).toHaveStyle({ fontSize: "1.5rem" });
  });

  it("color props 적용 확인", () => {
    // 1. 렌더 => Title컴포넌트 렌더
    render(
      <BookShopThemeProvider>
        <Button size="large" scheme="primary">
          button
        </Button>
      </BookShopThemeProvider>,
    );

    // 2. 확인 => 지정한 color가 secondary일 떄, 해당 color가 blue가 맞는지 확인
    expect(screen.getByRole("button")).toHaveStyle({ color: "white" });
  });
});
