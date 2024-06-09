import ProjectCard from "./ProjectCard";
import AddProjectForm from "./AddProjectForm";
import { useCroudfundingContext } from "../context/CroudfundingProvider";


const Projects = () => {
  const { projects, isAddProjectFormVisible, handleToggleAddProjectForm } = useCroudfundingContext();

  return (
    <div className="flex flex-col items-center justify-start mb-6">
      <div className="flex items-center justify-center mb-6">
        <h1 className="text-2xl md:text-6xl font-bold tracking-tighter text-zinc-100">Our Projects</h1>
        <button
          className="bg-gradient-to-r from-[#C22EA5] to-[#C20EA5] text-white font-bold py-2 px-4 rounded-full ml-4"
          onClick={handleToggleAddProjectForm}
        >
          Add Project
        </button>
      </div>
      {isAddProjectFormVisible && <AddProjectForm />}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {/* TODO create AllProjects page and control splicing by props (on that page render all) */}
        {projects && projects.map((c: any, index: number) => <ProjectCard key={index} {...c} id={index} />).reverse()}
      </div>
    </div>
  );
};

export default Projects;
