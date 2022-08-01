import { Formik, Field, Form } from "formik";
import toast from "react-hot-toast";
import { useNetwork, usePrepareContractWrite, useContractWrite } from "wagmi";
import { rinkeby } from "wagmi/chains";
import Loading from "./Loading.jsx";
import { abi as WavePortalABI } from "../artifacts/contracts/WavePortal.sol/WavePortal.json";

const SendWave = () => {
  const { chain } = useNetwork();

  const { config } = usePrepareContractWrite({
    addressOrName: import.meta.env.VITE_CONTRACT_ADDRESS,
    contractInterface: WavePortalABI,
    functionName: "wave",
    overrides: {
      gasLimit: 300000,
    },
  });

  const { data, isLoading, isSuccess, writeAsync } = useContractWrite(config);

  // console.log(data, isLoading, isSuccess);
  const isCorrectNetwork = chain?.network === rinkeby.network;

  const handleWave = async ({ message }, { resetForm }) => {
    // TODO: use promise toast
    await writeAsync?.(message)
      .then((s) => {
        console.log(s);
        toast.success("Wave sent!", {
          icon: "🚀",
        });
        resetForm();
      })
      .catch((error) => {
        console.log(error);
      });

    // TODO: handle wave submit
    // eslint-disable-next-line promise/param-names
    // await new Promise((r) => setTimeout(r, 500)).then(() => {
    //   toast.success("Wave sent!", {
    //     icon: "🚀",
    //   });
    //   // eslint-disable-next-line no-undef
    //   alert(JSON.stringify(message, null, 2));
    // });
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
              disabled={isSubmitting}
              placeholder="Wave at me!"
              className="py-3 px-4 block w-full border-gray-200 shadow-sm rounded-l-md text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500"
            />

            <button
              type="submit"
              aria-label="Send message"
              disabled={isSubmitting}
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
