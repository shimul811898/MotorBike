import dns from "node:dns";

try {
  dns.setDefaultResultOrder("ipv4first");
  dns.setServers(["8.8.8.8", "8.8.4.4"]);
} catch (e) {
  // Ignored in cloud environments like Vercel where socket mutation is restricted
}

import { betterAuth } from "better-auth";
import { jwt } from "better-auth/plugins"; 
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const globalForMongo = globalThis;
if (!globalForMongo._mongoClientAuth && process.env.MONGODB_URI) {
  globalForMongo._mongoClientAuth = new MongoClient(process.env.MONGODB_URI);
  globalForMongo._mongoClientAuth.connect().catch((err) => console.error("Auth Mongo connect error:", err.message));
}
const client = globalForMongo._mongoClientAuth || (process.env.MONGODB_URI ? new MongoClient(process.env.MONGODB_URI) : null);
const db = client ? client.db("motobike") : null;

export const auth = betterAuth({
  database: db ? mongodbAdapter(db, { client }) : undefined,
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