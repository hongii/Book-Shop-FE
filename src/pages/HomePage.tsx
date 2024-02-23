import Title from "../components/common/Title";
import { formatNumber } from "../utils/format";

const COUNT = 100;
const HomePage = () => {
  return (
    <>
      <section>
        <Title size="medium" color="secondary">
          Home
        </Title>
        <div>{`format number to string : ${formatNumber(COUNT)} ⇒ Type is ${typeof formatNumber(
          COUNT,
        )}`}</div>
      </section>
    </>
  );
};

export default HomePage;
