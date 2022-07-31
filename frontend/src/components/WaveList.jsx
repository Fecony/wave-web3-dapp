import { useContractRead } from "wagmi";
import { abi as WavePortalABI } from "../artifacts/contracts/WavePortal.sol/WavePortal.json";
import WaveItem from "./WaveItem.jsx";
import Loading from "./Loading.jsx";

const WaveList = () => {
  let {
    data: waves,
    isLoading,
    isError,
  } = useContractRead({
    addressOrName: import.meta.env.VITE_CONTRACT_ADDRESS,
    contractInterface: WavePortalABI,
    functionName: "getAllWaves",
  });

  if (isLoading) {
    return <Loading />;
  }

  if (!waves.length && isError) {
    return null;
  }

  waves = waves.map((wave) => ({
    address: wave.waver,
    timestamp: new Date(wave.timestamp * 1000),
    message: wave.message.trim(),
  }));

  return (
    <div className="md:columns-2 gap-4">
      {waves.map((wave, index) => (
        <WaveItem wave={wave} key={index} />
      ))}
    </div>
  );
};

export default WaveList;
