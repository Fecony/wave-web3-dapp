import { ethers } from "hardhat";

async function main() {
  const waveContractFactory = await ethers.getContractFactory("WavePortal");
  const wavePortal = await waveContractFactory.deploy({
    value: ethers.utils.parseEther("0.001"),
  });

  await wavePortal.deployed();

  console.log("WavePortal deployed to:", wavePortal.address);
}

main()
  .then(() => {
    process.exitCode = 0;
  })
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
