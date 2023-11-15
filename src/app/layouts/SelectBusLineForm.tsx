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
import { ServerlessApiService } from "@/services/ServerlessApiService";
import { Route, Stop } from "@/types/stmTypes";

type SelectBusLineFormFields = {
  busLine: number;
  stopId: number;
};

const SelectBusLineFormSchema = yup.object().shape({
  busLine: yup.number().required("Required"),
  stopId: yup.number().required("Required"),
});

export default function SelectBusLineForm() {
  const [formInitialValues] = useState<SelectBusLineFormFields>({
    busLine: 51,
    stopId: 1,
  });

  const [routes, setRoutes] = useState<Route[]>([]);
  const [stopIds, setStopIds] = useState<Stop[] | null>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const routes = await ServerlessApiService.getRoutes();
        setRoutes(routes);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Call fetchData only once when the component mounts
    fetchData();
  }, []); // The empty dependency array ensures this effect runs once

  const updateStopIds = async (event) => {
    try {
      const stopIds = await ServerlessApiService.getStops(event.target.value);
      setStopIds(stopIds || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <Formik
      initialValues={formInitialValues}
      validationSchema={SelectBusLineFormSchema}
      onSubmit={(values: SelectBusLineFormFields) => {
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
                  onChange={(e) => {
                    setFieldValue("busLine", e.target.value);
                    updateStopIds(e); // Call updateStopIds when bus line changes
                  }}
                >
                  {routes.map((route) => (
                    <MenuItem key={route.id} value={route.id}>
                      {route.id}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel># arrêt</InputLabel>
                <Select
                  value={values["stopId"]}
                  label="# arrêt"
                  onChange={(e) => setFieldValue("stopId", e.target.value)}
                >
                  {stopIds &&
                    stopIds.map((stop) => (
                      <MenuItem key={stop.id} value={stop.id}>
                        {stop.id}
                      </MenuItem>
                    ))}
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
