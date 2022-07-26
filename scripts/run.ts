import { ethers } from "hardhat";

const main = async () => {
  const waveContractFactory = await ethers.getContractFactory("WavePortal");

  const waveContract = await waveContractFactory.deploy({
    value: ethers.utils.parseEther("0.1"),
  });

  await waveContract.deployed();

  console.log("WavePortal deployed to:", waveContract.address);

  let contractBalance = await ethers.provider.getBalance(waveContract.address);

  console.log("Contract balance:", ethers.utils.formatEther(contractBalance));

  const waveTxn = await waveContract.wave("This is wave #1");
  await waveTxn.wait();

  contractBalance = await ethers.provider.getBalance(waveContract.address);

  console.log("Contract balance:", ethers.utils.formatEther(contractBalance));

  const allWaves = await waveContract.getAllWaves();

  console.log(allWaves);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0); // exit Node process without error
  } catch (error) {
    console.log(error);
    process.exit(1); // exit Node process while indicating 'Uncaught Fatal Exception' error
  }
  // Read more about Node exit ('process.exit(num)') status codes here: https://stackoverflow.com/a/47163396/7974948
};

runMain();
