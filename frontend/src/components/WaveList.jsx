import WaveItem from "./WaveItem.jsx";

const WaveList = ({ waves }) => {
  const waveList = waves.map((wave, index) => (
    <WaveItem wave={wave} key={index} />
  ));

  return <div className="md:columns-2 gap-4">{waveList}</div>;
};

export default WaveList;
