# Project brief → Google Sheets

The form posts straight from the browser to a Google Apps Script web app that is bound to the
**SHIFT Leads** spreadsheet. No server process runs on the VPS for this.

## How it is wired

- `server/Code.gs` lives in the spreadsheet's Apps Script project (**SHIFT Leads Form**). It validates
  the payload, rate-limits to 20 submissions per minute, and appends one row to the `Leads` tab (created
  with an Arabic header row on the first submission).
- `PROJECT_BRIEF_ENDPOINT` in `src/components/project-brief/projectBriefConfig.ts` holds the web-app URL
  (`https://script.google.com/macros/s/<deployment-id>/exec`). It is public by design: the script only
  appends validated rows.
- The browser sends `Content-Type: text/plain` so the request needs no CORS preflight, which Apps Script
  cannot answer. In `npm run dev` the form keeps its mock adapter, so local testing never writes rows.

## Changing the script

1. Edit `server/Code.gs`, then paste it into the Apps Script editor and save.
2. **Deploy → Manage deployments → edit (pencil) → Version: New version → Deploy.** Editing the existing
   deployment keeps the same URL, so the site needs no change.

A brand-new deployment gets a new URL: update `PROJECT_BRIEF_ENDPOINT`, rebuild, and upload `dist/`.

## Checking it

`GET <endpoint>` returns `{"ok":true,"service":"shift-project-brief"}`. Submit the form on the live site
and confirm a new row in the `Leads` tab.
