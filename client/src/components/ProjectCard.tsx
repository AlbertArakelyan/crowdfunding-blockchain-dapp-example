import { useCroudfundingContext } from "../context/CroudfundingProvider";

const ProjectCard = (props: {
  image: string;
  owner: string;
  title: string;
  description: string;
  amountCollected: bigint;
  deadline: bigint;
  target: bigint;
  id: number;
}) => {
  const { donateToCampaign } = useCroudfundingContext();
  
  return (
    <div className="flex flex-col border border-zinc-800 p-4 rounded-lg hover:bg-zinc-900 transition-colors hover:border-zinc-700 group">
      <div className="flex justify-center overflow-hidden rounded-lg">
        <img
          src={props.image}
          alt={props.title}
          className="w-full rounded-lg h-[300px] object-cover group-hover:scale-105 duration-300"
        />
      </div>
      <h2 className="text-lg font-semibold mt-2">{props.title}</h2>
      <p className="text-sm text-zinc-400 mt-2">{props.description}</p>
      <p className="text-sm text-zinc-400 mt-2 mb-2">
        Collected: {+props.amountCollected.toString() / 23000} ETH
        <br />
        Target: {+props.target.toString() / 23000} ETH
        <br />
        Deadline: {new Date(+props.deadline.toString() * 1000).toLocaleDateString()}
      </p>
      <button
        className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg mt-auto"
        onClick={() => donateToCampaign(props.id)}
      >
        Donate 0.0001 ETH
      </button>
    </div>
  );
};

/*
onClick={() =>
  window.open(
    `https://etherscan.io/address/${props.owner}?utm_source=vite-template`,
    "_blank"
  )
}
*/

export default ProjectCard;
