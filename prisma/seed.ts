import { prisma } from "@/app/lib/prisma";
import bcrypt from "bcryptjs";

async function main() {
  const hashedPassword = bcrypt.hashSync("dentist123", 10);

  // user data
  const user = await prisma.user.create({
    data: {
      email: "dentist@example.com",
      password: hashedPassword,
      name: "Sari Dewi",
      title: "drg.",
      titleSuffix: "Sp.Ort",
    },
  });

  // patient data
  await prisma.patient.createMany({
    data: [
      {
        name: "Budi Santoso",
        phone: "081234567890",
        address: "Jl. Merdeka No. 12, Medan",
        birthDate: new Date("1985-04-12"),
      },
      {
        name: "Rina Marlina",
        phone: "082199881234",
        address: "Jl. Gatot Subroto No. 45, Medan",
        birthDate: new Date("1992-09-25"),
      },
      {
        name: "Ahmad Fauzi",
        phone: "085711223344",
        address: "Jl. Setia Budi No. 88, Medan",
        birthDate: new Date("1988-01-17"),
      },
      {
        name: "Dewi Lestari",
        phone: "083155667788",
        address: "Jl. Asia No. 21, Medan",
        birthDate: new Date("1995-06-30"),
      },
      {
        name: "Hendra Wijaya",
        phone: "089544332211",
        address: "Jl. Krakatau No. 67, Medan",
        birthDate: new Date("1983-11-08"),
      },
      {
        name: "Siti Nurhaliza",
        phone: "081200112233",
        address: "Jl. Thamrin No. 10, Medan",
        birthDate: new Date("1990-03-14"),
      },
      {
        name: "Rudi Hartono",
        phone: "085734551122",
        address: "Jl. Ring Road No. 5, Medan",
        birthDate: new Date("1979-07-22"),
      },
      {
        name: "Maya Anggraini",
        phone: "081222417753",
        address: "Jl. Cemara No. 33, Medan",
        birthDate: new Date("1998-12-05"),
      },
      {
        name: "Fajar Ramadhan",
        phone: "082277889911",
        address: "Jl. Sisingamangaraja No. 90, Medan",
        birthDate: new Date("1993-08-19"),
      },
      {
        name: "Nadia Putri",
        phone: "081366778899",
        address: "Jl. Diponegoro No. 14, Medan",
        birthDate: new Date("1997-02-27"),
      },
      {
        name: "Agus Salim",
        phone: "085233445566",
        address: "Jl. Juanda No. 71, Medan",
        birthDate: new Date("1981-10-03"),
      },
      {
        name: "Linda Sari",
        phone: "081922334455",
        address: "Jl. Sutomo No. 18, Medan",
        birthDate: new Date("1994-05-09"),
      },
    ],
  });

  // appointment data
  await prisma.appointment.createMany({
    data: [
      {
        complaint: "Gigi belakang sakit saat mengunyah",
        treatmentPlan: "Tooth Extraction",
        datetime: new Date("2026-05-08T08:00:00"),
        patientId: 1,
        status: "FINISHED",
      },
      {
        complaint: "Gigi berlubang",
        treatmentPlan: "Tooth Filling",
        datetime: new Date("2026-05-08T09:00:00"),
        patientId: 2,
        status: "FINISHED",
      },
      {
        complaint: "Karang gigi menumpuk",
        treatmentPlan: "Scaling",
        datetime: new Date("2026-05-08T10:00:00"),
        patientId: 3,
        status: "FINISHED",
      },
      {
        complaint: "Ingin konsultasi gigi sensitif",
        treatmentPlan: "Consultation",
        datetime: new Date("2026-05-08T11:00:00"),
        patientId: 4,
      },
      {
        complaint: "Tambal gigi depan",
        treatmentPlan: "Tooth Filling",
        datetime: new Date("2026-05-08T12:00:00"),
        patientId: 5,
      },
      {
        complaint: "Nyeri gigi geraham",
        treatmentPlan: "Tooth Extraction",
        datetime: new Date("2026-05-08T13:00:00"),
        patientId: 6,
      },
      {
        complaint: "Kontrol rutin gigi",
        treatmentPlan: "Check Regularly",
        datetime: new Date("2026-05-08T14:00:00"),
        patientId: 7,
        status: "CANCELLED",
      },
      {
        complaint: "Pembersihan karang gigi",
        treatmentPlan: "Scaling",
        datetime: new Date("2026-05-08T15:00:00"),
        patientId: 8,
      },
      {
        complaint: "Gigi berlubang bagian depan",
        treatmentPlan: "Tooth Filling",
        datetime: new Date("2026-05-09T08:00:00"),
        patientId: 9,
      },
      {
        complaint: "Nyeri pada gusi",
        treatmentPlan: "Consultation",
        datetime: new Date("2026-05-09T09:00:00"),
        patientId: 10,
        status: "FINISHED",
      },
      {
        complaint: "Karang gigi tebal",
        treatmentPlan: "Scaling",
        datetime: new Date("2026-05-09T10:00:00"),
        patientId: 11,
      },
      {
        complaint: "Cabut gigi bungsu",
        treatmentPlan: "Tooth Extraction",
        datetime: new Date("2026-05-09T11:00:00"),
        patientId: 12,
        status: "CANCELLED",
      },
    ],
  });

  // record data
  await prisma.medicalRecord.createMany({
    data: [
      {
        userId: user.id,
        appointmentId: 1,
        diagnosis: "Infeksi pada gigi geraham kanan bawah",
        treatmentResult: "Tooth Extraction",
        treatmentDetail:
          "Dilakukan anestesi lokal dan pencabutan gigi geraham yang mengalami kerusakan parah.",
      },
      {
        userId: user.id,
        appointmentId: 2,
        diagnosis: "Karies gigi pada gigi molar kiri",
        treatmentResult: "Tooth Filling",
        treatmentDetail:
          "Area gigi dibersihkan dari karies lalu dilakukan penambalan menggunakan resin komposit.",
      },
      {
        userId: user.id,
        appointmentId: 3,
        diagnosis: "Penumpukan plak dan karang gigi",
        treatmentResult: "Scaling",
        treatmentDetail:
          "Dilakukan scaling ultrasonic pada rahang atas dan bawah.",
      },
      {
        userId: user.id,
        appointmentId: 10,
        diagnosis: "Peradangan ringan pada gusi",
        treatmentResult: "Consultation",
        treatmentDetail:
          "Dilakukan pemeriksaan gusi dan diberikan saran menjaga kebersihan mulut serta obat kumur antiseptik.",
      },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
