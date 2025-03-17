import { IconButton } from '@/components/ui/IconButton';
import { UpdateButton } from '@/components/UpdateButton';
import { useRouter } from 'next/router';

interface TitleProps {
  back?: boolean;
  update?: boolean;
}

export const Title = ({ back = false, update = false }: TitleProps) => {
  const router = useRouter();

  const handleHide = () => window.ipc.hide();

  const handleClose = () => window.ipc.close();

  return (
    <div className="h-11 w-full flex items-center relative draggable">
      {back && (
        <IconButton
          className="absolute left-2 no-drag"
          icon="ChevronLeft"
          onClick={() => router.back()}
        />
      )}
      <div className="flex gap-0.5 absolute right-2 no-drag">
        {update && <UpdateButton />}
        <IconButton icon="Hide" onClick={handleHide} />
        <IconButton icon="Close" onClick={handleClose} />
      </div>
    </div>
  );
};
