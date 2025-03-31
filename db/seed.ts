import { seed } from "drizzle-seed";
import { usersTable } from "./schema/users";

import { env } from "config/env";

async function main() {
  if (env.NODE_ENV !== "development") return;
  console.log("Adding Users");
  await seed(db, { usersTable }).refine((f) => ({
    usersTable: {
      columns: {
        age: f.int({
          minValue: 18,
          maxValue: 100,
        }),
        phone: f.phoneNumber({
          template: "(###) ###-####",
        }),
      },
    },
  }));
  console.log("Users Added");
}

main();
