# Midnight Raycast

Raycast extension for https://midnight.app


# Steps to Install

1. Clone this repository wherever you prefer
2. Run the `Import Extension` command in raycast and select the folder where you cloned this repository
3. Navigate to this repository in a terminal window
4. Run `npm i` and `npm run dev`
5. Stop the dev server and the extension will be set up

# How to Use

This extension utilizes Midnight's API endpoint for creating events. There are three commands currently available:

- Open Midnight (opens https://midnight.app in your preferred browser)
- Set Midnight API Key
- New Event

You must specify a valid Midnight API key using the Set Midnigth API Key command before you can use the New Event command. This key is stored using Raycast's built in Cache functionality.

Once you've set your API key, you can start adding new events. New event logic is identical to the Midnight web app. When adding an event at a specific time, that time will be visible at the bottom right of the raycast window. Tag parsing occurs in the API and is not handled in this extension.

# Tips

It is strongly recommended to set up a custom keybinding for the New Event command for streamlined event logging. I am using `⌥ + a`. You can configure a command's keybinding by right clicking on the command in Raycast and selecting the `Configure Command` option, then clicking `Record Hotkey`

