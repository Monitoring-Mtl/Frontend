"use client";

import { Field, Formik, FormikHelpers } from "formik";
import BasicFormLayout from "./BasicFormLayout";
import { useState } from "react";
import * as yup from "yup";
import TxtDanger from "../components/TxtDanger";

type SelectBusLineFormFields = {
  test: string;
};

const SelectBusLineFormSchema = yup.object().shape({
  test: yup
    .string()
    .min(2, "Too Short!")
    .max(5, "Too Long!")
    .required("Required"),
});

export default function SelectBusLineForm() {
  const [formInitialValues] = useState<SelectBusLineFormFields>({
    test: "allo",
  });

  return (
    <Formik
      initialValues={formInitialValues}
      validationSchema={SelectBusLineFormSchema}
      onSubmit={(
        values: SelectBusLineFormFields,
        formikHelpers: FormikHelpers<SelectBusLineFormFields>
      ) => {
        console.log(values);
      }}
    >
      {({ errors, touched, submitForm }) => (
        <>
          <BasicFormLayout
            onSubmit={() => submitForm()}
            title={"Titre"}
            submitText="Suivant"
          >
            <Field name="test" />
            {errors.test && touched.test ? (
              <TxtDanger>{errors.test}</TxtDanger>
            ) : null}
          </BasicFormLayout>
        </>
      )}
    </Formik>
  );
}
