import { Layout } from "../layout";
import PotCard from "../Pots/potsCard";
import pots from "../../data/pots";

const Pots = () => {
  return (
    <Layout title="pots" displayButton={true} buttonTitle="+ Add New Pots">
      <div className="px-4 lg:px-6 flex flex-col lg:grid lg:grid-cols-2 gap-2 lg:gap-4">
        <>
          {pots.map(({ name, target, total, theme }) => (
            <PotCard
              key={name}
              title={name}
              target={target}
              total={total}
              progressColor={theme}
            />
          ))}
        </>
      </div>
    </Layout>
  );
};

export default Pots;
