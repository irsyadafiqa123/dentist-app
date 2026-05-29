"use server";

import { auth, signIn } from "@/auth";
import {
  LoginFormSchema,
  MedicalRecordFormSchema,
  PatientFormSchema,
  ScheduleFormSchema,
} from "@/app/lib/validations";
import { redirect } from "next/navigation";
import { AuthError } from "next-auth";
import { prisma } from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";

type AuthState = {
  errors?: {
    email?: string[];
    password?: string[];
  };
  message?: string | null;
};

// auth actions
export async function authenticate(
  prevState: AuthState | undefined,
  formData: FormData,
) {
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing required fields.",
    };
  }

  try {
    await signIn("credentials", validatedFields.data);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            errors: {},
            message: "Invalid credentials.",
          };
        default:
          return {
            errors: {},
            message: "Something went wrong.",
          };
      }
    }
  }

  redirect("/dashboard");
}

export type PatientState = {
  errors?: {
    name?: string[];
    phone?: string[];
    dateOfBirth?: string[];
    address?: string[];
  };
  message?: string | null;
};

// patient actions
export async function createPatient(
  prevState: PatientState | undefined,
  formData: FormData,
) {
  // validation with PatientFormSchema
  const validatedFields = PatientFormSchema.safeParse({
    name: formData.get("name"),
    phone: formData.get("phone"),
    dateOfBirth: formData.get("dateOfBirth"),
    address: formData.get("address"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing required fields.",
    };
  }

  try {
    // create patient in database with validatedFields.data
    await prisma.patient.create({
      data: {
        name: validatedFields.data.name,
        phone: validatedFields.data.phone,
        birthDate: validatedFields.data.dateOfBirth,
        address: validatedFields.data.address,
      },
    });
  } catch (error) {
    console.log(error);
    return {
      errors: {},
      message: "Database Error: Failed to Create Patient.",
    };
  }

  // revalidatePath & redirect
  revalidatePath("/dashboard/patients");
  redirect("/dashboard/patients");
}

export async function updatePatient(
  prevState: PatientState | undefined,
  formData: FormData,
) {
  // validation with PatientFormSchema
  const validatedFields = PatientFormSchema.safeParse({
    name: formData.get("name"),
    phone: formData.get("phone"),
    dateOfBirth: formData.get("dateOfBirth"),
    address: formData.get("address"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing required fields.",
    };
  }

  // update patient in database with validatedFields.data
  const id = formData.get("id");

  if (typeof id !== "string") {
    return {
      errors: {},
      message: "Invalid Id.",
    };
  }

  try {
    await prisma.patient.update({
      where: { id: +id },
      data: {
        name: validatedFields.data.name,
        phone: validatedFields.data.phone,
        birthDate: validatedFields.data.dateOfBirth,
        address: validatedFields.data.address,
      },
    });
  } catch (error) {
    console.log(error);
    return {
      errors: {},
      message: "Database Error: Failed to Update Patient.",
    };
  }

  // revalidatePath & redirect
  revalidatePath("/dashboard/patients");
  redirect("/dashboard/patients");
}

export async function deletePatient(
  prevState: PatientState | undefined,
  formData: FormData,
) {
  const id = formData.get("id");

  if (typeof id !== "string") {
    return {
      errors: {},
      message: "Invalid Id.",
    };
  }

  try {
    await prisma.patient.delete({
      where: { id: +id },
    });
  } catch (error) {
    console.log(error);
    return {
      errors: {},
      message: "Database Error: Failed to Delete Patient.",
    };
  }

  // revalidatePath & redirect
  revalidatePath("/dashboard/patients");
  redirect("/dashboard/patients");
}

export type AppointmentState = {
  errors?: {
    patientId?: string[];
    datetime?: string[];
    complaint?: string[];
    treatmentPlan?: string[];
    status?: string[];
  };
  message?: string | null;
};

// appointment actions
export async function createAppointment(
  prevState: AppointmentState | undefined,
  formData: FormData,
) {
  const datetime = `${formData.get("date")}T${formData.get("time")}`;

  // validation with ScheduleFormSchema
  const validateFields = ScheduleFormSchema.safeParse({
    patientId: formData.get("patientId"),
    datetime,
    complaint: formData.get("complaint"),
    treatmentPlan: formData.get("treatmentPlan"),
    status: "BOOKED",
  });

  if (!validateFields.success) {
    return {
      errors: validateFields.error.flatten().fieldErrors,
      message: "Missing required fields.",
    };
  }

  try {
    await prisma.appointment.create({
      data: {
        patientId: +validateFields.data.patientId,
        datetime: validateFields.data.datetime,
        complaint: validateFields.data.complaint,
        treatmentPlan: validateFields.data.treatmentPlan,
      },
    });
  } catch (error) {
    console.log(error);
    return {
      errors: {},
      message: "Database Error: Failed to Create Appointment.",
    };
  }

  // revalidatePath & redirect
  revalidatePath("/dashboard/schedules");
  redirect("/dashboard/schedules");
}

export async function updateAppointment(
  prevState: AppointmentState | undefined,
  formData: FormData,
) {
  const datetime = `${formData.get("date")}T${formData.get("time")}`;

  // validation with ScheduleFormSchema
  const validateFields = ScheduleFormSchema.safeParse({
    patientId: formData.get("patientId"),
    datetime,
    complaint: formData.get("complaint"),
    treatmentPlan: formData.get("treatmentPlan"),
    status: formData.get("status"),
  });

  if (!validateFields.success) {
    return {
      errors: validateFields.error.flatten().fieldErrors,
      message: "Missing required fields.",
    };
  }

  // update appointment in database with validatedFields.data
  const id = formData.get("id");

  if (typeof id !== "string") {
    return {
      errors: {},
      message: "Invalid Id.",
    };
  }

  try {
    await prisma.appointment.update({
      where: { id: +id },
      data: {
        complaint: validateFields.data.complaint,
        datetime: validateFields.data.datetime,
        treatmentPlan: validateFields.data.treatmentPlan,
        status: validateFields.data.status as
          | "BOOKED"
          | "FINISHED"
          | "CANCELLED",
      },
    });
  } catch (error) {
    console.log(error);
    return {
      errors: {},
      message: "Database Error: Failed to Update Appointment.",
    };
  }

  // revalidatePath & redirect
  revalidatePath("/dashboard/schedules");
  redirect("/dashboard/schedules");
}

export async function deleteAppointment(
  prevState: AppointmentState | undefined,
  formData: FormData,
) {
  const id = formData.get("id");

  if (typeof id !== "string") {
    return {
      errors: {},
      message: "Invalid Id.",
    };
  }

  try {
    await prisma.appointment.delete({
      where: { id: +id },
    });
  } catch (error) {
    console.log(error);
    return {
      errors: {},
      message: "Database Error: Failed to Delete Appointment.",
    };
  }

  // revalidatePath & redirect
  revalidatePath("/dashboard/schedules");
  redirect("/dashboard/schedules");
}

export type MedicalRecordState = {
  errors?: {
    diagnosis?: string[];
    treatmentResult?: string[];
    treatmentDetail?: string[];
  };
  message?: string | null;
};

// medical record actions
export async function createMedicalRecord(
  prevState: MedicalRecordState | undefined,
  formData: FormData,
) {
  // get appointment id from request
  const appointmentId = formData.get("appointmentId");

  // get user id from server session
  const session = await auth();
  const userId = session?.user?.id;

  if (typeof appointmentId !== "string") {
    return {
      errors: {},
      message: "Invalid Appointment Id.",
    };
  }

  if (typeof userId !== "string") {
    return {
      errors: {},
      message: "Invalid User Id.",
    };
  }

  // validation with MedicalRecordFormSchema
  const validateFields = MedicalRecordFormSchema.safeParse({
    diagnosis: formData.get("diagnosis"),
    treatmentResult: formData.get("treatmentResult"),
    treatmentDetail: formData.get("treatmentDetail"),
  });

  if (!validateFields.success) {
    return {
      errors: validateFields.error.flatten().fieldErrors,
      message: "Missing required fields.",
    };
  }

  try {
    await prisma.medicalRecord.create({
      data: {
        appointmentId: +appointmentId,
        userId: userId,
        diagnosis: validateFields.data.diagnosis,
        treatmentResult: validateFields.data.treatmentResult,
        treatmentDetail: validateFields.data.treatmentDetail,
      },
    });
  } catch (error) {
    console.log(error);
    return {
      errors: {},
      message: "Database Error: Failed to Create Medical Record.",
    };
  }

  // revalidatePath & redirect
  revalidatePath("/dashboard/records");
  redirect("/dashboard/records");
}

export async function updateMedicalRecord(
  prevState: MedicalRecordState | undefined,
  formData: FormData,
) {
  // validation with MedicalRecordFormSchema
  const validateFields = MedicalRecordFormSchema.safeParse({
    diagnosis: formData.get("diagnosis"),
    treatmentResult: formData.get("treatmentResult"),
    treatmentDetail: formData.get("treatmentDetail"),
  });

  if (!validateFields.success) {
    return {
      errors: validateFields.error.flatten().fieldErrors,
      message: "Missing required fields.",
    };
  }

  const id = formData.get("id");

  if (typeof id !== "string") {
    return {
      errors: {},
      message: "Invalid id.",
    };
  }

  try {
    await prisma.medicalRecord.update({
      where: { id: +id },
      data: {
        diagnosis: validateFields.data.diagnosis,
        treatmentResult: validateFields.data.treatmentResult,
        treatmentDetail: validateFields.data.treatmentDetail,
      },
    });
  } catch (error) {
    console.log(error);
    return {
      errors: {},
      message: "Database Error: Failed to Update Medical Record.",
    };
  }

  // revalidatePath & redirect
  revalidatePath("/dashboard/records");
  redirect("/dashboard/records");
}
