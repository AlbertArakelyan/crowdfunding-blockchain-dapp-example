import { useCroudfundingContext } from "../context/CroudfundingProvider"

const AddProjectForm = () => {
  const { formData, handleChange, createProject } = useCroudfundingContext();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createProject();
  };

  return (
    <form className="flex flex-col gap-4 w-full max-w-96 mb-6" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-1">
        <label className="text-sm font-semibold">Owner</label>
        <input
          type="text"
          name="owner"
          value={formData.owner}
          onChange={handleChange}
          className="bg-zinc-50 text-zinc-800 text-sm p-2 rounded-lg"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm font-semibold">Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="bg-zinc-50 text-zinc-800 text-sm p-2 rounded-lg"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm font-semibold">Description</label>
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="bg-zinc-50 text-zinc-800 text-sm p-2 rounded-lg"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm font-semibold">Target</label>
        <input
          type="number"
          name="target"
          value={+formData.target.toString()}
          onChange={handleChange}
          className="bg-zinc-50 text-zinc-800 text-sm p-2 rounded-lg"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm font-semibold">Image</label>
        <input
          type="text"
          name="image"
          value={formData.image}
          onChange={handleChange}
          className="bg-zinc-50 text-zinc-800 text-sm p-2 rounded-lg"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg"
      >
        Submit
      </button>
    </form>
  );
};

export default AddProjectForm;
