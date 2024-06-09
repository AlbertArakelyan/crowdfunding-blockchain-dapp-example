import React, { FC, PropsWithChildren, createContext, useContext, useState, useCallback } from 'react';
import { prepareContractCall, resolveMethod } from "thirdweb";
import { useSendTransaction, useReadContract } from "thirdweb/react";
import { contract } from "../client";

const CroudfundingContext = createContext<any>(null);

export const useCroudfundingContext = () => useContext(CroudfundingContext);

const initialFormState = {
  owner: "",
  title: "",
  description: "",
  target: 0,
  image: "",
};

const CroudfundingProvider: FC<PropsWithChildren> = ({ children }) => {
  const { mutate: sendTransaction, isError } = useSendTransaction({
  });
  const { data: projects, isLoading } = useReadContract({ 
    contract, 
    method: resolveMethod("getCampaigns"), 
    params: [] 
  });

  console.log('projects', projects);
  

  const [isAddProjectFormVisible, setIsAddProjectFormVisible] = useState(false);
  const [formData, setFormData] = useState(initialFormState);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    
    setFormData((prevFormData) => {
      const newValue = name === "target" ? parseFloat(value) : value;

      return {
        ...prevFormData,
        [name]: newValue,
      };
    });
  };

  const handleToggleAddProjectForm = () => {
    setIsAddProjectFormVisible(!isAddProjectFormVisible);
  };

  const createProject = async () => {
    try {
      const _owner = formData.owner;
      const _title = formData.title;
      const _description = formData.description;
      const _target = formData.target;
      const _deadline = Date.now() + 1000 * 60 * 60 * 24 * 7;
      const _image = formData.image;

      console.log(formData);
      

      const transaction = await prepareContractCall({ 
        contract, 
        method: resolveMethod("createCampaign"),
        params: [_owner, _title, _description, _target, _deadline, _image] 
      });

      const obj = await sendTransaction(transaction);

      console.log('transaction', transaction, obj);

      setFormData(initialFormState);
      setIsAddProjectFormVisible(false);
    } catch (error) {
      console.error('createProject: ', error);
    }
  };

  const donateToCampaign = async (id: number) => {
  const _id = id;

    const transaction = await prepareContractCall({ 
      contract,
      value: 1n, // becomes msg.value on contract
      method: resolveMethod("donateToCampaign"), 
      params: [_id] 
    });
    const obj = await sendTransaction(transaction);

    console.log('transaction', transaction, obj);
  };

  return (
    <CroudfundingContext.Provider value={{
      projects,
      isLoading,
      isError,
      createProject,
      formData,
      setFormData,
      handleChange,
      isAddProjectFormVisible,
      handleToggleAddProjectForm,
      donateToCampaign,
    }}>
      {children}
    </CroudfundingContext.Provider>
  );
};

export default CroudfundingProvider;