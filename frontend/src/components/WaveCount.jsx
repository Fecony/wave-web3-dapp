import { useContractReads, useAccount } from "wagmi";
import { abi as WavePortalABI } from "../artifacts/contracts/WavePortal.sol/WavePortal.json";
import Loading from "./Loading.jsx";

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

  console.log("Retrieved total wave count...", totalWaves.toNumber());
  console.log(
    "Retrieved total wave count for address...",
    addressTotalWaves.toNumber()
  );

  return (
    <div className="flex flex-row space-x-2">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <span className="inline-flex flex-grow justify-center items-center gap-1.5 py-1.5 px-3 rounded text-xs font-medium bg-blue-100 text-blue-800">
            Total Waves:
            <span className="inline-block items-center py-0.5 px-1.5 rounded-full text-xs text-indigo-800">
              {totalWaves.toNumber()}
            </span>
          </span>

          <span className="inline-flex flex-grow justify-center items-center gap-1.5 py-1.5 px-3 rounded text-xs font-medium bg-teal-100 text-teal-800">
            Your Waves:
            <span className="inline-block items-center py-0.5 px-1.5 rounded-full text-xs text-teal-800">
              {addressTotalWaves.toNumber()}
            </span>
          </span>
        </>
      )}
    </div>
  );
};

export default WaveCount;
