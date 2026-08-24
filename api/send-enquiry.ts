type EnquiryBody = {
  name?: string;
  company?: string;
  phone?: string;
  email?: string;
  service?: string;
  tenderType?: string;
  message?: string;
  fileName?: string;
};

export default async function handler(request: any, response: any) {
  if (request.method !== 'POST') {
    response.status(405).json({ error: 'Method not allowed.' });
    return;
  }

  const { MAILJET_API_KEY, MAILJET_SECRET_KEY } = process.env;
  if (!MAILJET_API_KEY || !MAILJET_SECRET_KEY) {
    response.status(500).json({ error: 'Mail service is not configured yet.' });
    return;
  }

  const body = request.body as EnquiryBody;
  if (!body?.name || !body.email || !body.phone || !body.message) {
    response.status(400).json({ error: 'Please complete all required fields.' });
    return;
  }

  const text = [
    `Name: ${body.name}`,
    `Company: ${body.company || 'Not provided'}`,
    `Phone: ${body.phone}`,
    `Email: ${body.email}`,
    `Service: ${body.service || 'Not provided'}`,
    `Tender type: ${body.tenderType || 'Not provided'}`,
    `Attached file name: ${body.fileName || 'None'}`,
    '',
    `Message:\n${body.message}`,
  ].join('\n');

  const mailjetResponse = await fetch('https://api.mailjet.com/v3.1/send', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${Buffer.from(`${MAILJET_API_KEY}:${MAILJET_SECRET_KEY}`).toString('base64')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      Messages: [{
        From: { Email: process.env.MAILJET_SENDER_EMAIL || 'tendergem42@gmail.com', Name: 'Bid Tender 4 U Website' },
        To: [{ Email: process.env.MAILJET_RECEIVER_EMAIL || 'tendergem42@gmail.com', Name: 'Bid Tender 4 U' }],
        ReplyTo: { Email: body.email, Name: body.name },
        Subject: `New tender enquiry from ${body.name}`,
        TextPart: text,
      }],
    }),
  });

  if (!mailjetResponse.ok) {
    response.status(502).json({ error: 'Mail service could not send the enquiry.' });
    return;
  }

  response.status(200).json({ ok: true });
}
