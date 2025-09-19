// API route pour l'envoi d'email de commande
// Note: Cette route doit être implémentée côté backend (Node.js/Express, Next.js API, etc.)

export interface OrderItem {
    productName: string;
    productDescription: string;
    quantity: number;
    price: number;
    total: number;
}

export interface CustomerInfo {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
    message: string;
    acceptPrivacy: boolean;
}

export interface OrderData {
    customer: CustomerInfo;
    items: OrderItem[];
    total: number;
    orderDate: string;
}

// Fonction pour générer le contenu HTML de l'email
export const generateOrderEmailHTML = (orderData: OrderData): string => {
    const { customer, items, total, orderDate } = orderData;

    return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Nouvelle commande - Lilium Pharma</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #2e7d32; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
        .section { margin-bottom: 20px; }
        .section h3 { color: #2e7d32; border-bottom: 2px solid #2e7d32; padding-bottom: 5px; }
        .item { background: white; padding: 15px; margin: 10px 0; border-radius: 5px; border-left: 4px solid #2e7d32; }
        .total { background: #2e7d32; color: white; padding: 15px; text-align: center; font-size: 18px; font-weight: bold; border-radius: 5px; }
        .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        .info-item { background: white; padding: 10px; border-radius: 5px; }
        .label { font-weight: bold; color: #2e7d32; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🛒 Nouvelle Commande - Lilium Pharma</h1>
          <p>Commande reçue le ${new Date(orderDate).toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    })}</p>
        </div>
        
        <div class="content">
          <div class="section">
            <h3>👤 Informations Client</h3>
            <div class="info-grid">
              <div class="info-item">
                <span class="label">Nom complet:</span><br>
                ${customer.firstName} ${customer.lastName}
              </div>
              <div class="info-item">
                <span class="label">Email:</span><br>
                ${customer.email}
              </div>
              <div class="info-item">
                <span class="label">Téléphone:</span><br>
                ${customer.phone}
              </div>
              <div class="info-item">
                <span class="label">Pays:</span><br>
                ${customer.country}
              </div>
            </div>
            <div class="info-item" style="margin-top: 10px;">
              <span class="label">Adresse de livraison:</span><br>
              ${customer.address}<br>
              ${customer.city} ${customer.postalCode ? customer.postalCode : ''}
            </div>
            ${customer.message ? `
              <div class="info-item" style="margin-top: 10px;">
                <span class="label">Message du client:</span><br>
                ${customer.message}
              </div>
            ` : ''}
          </div>

          <div class="section">
            <h3>📦 Produits Commandés</h3>
            ${items.map(item => `
              <div class="item">
                <strong>${item.productName}</strong><br>
                <em>${item.productDescription}</em><br>
                Quantité: ${item.quantity} | Prix unitaire: ${item.price.toFixed(2)} DA<br>
                <strong>Total: ${item.total.toFixed(2)} DA</strong>
              </div>
            `).join('')}
          </div>

          <div class="total">
            💰 TOTAL DE LA COMMANDE: ${total.toFixed(2)} DA
          </div>

          <div class="section">
            <h3>📋 Actions Requises</h3>
            <ul>
              <li>Contacter le client pour confirmer la commande</li>
              <li>Vérifier la disponibilité des produits</li>
              <li>Préparer la commande pour la livraison</li>
              <li>Envoyer un email de confirmation au client</li>
            </ul>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
};

// Fonction pour générer le contenu texte de l'email
export const generateOrderEmailText = (orderData: OrderData): string => {
    const { customer, items, total, orderDate } = orderData;

    return `
NOUVELLE COMMANDE - LILIUM PHARMA
=====================================

Date de commande: ${new Date(orderDate).toLocaleDateString('fr-FR')}

INFORMATIONS CLIENT:
- Nom: ${customer.firstName} ${customer.lastName}
- Email: ${customer.email}
- Téléphone: ${customer.phone}
- Adresse: ${customer.address}, ${customer.city} ${customer.postalCode}
- Pays: ${customer.country}
${customer.message ? `- Message: ${customer.message}` : ''}

PRODUITS COMMANDÉS:
${items.map(item => `
- ${item.productName}
  Description: ${item.productDescription}
  Quantité: ${item.quantity}
  Prix unitaire: ${item.price.toFixed(2)} DA
  Total: ${item.total.toFixed(2)} DA
`).join('')}

TOTAL DE LA COMMANDE: ${total.toFixed(2)} DA

ACTIONS REQUISES:
- Contacter le client pour confirmer la commande
- Vérifier la disponibilité des produits
- Préparer la commande pour la livraison
- Envoyer un email de confirmation au client

---
Lilium Pharma - Compléments Alimentaires de Qualité
  `;
};

// Exemple d'implémentation pour un backend Node.js/Express
export const sendOrderEmail = async (orderData: OrderData): Promise<boolean> => {
    try {
        // Ici vous devrez implémenter l'envoi d'email avec votre service préféré
        // Exemples: Nodemailer, SendGrid, AWS SES, etc.

        const emailContent = {
            to: 'rayanboukabous74@gmail.com',
            subject: `Nouvelle commande - ${orderData.customer.firstName} ${orderData.customer.lastName} - ${orderData.total.toFixed(2)} DA`,
            html: generateOrderEmailHTML(orderData),
            text: generateOrderEmailText(orderData),
        };

        // Exemple avec Nodemailer (à adapter selon votre configuration)
        /*
        const nodemailer = require('nodemailer');
        
        const transporter = nodemailer.createTransporter({
          service: 'gmail', // ou votre service email
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        });
    
        await transporter.sendMail(emailContent);
        */

        console.log('Email de commande généré:', emailContent);

        // Pour l'instant, on simule un envoi réussi
        return true;
    } catch (error) {
        console.error('Erreur lors de l\'envoi de l\'email:', error);
        return false;
    }
};

