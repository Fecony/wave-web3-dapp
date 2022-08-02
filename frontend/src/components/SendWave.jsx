import { useEffect, useState } from "react";
import { Formik, Field, Form } from "formik";
import toast from "react-hot-toast";
import {
  useNetwork,
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { rinkeby } from "wagmi/chains";
import Loading from "./Loading.jsx";
import { abi as WavePortalABI } from "../artifacts/contracts/WavePortal.sol/WavePortal.json";

const SendWave = () => {
  const [toastId, setToastId] = useState(null);
  const { chain } = useNetwork();

  const { config } = usePrepareContractWrite({
    addressOrName: import.meta.env.VITE_CONTRACT_ADDRESS,
    contractInterface: WavePortalABI,
    functionName: "wave",
    overrides: {
      gasLimit: 300000,
    },
    onError: (_) => {
      toast.error("Please wait 15 minutes before waving again", {
        icon: "💥",
      });
    },
  });

  const writeToGreeterTx = useContractWrite(config);
  const { isSuccess, isError } = useWaitForTransaction({
    hash: writeToGreeterTx.data?.hash,
  });

  const isCorrectNetwork = chain?.network === rinkeby.network;

  useEffect(() => {
    if (isSuccess) {
      toast.success("Wave sent!", {
        id: toastId,
        icon: "🚀",
      });
    } else if (isError) {
      toast.error("Wave wasn't sent...", {
        id: toastId,
        icon: "😢",
      });
    }
  }, [isSuccess, isError]);

  const handleWave = async ({ message }, { resetForm }) => {
    const loadingToastId = toast.loading("Sending wave!");
    setToastId(loadingToastId);

    await writeToGreeterTx
      .writeAsync?.({
        recklesslySetUnpreparedArgs: message,
      })
      .catch((e) => {
        console.error(e.message);

        toast.error("Wave wasn't sent...", {
          id: loadingToastId,
          icon: "😢",
        });
      });

    resetForm();
  };

  return (
    <Formik
      initialValues={{
        message: "",
      }}
      validate={(values) => {
        const errors = {};

        if (!values.message) {
          errors.message = "Wave message is Required";
        }

        return errors;
      }}
      onSubmit={handleWave}
    >
      {({ isValidating, isSubmitting, errors, touched }) => (
        <>
          <Form className="flex rounded-md shadow-sm">
            <label htmlFor="message" className="sr-only">
              Message
            </label>

            <Field
              id="message"
              name="message"
              disabled={isSubmitting || !isCorrectNetwork}
              placeholder="Wave at me!"
              className="py-3 px-4 block w-full border-gray-200 shadow-sm rounded-l-md text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500"
            />

            <button
              type="submit"
              aria-label="Send message"
              disabled={isSubmitting || !isCorrectNetwork}
              className="inline-flex flex-shrink-0 justify-center items-center h-[2.875rem] w-[2.875rem] rounded-r border border-transparent font-semibold bg-blue-100 hover:bg-blue-200 focus:z-10 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            >
              {isValidating || isSubmitting ? (
                <Loading />
              ) : (
                <span aria-hidden="true">👋</span>
              )}
            </button>
          </Form>

          {errors.message && (
            <span className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-red-100 text-red-800">
              <span className="animate-pulse">
                {errors.message && touched.message && errors.message}
              </span>
            </span>
          )}
        </>
      )}
    </Formik>
  );
};

export default SendWave;
