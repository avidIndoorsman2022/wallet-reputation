import React, { useContext } from "react";
import { AiFillPlayCircle } from "react-icons/ai";
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";
import { Loader } from ".";
import { WalletReputationsContext } from "../context/WalletReputationsContext";
import { ReportResults } from ".";

const companyCommonStyles =
  "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white";

const Input = ({ placeholder, name, type, value, handleChange }) => (
  <input
    placeholder={placeholder}
    type={type}
    step="0.0001"
    value={value}
    onChange={(e) => handleChange(e, name)}
    className="my-2 w-full rounded-lg p-2 outline-none bg-transparent text-white border-2 text-sm white-glassmorphism"
  />
);

const Welcome = () => {
  const [showResults, setShowResults] = React.useState(false);
  const {
    getReputationReportsForAddress,
    formData,
    isLoading,
    specificAddressReputationReports,
    handleChange,
  } = useContext(WalletReputationsContext);

  const handleSubmit = (e) => {
    const { addressToLookFor } = formData;

    e.preventDefault();

    if (!addressToLookFor) return;

    getReputationReportsForAddress();
    setShowResults(true);
  };

  return (
    <div className="flex w-full justify-center items-center">
      <div className="flex mf:flex-row flex-col items-start justify-between md:p-5 py-5 px-4">
        <div className="flex flex-1 justify-start items-start flex-col mf:mr-10">
          <h1 className="text-3xl sm:text-5xl text-white text-gradient py-1">
            Check Crypto Addresses <br />
            for scams or frauds
          </h1>
          <p className="text-left mt-5 text-white font-light w-full text-base">
            Enter an address you are about to interact with, then click Check
            Address.
          </p>
        </div>
        <form className="p-5 mt-5 w-full flex flex-col justify-start items-center blue-glassmorphism">
          <Input
            placeholder="Address (or type in 0 to see a sample report)"
            name="addressToLookFor"
            type="text"
            handleChange={handleChange}
          />
          {isLoading ? (
            <Loader />
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              className="text-white bg-[#2952e3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]"
            >
              Check Address
            </button>
          )}
          {showResults ? (
            <ReportResults
              reputationResults={specificAddressReputationReports}
            />
          ) : null}
        </form>
      </div>
    </div>
  );
};

export default Welcome;
