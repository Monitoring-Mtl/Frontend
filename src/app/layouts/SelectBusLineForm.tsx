"use client";

import { Formik, FormikHelpers } from "formik";
import { useState } from "react";
import * as yup from "yup";
import {
  CardContent,
  CardHeader,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import FullButton from "../components/FullButton";

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

//Ce composant est fait pour être placé dans une Card MUI
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
      {({ submitForm, setFieldValue, values }) => (
        <>
          <div>
            <CardHeader title="Choix de la ligne et de l'arrêt" />
            <CardContent>
              <FormControl fullWidth>
                <InputLabel># ligne</InputLabel>
                <Select
                  value={values["busLine"]}
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
                  value={values["stopId"]}
                  label="# arrêt"
                  onChange={(e) => setFieldValue("stopId", e.target.value)}
                >
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                  <MenuItem value={4}>4</MenuItem>
                </Select>
              </FormControl>
            </CardContent>
          </div>
          <FullButton onClick={() => submitForm()}>Suivant</FullButton>
        </>
      )}
    </Formik>
  );
}
