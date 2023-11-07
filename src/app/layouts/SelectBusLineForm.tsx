"use client";

import { Field, Formik, FormikHelpers } from "formik";
import BasicFormLayout from "./BasicFormLayout";
import { useState } from "react";
import * as yup from "yup";
import TxtDanger from "../../components/TxtDanger";
import BusLineOptionList from "@/components/BusLineOptionList";
import StopIdOptionList from "@/components/StopIdOptionList";

type SelectBusLineFormFields = {
  test: string;
  busLine: number;
  stopId: number;
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
    busLine: 51,
    stopId: 1
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
            <div>
              <label htmlFor="busLine">Bus Line:</label>
              <Field name="busLine" as="select">
                <BusLineOptionList />
              </Field>
            </div>
            <div>
            <label htmlFor="stopId">Stop Id:</label>
            <Field name="stopId" as="select">
              <StopIdOptionList />
            </Field>
            </div>
          </BasicFormLayout>
        </>
      )}
    </Formik>
  );
}
