import { Formik, FormikHelpers } from "formik";
import { useEffect, useState } from "react";
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
import Dropdown from "../components/Dropdown";
import { ServerlessApiService } from "@/services/ServerlessApiService";
import { Route } from "@/types/stmTypes";

type SelectBusLineFormFields = {
  busLine: number;
  stopId: number;
};

const SelectBusLineFormSchema = yup.object().shape({
  busLine: yup
    .number()
    .required("Required"),
  stopId: yup
    .number()
    .required("Required"),
});

export default function SelectBusLineForm() {
  const [formInitialValues] = useState<SelectBusLineFormFields>({
    busLine: 51,
    stopId: 1,
  });

  const [routes, setRoutes] = useState<Route[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const routes = await ServerlessApiService.getRoutes();
        setRoutes(routes);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Call fetchData only once when the component mounts
    fetchData();
  }, []); // The empty dependency array ensures this effect runs once
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
                <Dropdown label="# ligne" routes={routes} />
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
