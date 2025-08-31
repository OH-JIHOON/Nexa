import {
    integer,
    jsonb,
    pgEnum,
    pgPolicy,
    pgSchema,
    pgTable,
    primaryKey,
    text,
    timestamp,
    unique,
    uuid,
    boolean,
  } from "drizzle-orm/pg-core";
  import { relations, sql } from "drizzle-orm";
  import { anonRole, authenticatedRole } from "drizzle-orm/supabase";
  import { users } from "./external-schema";
  
  export const userTypeEnum = pgEnum("user_type", ["ADMIN", "GENERAL"]);
  
  export const profiles = pgTable(
    "profiles",
    {
      id: uuid("id").primaryKey().defaultRandom(),
      email: text("email").notNull().unique(),
      name: text("name"),
      avatar_url: text("avatar_url"),
      created_at: timestamp("created_at").defaultNow().notNull(),
      updated_at: timestamp("updated_at").defaultNow().notNull(),
      user_id: uuid("user_id")
        .references(() => users.id)
        .notNull(),
      marketing_data: jsonb("marketing_data"),
      onboarding_completed_at: timestamp("onboarding_completed_at"),
      user_type: userTypeEnum("user_type").default("GENERAL").notNull(),
    },
    (table) => [
      pgPolicy("Enable read access for all users", {
        for: "select",
        to: [anonRole, authenticatedRole],
        using: sql`true`,
      }),
      pgPolicy("Enable insert for authenticated users only", {
        for: "insert",
        to: authenticatedRole,
        withCheck: sql`(select auth.uid()) = user_id`,
      }),
      pgPolicy("Enable update for users based on user_id", {
        for: "update",
        to: authenticatedRole,
        using: sql`(select auth.uid()) = user_id`,
        withCheck: sql`(select auth.uid()) = user_id`,
      }),
      pgPolicy("Enable delete for users based on user_id", {
        for: "delete",
        to: authenticatedRole,
        using: sql`(select auth.uid()) = user_id`,
      }),
    ]
  ).enableRLS();