import { Modal } from '@/components/Modal/Modal';
import NotePreview from '@/components/NotePreview/NotePreview';

interface Props {
  params: { id: string };
}

export default async function NoteModalPage({ params }: Props) {
  const { id } = params;

  return (
    <Modal>
      <NotePreview id={id} />
    </Modal>
  );
}