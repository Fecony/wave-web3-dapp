import { useContractReads, useAccount } from "wagmi";
import { abi as WavePortalABI } from "../artifacts/contracts/WavePortal.sol/WavePortal.json";
import Loading from "./Loading.jsx";
import CountItem from "./CounItem.jsx";

const WaveCount = () => {
  const { address } = useAccount();

  const contracts = [
    {
      addressOrName: import.meta.env.VITE_CONTRACT_ADDRESS,
      contractInterface: WavePortalABI,
      functionName: "getTotalWaves",
    },
  ];

  if (address) {
    contracts.push({
      addressOrName: import.meta.env.VITE_CONTRACT_ADDRESS,
      contractInterface: WavePortalABI,
      functionName: "getTotalWavesFor",
      args: address,
    });
  }

  const { data, isLoading } = useContractReads({
    contracts,
  });

  if (isLoading || !data) {
    return null;
  }

  const [totalWaves, addressTotalWaves] = data;

  return (
    <div className="flex flex-row space-x-2">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <CountItem text={"Total Waves:"} count={totalWaves} />
          {address && (
            <CountItem
              text={"Your Waves:"}
              count={addressTotalWaves}
              textColor="text-teal-800"
              bgColor="bg-teal-100"
            />
          )}
        </>
      )}
    </div>
  );
};

export default WaveCount;
