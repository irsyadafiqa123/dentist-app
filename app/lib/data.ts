import { prisma } from "@/app/lib/prisma";
import { AppointmentStatus } from "../generated/prisma/enums";

export const ITEMS_PER_PAGE = 8;

export async function getPatients(
  search?: string,
  from?: string,
  to?: string,
  page?: string,
  sortBy?: string,
  sortOrder?: string,
) {
  const currentPage = page ? +page : 1;

  const skip = (currentPage - 1) * ITEMS_PER_PAGE;
  const take = ITEMS_PER_PAGE;

  try {
    const patients = await prisma.patient.findMany({
      where: {
        name: {
          contains: search ? search : undefined,
          mode: "insensitive",
        },
        createdAt: {
          gte: from ? new Date(from) : undefined,
          lte: to ? new Date(to) : undefined,
        },
      },
      orderBy: sortBy
        ? {
            [sortBy]: sortOrder,
          }
        : {
            createdAt: "desc",
          },
      skip,
      take,
    });

    const total = await prisma.patient.count({
      where: {
        name: {
          contains: search,
          mode: "insensitive",
        },
        createdAt: {
          gte: from ? new Date(from) : undefined,
          lte: to ? new Date(to) : undefined,
        },
      },
    });

    return {
      patients,
      total,
    };
  } catch (error) {
    console.error("Error getting patients:", error);
    throw new Error("Database error: Failed to get patients.");
  }
}

export async function getPatientsStats() {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  try {
    const [totalStatic, totalNewThisMonthStatic] = await Promise.all([
      prisma.patient.count(),
      prisma.patient.count({
        where: {
          createdAt: {
            gte: startOfMonth,
          },
        },
      }),
    ]);

    return {
      totalStatic,
      totalNewThisMonthStatic,
    };
  } catch (error) {
    console.error("Error getting patients stats:", error);
    throw new Error("Database error: Failed to get patients stats.");
  }
}

export async function getPatientById(id: number) {
  try {
    const patient = await prisma.patient.findUnique({
      where: { id },
    });

    return patient;
  } catch (error) {
    console.error("Error getting patient:", error);
    throw new Error("Database error: Failed to get patient.");
  }
}

export async function getAppointments(
  search?: string,
  appointmentDate?: string,
  status?: string,
  page?: string,
  sortBy?: string,
  sortOrder?: string,
) {
  const currentPage = page ? +page : 1;

  const skip = (currentPage - 1) * ITEMS_PER_PAGE;
  const take = ITEMS_PER_PAGE;

  try {
    const appointments = await prisma.appointment.findMany({
      where: {
        patient: {
          name: {
            contains: search,
            mode: "insensitive",
          },
        },
        status: status ? (status as AppointmentStatus) : undefined,
        datetime: appointmentDate
          ? {
              gte: new Date(`${appointmentDate}T00:00:00`),
              lte: new Date(`${appointmentDate}T23:59:59`),
            }
          : undefined,
      },
      orderBy: sortBy
        ? {
            [sortBy]: sortOrder,
          }
        : {
            createdAt: "desc",
          },
      include: {
        patient: {
          select: {
            id: true,
            name: true,
          },
        },
        medicalRecord: true,
      },
      skip,
      take,
    });

    const total = await prisma.appointment.count({
      where: {
        patient: {
          name: {
            contains: search,
            mode: "insensitive",
          },
        },
        status: status ? (status as AppointmentStatus) : undefined,
        datetime: appointmentDate
          ? {
              gte: new Date(`${appointmentDate}T00:00:00`),
              lte: new Date(`${appointmentDate}T23:59:59`),
            }
          : undefined,
      },
    });

    return { appointments, total };
  } catch (error) {
    console.error("Error getting appointments:", error);
    throw new Error("Database error: Failed to get appointments.");
  }
}

export async function getAppointmentsStats(date?: string, status?: string) {
  try {
    const [totalFiltered, totalFinished, totalBooked, totalCancelled] =
      await Promise.all([
        prisma.appointment.count({
          where: {
            status: status ? (status as AppointmentStatus) : undefined,
            datetime: date
              ? {
                  gte: new Date(`${date}T00:00:00`),
                  lte: new Date(`${date}T23:59:59`),
                }
              : undefined,
          },
        }),
        prisma.appointment.count({
          where: {
            status: "FINISHED",
            datetime: date
              ? {
                  gte: new Date(`${date}T00:00:00`),
                  lte: new Date(`${date}T23:59:59`),
                }
              : undefined,
          },
        }),
        prisma.appointment.count({
          where: {
            status: "BOOKED",
            datetime: date
              ? {
                  gte: new Date(`${date}T00:00:00`),
                  lte: new Date(`${date}T23:59:59`),
                }
              : undefined,
          },
        }),
        prisma.appointment.count({
          where: {
            status: "CANCELLED",
            datetime: date
              ? {
                  gte: new Date(`${date}T00:00:00`),
                  lte: new Date(`${date}T23:59:59`),
                }
              : undefined,
          },
        }),
      ]);

    return {
      totalFiltered,
      totalFinished,
      totalBooked,
      totalCancelled,
    };
  } catch (error) {
    console.error("Error getting patients stats:", error);
    throw new Error("Database error: Failed to get patients stats.");
  }
}

export async function getPatientsName(search?: string, page?: string) {
  const currentPage = page ? +page : 1;

  const skip = (currentPage - 1) * ITEMS_PER_PAGE;
  const take = ITEMS_PER_PAGE;

  try {
    const patientsName = await prisma.patient.findMany({
      where: {
        name: {
          contains: search ? search : undefined,
          mode: "insensitive",
        },
      },
      select: {
        id: true,
        name: true,
      },
      orderBy: {
        name: "asc",
      },
      skip,
      take,
    });

    const total = await prisma.patient.count({
      where: {
        name: {
          contains: search ? search : undefined,
          mode: "insensitive",
        },
      },
    });

    return { patientsName, total };
  } catch (error) {
    console.error("Error getting patients name:", error);
    throw new Error("Database error: Failed to get patients name.");
  }
}

export async function getAppointmentById(id: number) {
  try {
    const appointment = await prisma.appointment.findUnique({
      where: { id },
      include: {
        patient: {
          select: {
            id: true,
            name: true,
          },
        },
        medicalRecord: true,
      },
    });

    return appointment;
  } catch (error) {
    console.error("Error getting appointment:", error);
    throw new Error("Database error: Failed to get appointment.");
  }
}

export async function getMedicalRecordById(id: number) {
  try {
    const medicalRecord = await prisma.medicalRecord.findUnique({
      where: { id },
      include: {
        appointment: {
          select: {
            id: true,
            complaint: true,
            patient: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    return medicalRecord;
  } catch (error) {
    console.error("Error getting medical record:", error);
    throw new Error("Database error: Failed to get medical record.");
  }
}

export async function getMedicalRecords(
  patientId: number,
  from?: string,
  to?: string,
) {
  try {
    const medicalRecords = await prisma.medicalRecord.findMany({
      where: {
        appointment: {
          patientId,
          medicalRecord: {
            isNot: null,
          },
        },
        createdAt: {
          gte: from ? new Date(from) : undefined,
          lte: to ? new Date(`${to}T23:59:59`) : undefined,
        },
      },
      include: {
        appointment: {
          select: {
            id: true,
            complaint: true,
            datetime: true,
            patient: {
              select: {
                id: true,
                name: true,
                birthDate: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return medicalRecords;
  } catch (error) {
    console.error("Error getting medical records:", error);
    throw new Error("Database error: Failed to get medical records.");
  }
}

export async function getDashboardStats() {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  try {
    const [
      totalPatient,
      totalTodayAppointment,
      totalTodayCompleted,
      totalMonthlyCompleted,
      totalMonthlyCancelled,
      totalMonthlyAppointment,
      totalPatientsThisMonth,
    ] = await Promise.all([
      prisma.patient.count(),
      prisma.appointment.count({
        where: {
          datetime: {
            gte: new Date(`${now.toISOString().split("T")[0]}T00:00:00`),
            lte: new Date(`${now.toISOString().split("T")[0]}T23:59:59`),
          },
        },
      }),
      prisma.appointment.count({
        where: {
          status: "FINISHED",
          datetime: {
            gte: new Date(`${now.toISOString().split("T")[0]}T00:00:00`),
            lte: new Date(`${now.toISOString().split("T")[0]}T23:59:59`),
          },
        },
      }),
      prisma.appointment.count({
        where: {
          status: "FINISHED",
          datetime: {
            gte: startOfMonth,
          },
        },
      }),
      prisma.appointment.count({
        where: {
          status: "CANCELLED",
          datetime: {
            gte: startOfMonth,
          },
        },
      }),
      prisma.appointment.count({
        where: {
          datetime: {
            gte: startOfMonth,
          },
        },
      }),
      prisma.patient.count({
        where: {
          createdAt: {
            gte: startOfMonth,
          },
        },
      }),
    ]);

    return {
      totalPatient,
      totalTodayAppointment,
      totalTodayCompleted,
      totalMonthlyCompleted,
      totalMonthlyCancelled,
      totalMonthlyAppointment,
      totalPatientsThisMonth,
    };
  } catch (error) {
    console.error("Error getting dashboard stats:", error);
    throw new Error("Database error: Failed to get dashboard stats.");
  }
}

export async function getTodayAppointments() {
  try {
    const appointments = await prisma.appointment.findMany({
      where: {
        datetime: {
          gte: new Date(`${new Date().toISOString().split("T")[0]}T00:00:00`),
          lte: new Date(`${new Date().toISOString().split("T")[0]}T23:59:59`),
        },
      },
      orderBy: {
        datetime: "asc",
      },
      include: {
        patient: {
          select: {
            name: true,
          },
        },
      },
    });

    return appointments;
  } catch (error) {
    console.error("Error getting today appointments:", error);
    throw new Error("Database error: Failed to get today appointments.");
  }
}

export async function getNextAppointments() {
  try {
    const appointments = await prisma.appointment.findMany({
      where: {
        datetime: {
          gt: new Date(`${new Date().toISOString().split("T")[0]}T23:59:59`),
        },
        status: "BOOKED",
      },
      orderBy: {
        datetime: "asc",
      },
      include: {
        patient: {
          select: {
            name: true,
          },
        },
      },
      take: 3,
    });

    return appointments;
  } catch (error) {
    console.error("Error getting next appointments:", error);
    throw new Error("Database error: Failed to get next appointments.");
  }
}
