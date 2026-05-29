export type Patient = {
  id: number;
  name: string;
  title?: string;
  titleSuffix?: string;
  phone: string;
  address: string | null;
  birthDate: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

export type AppointmentStatus = "FINISHED" | "BOOKED" | "CANCELLED";

export type Appointment = {
  status: AppointmentStatus;
  id: number;
  datetime: Date;
  complaint: string;
  treatmentPlan: string;
  createdAt: Date;
  updatedAt: Date;
  patientId: number;
  patient: Partial<Patient>;
  medicalRecord: MedicalRecord | null;
};

export type MedicalRecord = {
  id: number;
  appointmentId: number;
  userId: string;
  diagnosis: string;
  treatmentResult: string;
  treatmentDetail: string;
  createdAt: Date;
  updatedAt: Date;
  appointment?: Partial<Appointment>;
};
