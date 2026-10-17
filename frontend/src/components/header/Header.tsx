import { Suspense } from "react";
import Image from "next/image";
import { getCurrentUser } from "@/lib/auth";

import { NavTabs } from "./NavTabs";
import { UserAvatar } from "./UserAvatar";

import iconCar from "../../../public/images/icons/car.png";

export function Header() {
  return (
    <header className="grid w-full grid-cols-[1fr_auto] items-center gap-x-4 gap-y-3 px-4 py-3 sm:px-6 md:grid-cols-[1fr_auto_1fr] absolute inset-x-0 top-8 lg:px-10 lg:py-0">
      <div className="flex min-w-0 items-center gap-2 sm:gap-3">
        <Image src={iconCar} alt="IconCar" className="h-5 w-auto sm:h-auto" />
        <h2 className="text-title-2 sm:text-title-1">Drivo</h2>
      </div>
      <div className="col-span-2 row-start-2 md:col-span-1 md:col-start-2 md:row-start-1">
        <NavTabs />
      </div>
      <div className="flex min-w-0 items-center justify-end gap-3">
        <Suspense fallback={<div className="size-9 rounded-full bg-surface-2" />}>
          <HeaderUser />
        </Suspense>
      </div>
    </header>
  );
}

async function HeaderUser() {
  const user = await getCurrentUser();

  return (
    <>
      <span className="hidden truncate text-callout sm:inline">
        {user.name}
      </span>
      <UserAvatar name={user.name} />
    </>
  );
}
