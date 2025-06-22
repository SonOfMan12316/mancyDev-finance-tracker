import Lottie from "lottie-react";
import emptyStateLottie from "../../assets/lottie/emptystate.json";

const EmptyLottie = () => {
  return (
    <Lottie
      animationData={emptyStateLottie}
      loop={true}
      autoplay={true}
      style={{
        height: "100%",
        width: "100%",
        maxHeight: 80,
        maxWidth: 80,
        margin: "0 auto",
      }}
      rendererSettings={{
        preserveAspectRatio: "xMidYMid slice",
      }}
    />
  );
};

export default EmptyLottie;
