import { ConnectButton } from "thirdweb/react";
import { client } from "../client";
import Projects from "../components/Projects";

const Home = () => {
  return (
    <div className="mb-20">
      <div className="flex justify-center mb-20">
        <ConnectButton
          client={client}
          appMetadata={{
            name: "Example app",
            url: "https://example.com",
          }}
        />
      </div>

      <Projects />
    </div>
  );
};

export default Home;
