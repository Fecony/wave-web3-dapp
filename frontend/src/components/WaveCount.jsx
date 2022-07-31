import { useContractReads, useAccount } from "wagmi";
import { abi as WavePortalABI } from "../artifacts/contracts/WavePortal.sol/WavePortal.json";
import Loading from "./Loading.jsx";
import CountItem from "./CounItem.jsx";

const WaveCount = () => {
  const { address } = useAccount();

  if (!address) {
    return null;
  }

  const {
    data: [totalWaves, addressTotalWaves],
    isError,
    isLoading,
  } = useContractReads({
    contracts: [
      {
        addressOrName: import.meta.env.VITE_CONTRACT_ADDRESS,
        contractInterface: WavePortalABI,
        functionName: "getTotalWaves",
      },
      {
        addressOrName: import.meta.env.VITE_CONTRACT_ADDRESS,
        contractInterface: WavePortalABI,
        functionName: "getTotalWavesFor",
        args: address,
      },
    ],
  });

  if (isError) {
    return null;
  }

  return (
    <div className="flex flex-row space-x-2">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <CountItem text={"Total Waves:"} count={totalWaves} />
          <CountItem
            text={"Your Waves:"}
            count={addressTotalWaves}
            textColor="text-teal-800"
            bgColor="bg-teal-100"
          />
        </>
      )}
    </div>
  );
};

export default WaveCount;
