type UserAvatarProps = {
  name: string;
};

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";

  const first = parts[0][0];
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";

  return (first + last).toUpperCase();
}

export function UserAvatar({ name }: UserAvatarProps) {
  return (
    <div
      aria-hidden
      className="flex size-9 shrink-0 items-center justify-center rounded-full bg-accent text-callout font-semibold text-white"
    >
      {getInitials(name)}
    </div>
  );
}
