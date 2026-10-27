"use client";

import { useEffect, useState } from "react";

export type Member = { email: string | null; owns: string[] };

// One request per page load, shared by every component that asks.
let pending: Promise<Member> | null = null;

function load(): Promise<Member> {
  pending ??= fetch("/api/account/me", { cache: "no-store" })
    .then((r) => (r.ok ? r.json() : { email: null, owns: [] }))
    .catch(() => ({ email: null, owns: [] }));
  return pending;
}

/** The signed-in member, or undefined while loading. */
export function useMember() {
  const [member, setMember] = useState<Member | undefined>(undefined);
  useEffect(() => {
    let live = true;
    load().then((m) => live && setMember(m));
    return () => {
      live = false;
    };
  }, []);
  return member;
}
