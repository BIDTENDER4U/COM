# Bid Tender 4 U — Website

Ye poori website same design/content ke saath hai, bas enquiry aur tender forms ab
**EmailJS** ke through directly aapke email (`Tendergem42@gmail.com`) par lead bhej dete hain —
koi backend/server chahiye nahi, isliye ye GitHub Pages par free me live ho sakti hai.

---

## Step 1 — EmailJS account banayein (2 minute)

1. https://www.emailjs.com par jaakar free account banayein (sign up).
2. Left menu me **"Email Services"** → **"Add New Service"** → **Gmail** choose karein →
   apna Gmail (`Tendergem42@gmail.com`) connect karein. Isse ek **Service ID** milega
   (jaise `service_abc1234`).
3. Left menu me **"Email Templates"** → **"Create New Template"**. Template me ye variables
   use karein (bas curly braces me daalein, jaisa neeche hai):

   ```
   Subject: New {{form_type}} — {{name}}

   New lead from Bid Tender 4 U website:

   Type: {{form_type}}
   Name: {{name}}
   Company: {{company}}
   Phone: {{phone}}
   Email: {{email}}
   City: {{city}}
   Business type: {{business_type}}
   Tender type: {{tender_type}}
   Portal: {{portal}}
   Reference number: {{reference_number}}
   Service required: {{service}}
   Closing date: {{closing_date}}
   Attached file name: {{file_name}}

   Message:
   {{message}}
   ```

   Template ke "To email" field me `{{to_email}}` daalein (ya seedha apna email likh dein).
   Save karne par ek **Template ID** milega (jaise `template_xyz789`).

4. Left menu me **"Account"** → **"General"** me apni **Public Key** milegi.

## Step 2 — Ye 3 values project me daalein

File kholein: `src/lib/emailjs-config.ts`

```ts
export const EMAILJS_SERVICE_ID = 'service_abc1234';   // Step 1.2 wali value
export const EMAILJS_TEMPLATE_ID = 'template_xyz789';  // Step 1.3 wali value
export const EMAILJS_PUBLIC_KEY = 'your_public_key';   // Step 1.4 wali value
```

Bas — ab jab bhi koi "Submit Enquiry" ya "Request Tender Review" button dabayega,
uski details seedhi aapke email par chali jayengi.

> Note: EmailJS free plan me 200 emails/month free hain — enquiry form ke liye kaafi hai.
> File upload (tender document) email me attach nahi hota (size limits ki wajah se), form
> me ek note hai jo client ko WhatsApp/email se file bhejne ko kehta hai.

---

## Step 3 — GitHub par push karke live karein

1. GitHub par ek naya repository banayein (naam: `bid-tender-4-u` — agar naam alag rakha to
   Step 4 me batayein).
2. Is poore folder ko us repository me push karein:
   ```bash
   git init
   git add .
   git commit -m "Bid Tender 4 U website"
   git branch -M main
   git remote add origin https://github.com/<aapka-username>/bid-tender-4-u.git
   git push -u origin main
   ```
3. GitHub repo par jaakar: **Settings → Pages → Build and deployment → Source** me
   **"GitHub Actions"** select karein (agar already nahi hai).
4. Push hote hi `.github/workflows/deploy.yml` automatically site build karke
   deploy kar dega. Kuch minute me site live ho jayegi:
   `https://<aapka-username>.github.io/bid-tender-4-u/`

## Step 4 — Agar repo ka naam alag rakha

`vite.config.ts` me ye line update karein:
```ts
base: '/<aapke-repo-ka-naam>/',
```
Agar aap `<username>.github.io` naam ka repo bana rahe hain (root domain pe site),
to `base: '/'` kar dein.

---

## Local me test karna (optional)

```bash
npm install
npm run dev
```
