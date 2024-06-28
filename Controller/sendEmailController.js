const nodemailer = require('nodemailer');
const Agenda = require('agenda');
const User = require('../Db/model');

const agenda = new Agenda({ 
  db: { 
    address: process.env.MONGODB_URL,
    collection: 'agendaJobs' 
  }
});

// Wait for Agenda to be ready
async function waitForAgendaReady(agenda) {
  return new Promise((resolve, reject) => {
    agenda.on('ready', () => resolve('Agenda is ready'));
    agenda.on('error', (error) => reject(error));
  });
}

waitForAgendaReady(agenda).then(() => {
  console.log("Agenda connected successfully.");
}).catch((error) => {
  console.error("Agenda connection error:", error);
});

// Define a transporter for nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.user,
    pass: process.env.pass,
  },
});

// Define an Agenda job for sending email
agenda.define('send email', async (job, done) => {
  const { to, subject, text } = job.attrs.data;
  const html = `<h1>Hello</h1>`;
  try {
    let info = await transporter.sendMail({
      from: 'riyajain2950@gmail.com',
      to,
      subject,
      text,
      // html
    });

    console.log('Message sent: %s', info.messageId);
    done();
  } catch (error) {
    console.error('Error sending email:', error);
    done(error);
  }
});

// Export the sendEmail function
module.exports.sendEmail = async (req, res) => {
  const { to, subject, text, time } = req.body;

  try {
    if (time) {
      const t = parseInt(time, 10);
      console.log(t, to);
      const scheduleAt = new Date(Date.now() + t * 60000).toISOString();
      await agenda.schedule(scheduleAt, 'send email', { to, subject, text });
      res.status(200).json({ message: 'Email scheduled successfully', to });
    } else {
      // Send immediately if no schedule time is provided
      let info = await transporter.sendMail({
        from: 'riyajain2950@gmail.com',
        to,
        subject,
        text,
        // html
      });

      console.log('Message sent: %s', info.messageId);
      res.status(200).json({ message: 'Email sent successfully', messageId: info.messageId });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to send or schedule email' });
  }
};

// Start Agenda
agenda.start();
