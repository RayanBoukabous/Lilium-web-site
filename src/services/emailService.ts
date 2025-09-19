import type { OrderData } from '../api/send-order-email';
import { generateOrderEmailHTML, generateOrderEmailText } from '../api/send-order-email';

// Service d'envoi d'email simplifié
// Dans un vrai projet, vous utiliseriez un service comme SendGrid, AWS SES, ou Nodemailer

export const sendOrderEmail = async (orderData: OrderData): Promise<boolean> => {
  try {
    // Simulation de l'envoi d'email
    console.log('📧 Envoi d\'email de commande...');
    console.log('Destinataire: rayanboukabous74@gmail.com');
    console.log('Sujet:', `Nouvelle commande - ${orderData.customer.firstName} ${orderData.customer.lastName} - ${orderData.total.toFixed(2)} DA`);

    // Générer le contenu de l'email
    const emailContent = {
      to: 'rayanboukabous74@gmail.com',
      subject: `Nouvelle commande - ${orderData.customer.firstName} ${orderData.customer.lastName} - ${orderData.total.toFixed(2)} DA`,
      html: generateOrderEmailHTML(orderData),
      text: generateOrderEmailText(orderData),
    };

    // Simuler un délai d'envoi
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Dans un vrai projet, vous feriez quelque chose comme :
    /*
    const nodemailer = require('nodemailer');
    
    const transporter = nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
 
    await transporter.sendMail(emailContent);
    */

    console.log('✅ Email envoyé avec succès !');
    console.log('Contenu de l\'email:', emailContent);

    return true;
  } catch (error) {
    console.error('❌ Erreur lors de l\'envoi de l\'email:', error);
    return false;
  }
};

// Fonction pour envoyer un email de confirmation au client
export const sendConfirmationEmail = async (orderData: OrderData): Promise<boolean> => {
  try {
    console.log('📧 Envoi d\'email de confirmation au client...');
    console.log('Destinataire:', orderData.customer.email);

    const confirmationContent = {
      to: orderData.customer.email,
      subject: `Confirmation de commande - Lilium Pharma`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Confirmation de commande - Lilium Pharma</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #2e7d32; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
            .success { color: #2e7d32; font-weight: bold; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>✅ Commande Confirmée - Lilium Pharma</h1>
            </div>
            <div class="content">
              <p>Bonjour ${orderData.customer.firstName} ${orderData.customer.lastName},</p>
              <p class="success">Votre commande a été reçue avec succès !</p>
              <p>Nous vous contacterons dans les plus brefs délais pour confirmer les détails de livraison.</p>
              <p><strong>Total de votre commande : ${orderData.total.toFixed(2)} DA</strong></p>
              <p>Merci pour votre confiance en Lilium Pharma !</p>
              <p>L'équipe Lilium Pharma</p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    // Simuler un délai d'envoi
    await new Promise(resolve => setTimeout(resolve, 1000));

    console.log('✅ Email de confirmation envoyé !');
    return true;
  } catch (error) {
    console.error('❌ Erreur lors de l\'envoi de l\'email de confirmation:', error);
    return false;
  }
};
