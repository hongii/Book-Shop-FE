import Button from "../components/common/Button";
import Title from "../components/common/Title";

const HomePage = () => {
  return (
    <>
      <section>
        <Title size="medium" color="secondary">
          Home
        </Title>
        <Button size="large" scheme="primary" isLoading={false} disabled={false}>
          Button
        </Button>
      </section>
    </>
  );
};

export default HomePage;
