/**
 * SHIFT project brief → Google Sheet.
 * Bound to the "SHIFT Leads" spreadsheet (Extensions → Apps Script) and deployed as a
 * web app (Execute as: Me, Who has access: Anyone). The site posts the brief here directly.
 */
const SHEET_NAME = 'Leads';
const TIME_ZONE = 'Africa/Cairo';
const HEADERS = ['التاريخ', 'الاسم', 'الشركة', 'نوع المشروع', 'وصف المشروع', 'وسيلة التواصل', 'بيانات التواصل', 'اللغة', 'المصدر'];
const PROJECT_TYPES = ['landing-page', 'business-website', 'e-commerce', 'education-platform', 'portfolio-personal-brand', 'custom-web-solution'];
const CONTACT_METHODS = ['whatsapp', 'phone', 'email'];
const FIELDS = ['name', 'company', 'projectType', 'description', 'contactMethod', 'contactValue', 'locale', 'source'];
const MAX_POST_DATA_BYTES = 16 * 1024;
const MAX_SUBMISSIONS_PER_MINUTE = 20;

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) return json_({ ok: false, error: 'invalid_request' });
    if (Utilities.newBlob(e.postData.contents).getBytes().length > MAX_POST_DATA_BYTES) return json_({ ok: false, error: 'body_too_large' });
    if (!withinRateLimit_()) return json_({ ok: false, error: 'busy' });

    const payload = validatePayload_(JSON.parse(e.postData.contents));
    if (!payload) return json_({ ok: false, error: 'invalid_payload' });

    const lock = LockService.getScriptLock();
    if (!lock.tryLock(5000)) return json_({ ok: false, error: 'busy' });
    try {
      leadsSheet_().appendRow([
        Utilities.formatDate(new Date(), TIME_ZONE, 'yyyy-MM-dd HH:mm'), protectCell_(payload.name), protectCell_(payload.company), protectCell_(payload.projectType),
        protectCell_(payload.description), protectCell_(payload.contactMethod), protectCell_(payload.contactValue),
        protectCell_(payload.locale), protectCell_(payload.source),
      ]);
    } finally {
      lock.releaseLock();
    }
    return json_({ ok: true });
  } catch (error) {
    console.error(error);
    return json_({ ok: false, error: 'invalid_request' });
  }
}

function doGet() {
  return json_({ ok: true, service: 'shift-project-brief' });
}

function leadsSheet_() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = spreadsheet.getSheetByName(SHEET_NAME) || spreadsheet.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
  }
  return sheet;
}

function withinRateLimit_() {
  const cache = CacheService.getScriptCache();
  const key = 'submissions-' + Math.floor(Date.now() / 60000);
  const count = Number(cache.get(key) || 0);
  if (count >= MAX_SUBMISSIONS_PER_MINUTE) return false;
  cache.put(key, String(count + 1), 120);
  return true;
}

function validatePayload_(body) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) return null;
  const keys = Object.keys(body);
  if (keys.length !== FIELDS.length || keys.some((key) => FIELDS.indexOf(key) === -1)) return null;
  const payload = {};
  FIELDS.forEach((field) => payload[field] = typeof body[field] === 'string' ? body[field].trim().replace(/\s+/g, ' ') : null);
  if (!hasLength_(payload.name, 1, 120) || !hasLength_(payload.company, 0, 160)
    || !hasLength_(payload.description, 1, 6000) || !hasLength_(payload.contactValue, 3, 320)
    || PROJECT_TYPES.indexOf(payload.projectType) === -1 || CONTACT_METHODS.indexOf(payload.contactMethod) === -1
    || payload.locale !== 'ar' || payload.source !== 'homepage-project-brief') return null;
  return payload;
}

function hasLength_(value, minimum, maximum) {
  return value !== null && value.length >= minimum && value.length <= maximum;
}

function protectCell_(value) {
  const text = String(value);
  return /^[=+\-@]/.test(text) ? "'" + text : text;
}

function json_(body) {
  return ContentService.createTextOutput(JSON.stringify(body)).setMimeType(ContentService.MimeType.JSON);
}
