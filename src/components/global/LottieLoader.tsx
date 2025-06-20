import Lottie from "lottie-react";
import loadingLottie from "../../assets/lottie/lottie.json"


const LottieLoader = () => {
  return (
    <div  className="pt-32 lg:pt-40">
      <Lottie
        animationData={loadingLottie}
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
    </div>
  );
};

export default LottieLoader;