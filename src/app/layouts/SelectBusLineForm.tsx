import React from "react";
import { Formik, FormikHelpers, Field } from "formik";
import { useEffect, useState } from "react";
import * as yup from "yup";
import {
  CardContent,
  CardHeader,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import FullButton from "../components/FullButton";
import { ServerlessApiService } from "@/services/ServerlessApiService";
import { Route, Stop } from "@/types/stmTypes";

type SelectBusLineFormFields = {
  busLine: number;
  stopId: number;
  beginDate: Date;
  beginTime: string;
  endDate: Date;
  endTime: string;
  direction: string;
};

const SelectBusLineFormSchema = yup.object().shape({
  busLine: yup.number().required("Required"),
  stopId: yup.number().required("Required"),
  beginDate: yup.date().required("Required"),
  beginTime: yup.string().required("Required"),
  endDate: yup.date().required("Required"),
  endTime: yup.string().required("Required"),
  direction: yup.string().required("Required"),
});

export default function SelectBusLineForm() {
  const [formInitialValues] = useState<SelectBusLineFormFields>({
    busLine: 51,
    stopId: 1,
    beginDate: new Date(),
    beginTime: "",
    endDate: new Date(),
    endTime: "",
    direction: "",
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

    fetchData();
  }, []);

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
                    updateStopIds(e);
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

              <Field
                component={TextField}
                fullWidth
                name="beginDate"
                label="Date de début"
                type="date"
                onChange={(e) => setFieldValue("beginDate", e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />

              <Field
                component={TextField}
                fullWidth
                name="beginTime"
                label="Heure de début"
                type="time"
                onChange={(e) => setFieldValue("beginTime", e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />

              <Field
                component={TextField}
                fullWidth
                name="endDate"
                label="Date de fin"
                type="date"
                onChange={(e) => setFieldValue("endDate", e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />

              <Field
                component={TextField}
                fullWidth
                name="endTime"
                label="Heure de fin"
                type="time"
                onChange={(e) => setFieldValue("endTime", e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <InputLabel>Direction</InputLabel>
              <Select
                value={values["direction"]}
                label="Direction"
                onChange={(e) => setFieldValue("direction", e.target.value)}
              >
                <MenuItem value="north">North</MenuItem>
                <MenuItem value="south">South</MenuItem>
                <MenuItem value="east">East</MenuItem>
                <MenuItem value="west">West</MenuItem>
              </Select>
            </CardContent>
          </div>
          <FullButton onClick={() => submitForm()}>Suivant</FullButton>
        </>
      )}
    </Formik>
  );
}
