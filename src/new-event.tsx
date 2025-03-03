import { useState, useEffect } from "react";
import { Form, ActionPanel, Action, Color, Cache, closeMainWindow, showToast, Toast } from "@raycast/api";
import { format, isToday, isDate, isEqual } from "date-fns";
import * as chrono from "chrono-node";
import axios from "axios";

const oneDay = 1000 * 60 * 60 * 24;

const adjustDate = ({ text, at, zone = "" }: { text: string; at: Date; zone?: string }) => {
  const results = chrono.en.parse(text + ` ${zone}`, at);

  let date = new Date(at);
  let newMessage = text;
  const result = results[0];
  if (result && result.start) {
    if (
      // don't normalize "set today's schedule"
      result.text.toLowerCase() !== "today" &&
      // don't trust dates longer than a day away
      Math.abs(result.start.date().getTime() - date.getTime()) < oneDay
    ) {
      newMessage = newMessage.replace(result.text, "").trim();
      date = result.start.date();
    }
  }

  return {
    originalText: text,
    originalAt: new Date(at),
    text: newMessage,
    at: date,
  };
};

export default function Command() {
  const [eventText, setEventText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const cache = new Cache();
  const apiKey = cache.get("apiKey");

  let now = new Date();

  let { text, at, originalAt, originalText } = adjustDate({
    text: eventText,
    at: now,
  });

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      await axios.post(
        "https://api.midnight.app/v1/events",
        { title: text, start: at.getTime() },
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
        },
      );
      setIsLoading(false);
      await closeMainWindow();
    } catch (error) {
      setIsLoading(false);
      await showToast({
        style: Toast.Style.Failure,
        title: "Failed to create event",
        message: error instanceof Error ? error.message : "Unknown error occurred",
      });
    }
  };

  // Create the preview text
  const previewText = `Add${
    isDate(at) && isDate(originalAt) && !isEqual(at, originalAt) ? ` at ${format(at, "HH:mm")}` : ""
  }${isDate(at) && !isToday(at) ? ` on ${format(at, "MM-dd")}` : ""}`;

  return (
    <Form
      isLoading={isLoading}
      actions={
        <ActionPanel>
          <Action.SubmitForm title={previewText} onSubmit={handleSubmit} />
        </ActionPanel>
      }
    >
      <Form.TextField
        id="eventName"
        placeholder="Enter event name (and optionally time)"
        value={eventText}
        onChange={setEventText}
        autoFocus
      />
    </Form>
  );
}
