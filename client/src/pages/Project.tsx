import { useState, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { useCroudfundingContext } from "../context/CroudfundingProvider";
import { ethers } from "ethers";
import CountBox from "../components/CountBox";
import thirdwebIcon from "../thirdweb.svg";
import { contract } from "../client";
import { useReadContract } from "thirdweb/react";
import { resolveMethod } from "thirdweb";

const Project = () => {
  const { id } = useParams();

  const { projects, isLoading, donateToCampaign } = useCroudfundingContext();

  const { data: donations, isLoading: isLoadingDonations } = useReadContract({ 
    contract, 
    //@ts-ignore
    method: resolveMethod("getDonators"), 
    params: [Number(id)],
  });

  const [value, setValue] = useState('');

  const project = projects && projects[Number(id)];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleDonate = () => {
    if (!value) {
      return alert("Please enter a value");
    }

    donateToCampaign(id, value);
  };

  const parsedDonations = useMemo(() => {
    if (!donations) {
      return [];
    }

    const normalizedDonations = [];
    const numberOfDonations = (donations as any)[0].length;

    for (let i = 0; i < numberOfDonations; i++) {
      normalizedDonations.push({
        donator: (donations as any)[0][i],
        donation: ethers.formatEther((donations as any)[1][i].toString()),
      });
    }

    return normalizedDonations;
  }, [donations]);

  console.log('parsedDonations', parsedDonations);
  

  if (isLoading) {
    return <div className="text-center">Loading...</div>;
  }

  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <div className="border border-zinc-800 rounded-lg p-4 w-full max-w-7xl mx-auto mb-20">
      <div className="flex flex-col items-center justify-center">
        <Link to="/" className="text-blue-600 underline text-left self-start hover:text-blue-800 mb-3">
          &#8592; Back to Projects
        </Link>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold sm:text-center">{project?.title}</h1>
        <p className="text-sm sm:text-base mt-4 sm:mt-8 text-center">{project?.description}</p>
        <div className="flex flex-col items-center justify-center gap-4 mt-4">
          <div className="mb-4 max-w-[300px] sm:max-w-[500px]">
            <img
              src={project.image}
              alt={project.title}
              className="w-full rounded-lg"
            />
          </div>
          <div className="flex flex-col items-center justify-center w-full gap-2 sm:flex-row sm:items-start sm:justify-start sm:gap-0">
            <div className="flex items-center justify-center rounded-full bg-zinc-700 ">
              <img className="w-4 h-4 sm:w-6 sm:h-6" src={thirdwebIcon} alt="thirdweb" />
            </div>
            <div className="flex flex-col items-start justify-center mt-2 sm:mt-0 sm:ml-2">
              <span className="font-semibold sm:font-thin text-white text-xs md:text-lg">{project.owner}</span>
              <span className="font-semibold text-zinc-400 text-xs md:text-lg">10 Campaigns</span>
            </div>
          </div>
          <div className="font-semibold w-full">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4">
              <CountBox
                title="Target"
                value={`${ethers.formatEther(project.target.toString())} ETH`}
              />
              <CountBox
                title="Collected"
                value={`${ethers.formatEther(project.amountCollected.toString())} ETH`}
              />
              <CountBox
                title="Deadline"
                value={new Date(+project.deadline.toString()).toLocaleDateString()}
              />
            </div>
          </div>
          <div className="bg-zinc-700 p-4 rounded-lg shadow-md w-full">
            <div className="flex flex-col gap-2 mb-4">
              {parsedDonations?.map((donation, index) => (
                <div key={index} className="border-b border-zinc-800 py-2 sm:flex sm:items-center sm:justify-between">
                  <div className="flex items-center sm:mb-0">
                    <p className="font-semibold text-zinc-300 text-[10px] md:text-base">{donation.donator}</p>
                  </div>
                  <div className="mt-2 sm:mt-0 sm:ml-6">
                    <span className="font-semibold text-zinc-400 text-xs md:text-lg">
                      {donation.donation} ETH
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-3 w-full">
              <div className="text-center">
                <p className="text-zinc-300 italic text-center text-shadow-md font-semibold text-sm sm:text-base">
                  Give a hand to this project, and let it grow
                </p>
              </div>
              <input
                type="number"
                name="target"
                onChange={handleChange}
                value={value}
                className="bg-zinc-50 text-zinc-800 text-sm p-2 rounded-lg w-full sm:text-xs"
              />
              <button
                className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 sm:text-xs"
                onClick={handleDonate}
              >
                Donate
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Project;
