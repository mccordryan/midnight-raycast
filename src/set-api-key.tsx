import { Form, ActionPanel, Action, showToast, Toast, Cache, closeMainWindow } from "@raycast/api";
import { useState } from "react";

export default function SetApiKey() {
  const [apiKey, setApiKey] = useState("");

  async function handleSubmit(values: { apiKey: string }) {
    try {
      if (!values.apiKey) {
        await showToast({
          style: Toast.Style.Failure,
          title: "API Key is required",
        });
        return;
      }
      const cache = new Cache();
      cache.set("apiKey", values.apiKey);
      await showToast({
        style: Toast.Style.Success,
        title: "API Key saved successfully",
      });
      setTimeout(() => {
        closeMainWindow();
      }, 500);
    } catch (error) {
      await showToast({
        style: Toast.Style.Failure,
        title: "Failed to save API Key",
        message: String(error),
      });
    }
  }

  return (
    <Form
      actions={
        <ActionPanel>
          <Action.SubmitForm title="Save API Key" onSubmit={handleSubmit} />
        </ActionPanel>
      }
    >
      <Form.TextField
        id="apiKey"
        title="API Key"
        placeholder="Enter your Midnight API key"
        value={apiKey}
        onChange={setApiKey}
      />
    </Form>
  );
}
