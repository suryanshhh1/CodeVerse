import { prisma } from "@/lib/prisma";
import CertificatesClient from "./CertificatesClient";

export const metadata = {
  title: "Certificates | Admin",
};

export default async function AdminCertificatesPage() {
  const certificates = await prisma.certificate.findMany({
    include: {
      user: true,
    },
    orderBy: { issuedAt: "desc" }
  });

  return <CertificatesClient initialCertificates={certificates} />;
}
