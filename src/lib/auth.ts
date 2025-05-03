import { PrismaClient } from "@prisma/client";
import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { Lucia } from "lucia";

const client = new PrismaClient();

const adapter = new PrismaAdapter({
  user: client.user,
  session: client.session,
  key: client.key // Ensure you have this model in your Prisma schema
});

export const auth = new Lucia(adapter, {
  env: process.env.NODE_ENV === "production" ? "PRODUCTION" : "DEV",
  getUserAttributes: (data) => ({
    id: data.id,
    username: data.username,
    displayName: data.displayName,
    avatarUrl: data.avatarUrl
  })
});

export type Auth = typeof auth;
