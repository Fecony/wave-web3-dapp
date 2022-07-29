import { useAccount } from "wagmi";
import truncateEthAddress from "truncate-eth-address";

const WaveItem = ({ wave }) => {
  const { address } = useAccount();

  const isAuthor = wave.address === address;

  return (
    <div className="break-inside-avoid mb-4 w-full rounded-md bg-white border shadow-sm p-4 md:p-5">
      <span className="flex items-center justify-between">
        <a
          href={`https://rinkeby.etherscan.io/address/${wave.address}`}
          target="_blank"
        >
          <p className="text-xs font-medium text-gray-500">
            {truncateEthAddress(wave.address)}
          </p>
        </a>

        {isAuthor && (
          <span className="inline-flex items-center py-1 px-3 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
            You
          </span>
        )}
      </span>

      <p className="mt-2 text-gray-800">{wave.message}</p>
    </div>
  );
};

export default WaveItem;
