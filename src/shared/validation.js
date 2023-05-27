import * as yup from "yup";

export const Schema = (maxLength, projectCodePattern, minDate) => {
  return yup
    .object({
      name: yup.string().required("First name is required"),
      surname: yup.string().required("Surname is required"),
      description: yup
        .string()
        .max(maxLength)
        .required("Description is required"),
      country: yup.string().required("Origin Country is required"),
      projectCode: yup
        .string()
        .required("Project Code is required")
        .matches(
          projectCodePattern,
          "The code must be 4 capital character from A to Z and the last 4 digits from 1-9 like “HSLD-3465”"
        ),
      paymentAmount: yup
        .number()
        .required()
        .typeError("Payment Amount is required")
        .positive()
        .integer()
        .min(1)
        .max(100000),
      currency: yup.string().required("Field required"),
      validityPeriod: yup.string().required("Validity Period is required"),
      startDate: yup.date().nullable().required("Validity Period is required")
        .min(minDate, "the date should not start earlier than 15 days from today date"),
    })
    .required();
};
