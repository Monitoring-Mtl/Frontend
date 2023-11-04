"use client";

import { Formik, FormikConfig, FormikValues } from "formik";

export default function FormikWrapper<
  Values extends FormikValues = FormikValues
>(props: FormikConfig<Values>) {
  return <Formik {...props} />;
}
