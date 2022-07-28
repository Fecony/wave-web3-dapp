// import { useMetaMask } from "metamask-react";
import { Formik, Field, Form } from "formik";
import Loading from "./Loading.jsx";

const SendWave = () => {
  // const { chainId } = useMetaMask();
  const isCorrectTestnet = chainId === "0x4";

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
      onSubmit={async (values) => {
        // TODO: handle wave submit
        await new Promise((r) => setTimeout(r, 500));
        alert(JSON.stringify(values, null, 2));
      }}
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
              aria-disabled={isValidating || isSubmitting || !isCorrectTestnet}
              disabled={isValidating || isSubmitting || !isCorrectTestnet}
              placeholder="Wave at me!"
              className="py-3 px-4 block w-full border-gray-200 shadow-sm rounded-l-md text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500"
            />

            <button
              type="submit"
              aria-label="Send message"
              aria-disabled={isValidating || isSubmitting || !isCorrectTestnet}
              disabled={isValidating || isSubmitting || !isCorrectTestnet}
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
            <span class="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-red-100 text-red-800">
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
