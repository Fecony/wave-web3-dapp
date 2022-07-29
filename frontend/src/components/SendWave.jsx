import { Formik, Field, Form } from "formik";
import toast from "react-hot-toast";
import { useNetwork } from "wagmi";
import { rinkeby } from "wagmi/chains";
import Loading from "./Loading.jsx";

const SendWave = () => {
  const { chain } = useNetwork();

  const isCorrectNetwork = chain?.network === rinkeby.network;

  const handleWave = async (values, { resetForm }) => {
    // TODO: handle wave submit
    // eslint-disable-next-line promise/param-names
    await new Promise((r) => setTimeout(r, 500)).then(() => {
      toast.success("Wave sent!", {
        icon: "🚀",
      });
      // eslint-disable-next-line no-undef
      alert(JSON.stringify(values, null, 2));
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
              aria-disabled={isValidating || isSubmitting || !isCorrectNetwork}
              disabled={isValidating || isSubmitting || !isCorrectNetwork}
              placeholder="Wave at me!"
              className="py-3 px-4 block w-full border-gray-200 shadow-sm rounded-l-md text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500"
            />

            <button
              type="submit"
              aria-label="Send message"
              aria-disabled={isValidating || isSubmitting || !isCorrectNetwork}
              disabled={isValidating || isSubmitting || !isCorrectNetwork}
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
