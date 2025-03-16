import { CheckCircle, Copy, Discord } from '@/components/icons';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/HoverCard';
import { DiscordUserInfo } from '@/types/item';
import Image from 'next/image';
import { useState } from 'react';

export const DiscordTag = ({ user }: { user: DiscordUserInfo }) => {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(user.account);

    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 1200);
  };

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <a
          href={`discord://`}
          className="flex gap-2 items-center px-2 py-0.5 hover:bg-surface-accent transition-colors duration-150 select-none rounded-sm"
        >
          <Discord />
          <span className="text-body-14">{user.nickName}</span>
        </a>
      </HoverCardTrigger>

      <HoverCardContent className="flex gap-3 items-center">
        <div className="relative flex size-12 p-1 rounded-full overflow-hidden border border-border/40 bg-surface">
          <Image src={user.avatarUrl} alt={user.nickName} fill className="object-contain" />
        </div>

        <div className="flex flex-col">
          <p className="text-title-16 ml-2">{user.nickName}</p>
          <button
            className="flex text-body-14 w-fit text-foreground-muted gap-2 items-center px-2 py-1 hover:bg-surface rounded-sm"
            onClick={copyToClipboard}
          >
            {user.account}
            {isCopied ? <CheckCircle className="text-[#30A46C]" /> : <Copy />}
          </button>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};
