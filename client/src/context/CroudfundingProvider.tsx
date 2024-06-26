import React, { FC, PropsWithChildren, createContext, useContext, useState, useCallback } from 'react';
import { prepareContractCall, resolveMethod } from "thirdweb";
import { useSendTransaction, useReadContract, useActiveAccount } from "thirdweb/react";
import { ethers } from "ethers";
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
  const activeAccount = useActiveAccount();
  const { mutate: sendTransaction, isError, data: transactionData } = useSendTransaction();

  const { data: projects, isLoading } = useReadContract({ 
    contract, 
    //@ts-ignore
    method: resolveMethod("getCampaigns"), 
    params: [] 
  });

  console.log('transactionData', transactionData);

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
      if (!activeAccount) {
        return alert("Please connect your wallet");
      }

      const _owner = formData.owner;
      const _title = formData.title;
      const _description = formData.description;
      const _target = ethers.parseUnits(formData.target.toString(), 18);
      const _deadline = Date.now() + 365 * 24 * 60 * 60 * 1000;
      const _image = formData.image;

      const transaction = await prepareContractCall({ 
        contract, 
        method: resolveMethod("createCampaign"),
        params: [_owner, _title, _description, _target, _deadline, _image],
      });

      await sendTransaction(transaction);

      setFormData(initialFormState);
      setIsAddProjectFormVisible(false);
    } catch (error) {
      console.error('createProject: ', error);
    }
  };

  const donateToCampaign = async (id: number, amount = '0.0001') => {
    if (!activeAccount) {
      return alert("Please connect your wallet");
    }

    const _id = id;

    const transaction = await prepareContractCall({ 
      contract,
      // correct calculation
      value: ethers.parseUnits(amount, 18), // becomes msg.value on contract
      method: resolveMethod("donateToCampaign"), 
      params: [_id] 
    });

    await sendTransaction(transaction);
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
