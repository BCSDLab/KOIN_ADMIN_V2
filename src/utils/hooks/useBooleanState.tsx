import { useState } from 'react';

export default function useBooleanState() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const setTrue = () => setIsModalOpen(true);

  const setFalse = () => setIsModalOpen(false);

  return [isModalOpen, setTrue, setFalse] as const;
}
