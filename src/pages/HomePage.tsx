import { formatNumber } from "../utils/format";

const COUNT = 100;
const HomePage = () => {
  return (
    <>
      <section>
        <h2>Home</h2>
        <div>{`format number to string : ${formatNumber(COUNT)} ⇒ Type is ${typeof formatNumber(
          COUNT,
        )}`}</div>
      </section>
    </>
  );
};

export default HomePage;
