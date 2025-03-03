import { closeMainWindow, open } from "@raycast/api";
import { format } from "date-fns";

export default async function Command() {
  const date = format(new Date(), "yyyy-MM-dd");
  await closeMainWindow();
  await open(`https://midnight.app/track/${date}`);
}
