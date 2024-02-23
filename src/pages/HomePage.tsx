import Button from "../components/common/Button";
import InputText from "../components/common/InputText";
import Title from "../components/common/Title";

const HomePage = () => {
  return (
    <>
      <section>
        <Title size="medium" color="secondary">
          Home
        </Title>
        <InputText placeholder="입력하세요." />
        <Button size="large" scheme="primary" isLoading={false} disabled={false}>
          Button
        </Button>
      </section>
    </>
  );
};

export default HomePage;
