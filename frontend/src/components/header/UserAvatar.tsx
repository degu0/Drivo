type UserAvatarProps = {
  name: string;
  size?: "md" | "lg";
};

const sizeClass = {
  md: "size-9 text-callout",
  lg: "size-24 text-title-1",
};

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";

  const first = parts[0][0];
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";

  return (first + last).toUpperCase();
}

export function UserAvatar({ name, size = "md" }: UserAvatarProps) {
  return (
    <div
      aria-hidden
      className={`flex shrink-0 items-center justify-center rounded-full bg-accent font-semibold text-white ${sizeClass[size]}`}
    >
      {getInitials(name)}
    </div>
  );
}
