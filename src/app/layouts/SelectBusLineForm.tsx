"use client";

import { Field, Formik, FormikHelpers } from "formik";
import BasicFormLayout from "./BasicFormLayout";
import { useState } from "react";
import * as yup from "yup";
import TxtDanger from "../../components/TxtDanger";
import BusLineOptionList from "@/components/BusLineOptionList";
import StopIdOptionList from "@/components/StopIdOptionList";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

type SelectBusLineFormFields = {
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
    busLine: 51,
    stopId: 1,
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
      {({ errors, touched, submitForm, setFieldValue }) => (
        <>
          <BasicFormLayout
            onSubmit={() => submitForm()}
            title={"Choix de la ligne et de l'arrêt"}
            submitText="Suivant"
          >
            <FormControl fullWidth>
              <InputLabel># ligne</InputLabel>
              <Select
                label="# ligne"
                onChange={(e) => setFieldValue("busLine", e.target.value)}
              >
                <MenuItem value={51}>51</MenuItem>
                <MenuItem value={80}>80</MenuItem>
                <MenuItem value={480}>480</MenuItem>
                <MenuItem value={168}>168</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel># arrêt</InputLabel>
              <Select
                label="# arrêt"
                onChange={(e) => setFieldValue("stopId", e.target.value)}
              >
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
              </Select>
            </FormControl>
          </BasicFormLayout>
        </>
      )}
    </Formik>
  );
}
