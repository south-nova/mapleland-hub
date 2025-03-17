import { IconButton } from '@/components/ui/IconButton';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/ToolTip';
import { useUpdater } from '@/hooks/useUpdater';
import { cn } from '@/lib/cn';
import { useState } from 'react';

interface UpdateButtonProps {
  className?: string;
}

export const UpdateButton = ({ className }: UpdateButtonProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const { isAvailable, isDownloading, isDownloaded, installUpdate } = useUpdater();

  if (!isAvailable) return null;
  return (
    <Tooltip open={isOpen && isDownloaded}>
      <TooltipTrigger asChild>
        <IconButton
          icon={isDownloading ? 'Loading' : 'Update'}
          className={cn(className, isDownloaded && 'bg-surface-accent')}
          iconClassName={cn('size-[14px]', isDownloading && 'animate-spin')}
          onClick={() => isDownloaded && setIsOpen((prev) => !prev)}
        />
      </TooltipTrigger>

      <TooltipContent
        align="center"
        className="flex flex-col gap-3 px-4 pt-4 pb-3 bg-background/80 backdrop-blur-sm mr-2"
      >
        <div className="flex flex-col gap-0.5">
          <p className="font-semibold">새 버전으로 업데이트 되었습니다.</p>
          <p className="text-foreground-muted">원활한 업데이트를 위해 지금 설치를 권장합니다.</p>
        </div>

        <div className="flex gap-1 justify-end">
          <button
            className="text-body-12 px-2 py-0.5 rounded-sm hover:bg-surface cursor-pointer"
            onClick={() => setIsOpen(false)}
          >
            종료 시 설치
          </button>
          <button
            className="text-body-12 px-2 py-0.5 rounded-sm bg-surface hover:bg-surface-accent cursor-pointer"
            onClick={installUpdate}
          >
            지금 재시작
          </button>
        </div>
      </TooltipContent>
    </Tooltip>
  );
};
