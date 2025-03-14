import { IconButton } from '@/components/ui/IconButton';
import { useRouter } from 'next/router';

export const Title = () => {
  const router = useRouter();

  return (
    <div className="h-11 w-full flex items-center relative draggable">
      <IconButton
        className="absolute left-2 no-drag"
        icon="ChevronLeft"
        onClick={() => router.back()}
      />
      <IconButton className="absolute right-2 no-drag" icon="Close" />
    </div>
  );
};
