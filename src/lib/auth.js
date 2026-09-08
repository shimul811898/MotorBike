import dns from "node:dns";
dns.setDefaultResultOrder("ipv4first");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

import { betterAuth } from "better-auth";
import { jwt } from "better-auth/plugins"; 
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

// Cache the MongoClient globally to prevent multiple instances during Next.js hot reloads
const globalForMongo = globalThis;
if (!globalForMongo._mongoClientAuth) {
  globalForMongo._mongoClientAuth = new MongoClient(process.env.MONGODB_URI);
  globalForMongo._mongoClientAuth.connect().catch((err) => console.error("Auth Mongo connect error:", err.message));
}
const client = globalForMongo._mongoClientAuth;
const db = client.db("motobike");

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },
  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ["google"],
    },
  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 7 * 24 * 60 * 60, 
    },
  },
  plugins: [
    jwt(), 
  ],
});