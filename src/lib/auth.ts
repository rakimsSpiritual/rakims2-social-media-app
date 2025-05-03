import { Lucia } from "lucia";
import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

const adapter = new PrismaAdapter(client, {
  user: "users",
  key: "keys",
  session: "sessions"
});

export const auth = new (class extends Lucia {
  constructor() {
    super(adapter, {
      env: process.env.NODE_ENV === "production" ? "PRODUCTION" : "DEV"
    });
  }

  getUserAttributes(user: any) {
    return {
      username: user.username,
      email: user.email,
      displayName: user.displayName,
      avatarUrl: user.avatarUrl
    };
  }
})();
