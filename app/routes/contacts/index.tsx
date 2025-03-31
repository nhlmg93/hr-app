import { DELETE, POST } from "~/lib/constsants";
import type { Route } from "../../+types/root";
import { db } from "db";
import { useLoaderData, useSubmit, type SubmitFunction } from "react-router";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { Button } from "~/components/ui/button";
import { Trash2 } from "lucide-react";
import { userInsertSchema, usersTable } from "db/schema/users";
import { faker } from "@faker-js/faker";
import { parse } from "valibot";
import { eq } from "drizzle-orm";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export async function loader() {
  return await db.select().from(usersTable);
}

export async function action({ request }: Route.ActionArgs) {
  switch (request.method) {
    case POST: {
      const userData = parse(userInsertSchema, {
        name: faker.person.firstName(),
        age: faker.number.int({ max: 50, min: 18 }),
        email: faker.internet.email(),
        phone: faker.phone.number({ style: "national" }),
      });

      const [record] = await db
        .insert(usersTable)
        .values(userData)
        .returning({ id: usersTable.id });

      Response.json({
        success: true,
        userId: record.id,
        message: "User created successfully",
      });
      return { success: true };
    }
    case DELETE: {
      const formData = await request.formData();
      const id = formData.get("id") as string;

      await db.delete(usersTable).where(eq(usersTable.id, Number(id)));

      return { success: true, message: "User deleted successfully" };
    }
    default:
      throw new Response("Method Not Allowed", { status: 405 });
  }
}

export default function Contact() {
  const users = useLoaderData<typeof loader>();
  const submit = useSubmit();
  return (
    <div className="flex flex-col">
      <div className="container mx-auto py-10">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Age</TableHead>
              <TableHead>Phone</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.age}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="destructive"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => handleDelete(submit, user.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

function handleDelete(submit: SubmitFunction, id: number) {
  const form = new FormData();
  form.set("id", String(id));
  submit(form, {
    method: "DELETE",
    action: "/contacts",
  });
}

// HTTP Verb 	Path 	 	            Used to
// GET 	      /photos 	 	        display a list of all photos -
// POST 	    /photos 	          create a new photo           -
// GET 	      /photos/new	        return an HTML form for creating a new photo
// GET 	      /photos/:id/edit    return an HTML form for editing a photo
// GET 	      /photos/:id	        display a specific photo
// PATCH/PUT 	/photos/:id 	      update a specific photo
// DELETE 	  /photos/:id 	      delete a specific photo


