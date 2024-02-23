import { render, screen } from "@testing-library/react";
import Title from "./Title";
import { BookShopThemeProvider } from "../../context/ThemeContext";

describe("Title Component Testing!", () => {
  it("render check", () => {
    // 1. 렌더 => Title컴포넌트 렌더
    render(
      <BookShopThemeProvider>
        <Title size="large">title</Title>
      </BookShopThemeProvider>,
    );

    // 2. 확인 => 화면상에 해당 문구("title")가 있는지 확인
    expect(screen.getByText("title")).toBeInTheDocument();
  });

  it("size props 적용 확인", () => {
    // 1. 렌더 => Title컴포넌트 렌더
    render(
      <BookShopThemeProvider>
        <Title size="large">title</Title>
      </BookShopThemeProvider>,
    );

    // 2. 확인 => 지정한 폰트 사이즈가 large일 경우, 2rem이 맞는지 확인
    expect(screen.getByText("title")).toHaveStyle({ fontSize: "2rem" });
  });

  it("color props 적용 확인", () => {
    // 1. 렌더 => Title컴포넌트 렌더
    render(
      <BookShopThemeProvider>
        <Title size="large" color="secondary">
          title
        </Title>
      </BookShopThemeProvider>,
    );

    // 2. 확인 => 지정한 color가 secondary일 떄, 해당 color가 blue가 맞는지 확인
    expect(screen.getByText("title")).toHaveStyle({ color: "blue" });
  });
});
