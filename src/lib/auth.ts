// src/lib/auth.ts or lucia.ts

import { PrismaClient } from "@prisma/client";
import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { Lucia } from "lucia";

const client = new PrismaClient();

const adapter = new PrismaAdapter(
  client.user,
  client.session,
  client.key
);

export const auth = new Lucia(adapter, {
  env: process.env.NODE_ENV === "production" ? "PRODUCTION" : "DEV",
  getUserAttributes: (data) => {
    return {
      id: data.id,
      username: data.username,
      displayName: data.displayName,
      avatarUrl: data.avatarUrl
    };
  }
});

export type Auth = typeof auth;
