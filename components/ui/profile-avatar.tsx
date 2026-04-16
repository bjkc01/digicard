"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import {
  getWorkspaceAvatarInitials,
  workspaceAvatarStorageKey,
} from "@/lib/workspace-avatar";

type ProfileAvatarProps = {
  avatarUrl?: string;
  className?: string;
  imageClassName?: string;
  name: string;
  textClassName?: string;
};

export function ProfileAvatar({
  avatarUrl,
  className,
  imageClassName,
  name,
  textClassName,
}: ProfileAvatarProps) {
  const [resolvedAvatarUrl, setResolvedAvatarUrl] = useState(avatarUrl ?? "");

  useEffect(() => {
    const storedAvatar =
      typeof window === "undefined"
        ? ""
        : window.localStorage.getItem(workspaceAvatarStorageKey) ?? "";
    setResolvedAvatarUrl(avatarUrl || storedAvatar);
  }, [avatarUrl]);

  if (resolvedAvatarUrl) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        alt={`${name} profile photo`}
        className={cn("object-cover", className, imageClassName)}
        onError={() => setResolvedAvatarUrl("")}
        src={resolvedAvatarUrl}
      />
    );
  }

  return (
    <div
      className={cn(
        "flex items-center justify-center bg-[linear-gradient(135deg,_#172340,_#5267d9)] text-white",
        className,
      )}
    >
      <span className={cn("font-semibold", textClassName)}>
        {getWorkspaceAvatarInitials(name)}
      </span>
    </div>
  );
}
