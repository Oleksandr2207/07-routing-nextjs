"use client";

import { useRouter } from "next/navigation";
import NoteDetailsClient from "../[id]/NoteDetails.client";
import Modal from "@/components/Modal/Modal";

type Props = {
  params: { id: string };
};

export default function NoteModal({ params }: Props) {
  const router = useRouter();

  return (
    <Modal onClose={() => router.back()}>
      <NoteDetailsClient />
    </Modal>
  );
}
