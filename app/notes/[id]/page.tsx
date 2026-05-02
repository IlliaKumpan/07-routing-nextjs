import { Modal } from '@/components/Modal/Modal';
import NotePreviewClient from '../../@modal/(.)notes/[id]/NotePreview.client'; // Імпортуємо наш новий файл

interface Props {
  params: Promise<{ id: string }>;
}

async function getNoteById(id: string) {
  const res = await fetch(`https://notehub-public.goit.study/api/notes/${id}`, {
    cache: 'no-store',
  });
  if (!res.ok) return null;
  return res.json();
}

export default async function NoteModalPage({ params }: Props) {
  const { id } = await params;
  const note = await getNoteById(id);

  if (!note) return null;

  return (
    <Modal>
      {/* Передаємо отриману нотатку в клієнтський компонент */}
      <NotePreviewClient note={note} />
    </Modal>
  );
}