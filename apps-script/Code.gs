/*********************************************
 * Bid Tender 4 U — Enquiry / Tender email sender
 * Google Apps Script Web App
 *
 * Sends form leads (including the attached tender
 * document) straight to your Gmail inbox.
 * No EmailJS, no own server — Google hosts the logic.
 *********************************************/

// 📥 Where the leads land (change this to your inbox):
// DEV/TEST target — change back to Tendergem42@gmail.com before production.
const DESTINATION_EMAIL = 'princegirgilani116@gmail.com';

// 🛡️ Honeypot field. The form will include this hidden field.
// If a bot fills it in, we silently drop the request (no email sent).
const HONEYPOT_FIELD = 'website';

/*
 * The form posts its fields here via fetch(...).
 * For a regular HTML form, browser sends it as:
 *   Content-Type: application/x-www-form-urlencoded  (FormData)
 * The fields land in e.parameter.
 *
 * The attached tender document arrives as:
 *   file_name  — original file name (e.g. "tender.pdf")
 *   file_data  — base64-encoded file content (decoded & attached below)
 */
function doPost(e) {
  try {
    const p = e.parameter || {};

    // Spam check — pretend success, but do NOT send if bot filled honeypot.
    if (p[HONEYPOT_FIELD] && String(p[HONEYPOT_FIELD]).trim().length > 0) {
      return json({ success: true, message: 'Request received.' });
    }

    const formType = (p.form_type || 'Enquiry').toUpperCase();
    const subject = 'New ' + formType + ' Lead — ' + (p.name || 'Unknown');

    const lines = [
      'New lead from Bid Tender 4 U website:',
      '',
      'Type:          ' + formType,
      'Name:          ' + (p.name || ''),
      'Company:       ' + (p.company || ''),
      'Phone:         ' + (p.phone || ''),
      'Email:         ' + (p.email || ''),
      'City:          ' + (p.city || ''),
      'Business type: ' + (p.business_type || ''),
      'Tender type:   ' + (p.tender_type || ''),
      'Portal:        ' + (p.portal || ''),
      'Reference no.: ' + (p.reference_number || ''),
      'Service:       ' + (p.service || ''),
      'Closing date:  ' + (p.closing_date || ''),
      'File name:     ' + (p.file_name || ''),
      '',
      'Message:',
      (p.message || '—'),
    ];

    const options = { name: 'Bid Tender 4 U' };

    // Attach the tender document when one was uploaded.
    if (p.file_data && p.file_name) {
      try {
        const blob = Utilities.newBlob(
          Utilities.base64Decode(String(p.file_data)),
          '',
          String(p.file_name)
        );
        options.attachments = [blob];
        lines.push('', 'Attachment: ' + p.file_name + ' (' + Math.round(String(p.file_data).length * 3 / 4) + ' bytes)');
      } catch (attachErr) {
        // If the file can't be decoded, still send the lead — just note it.
        lines.push('', '[Document attach failed: ' + String(attachErr) + ']');
      }
    } else {
      lines.push('', '[No attachment — file_data received: ' + (p.file_data ? Math.round(String(p.file_data).length * 3 / 4) + ' bytes' : 'EMPTY/MISSING') + ']');
    }

    // Sends FROM the script owner's Gmail (you), TO your inbox.
    GmailApp.sendEmail(DESTINATION_EMAIL, subject, lines.join('\n'), options);

    return json({ success: true, message: 'Request received.' });
  } catch (err) {
    return json({ success: false, error: String(err) });
  }
}

// helper: return a JSON response
function json(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

// Optional ping to confirm the web app is alive.
function doGet() {
  return json({ success: true, service: 'bid-tender-4u' });
}
