import z from "zod";

export const LoginFormSchema = z.object({
  email: z
    .email({ message: "Invalid email address" })
    .min(1, { message: "This field has to be filled." }),
  password: z.string().min(1, { message: "This field has to be filled." }),
});

export const PatientFormSchema = z.object({
  name: z
    .string()
    .min(1, { message: "This field has to be filled." })
    .max(100, { message: "Name cannot exceed 100 characters." }),
  phone: z
    .string()
    .min(1, { message: "This field has to be filled." })
    .max(15, { message: "Phone number cannot exceed 15 characters." }),
  dateOfBirth: z
    .string()
    .optional()
    .transform((str) => (str ? new Date(str) : undefined)),
  address: z.string().optional(),
});

export const ScheduleFormSchema = z.object({
  patientId: z.string({ message: "Please select a patient." }),
  datetime: z.string().transform((str) => new Date(str)),
  complaint: z.string().min(1, { message: "This field has to be filled." }),
  treatmentPlan: z.string().min(1, { message: "This field has to be filled." }),
  status: z.string(),
});

export const MedicalRecordFormSchema = z.object({
  diagnosis: z.string().min(1, { message: "This field has to be filled." }),
  treatmentResult: z
    .string()
    .min(1, { message: "This field has to be filled." }),
  treatmentDetail: z
    .string()
    .min(1, { message: "This field has to be filled." }),
});
