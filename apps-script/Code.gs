/**
 * SEDEKAH SUBUH HARAMAIN - Google Apps Script Backend
 * 
 * SETUP:
 * 1. Buka https://script.google.com/
 * 2. Buat project baru
 * 3. Copy semua file .gs ini
 * 4. Setup Script Properties (lihat bagian bawah file ini)
 * 5. Deploy sebagai Web App
 * 
 * SCRIPT PROPERTIES YANG PERLU DISET:
 * - FIREBASE_DATABASE_URL: https://your-project-default-rtdb.firebaseio.com
 * - IMGBB_API_KEY: dapatkan dari https://imgbb.com/
 * - TELEGRAM_BOT_TOKEN: dari @BotFather
 * - TELEGRAM_CHAT_ID: chat ID admin untuk notifikasi
 * - TELEGRAM_ADMIN_IDS: comma-separated Telegram user IDs yang bisa approve
 * - EMAIL_API_URL: https://your-domain.com/api/email.php
 * - EMAIL_API_SECRET: secret untuk HMAC
 * - PAYMENT_GATEWAY_KEY: API key payment gateway
 * - PAYMENT_GATEWAY_SECRET: secret key payment gateway
 */

// ============================================
// CONFIG.GS - Konfigurasi & Helpers
// ============================================

function getConfig() {
  const props = PropertiesService.getScriptProperties();
  return {
    firebaseUrl: props.getProperty('FIREBASE_DATABASE_URL'),
    imgbbKey: props.getProperty('IMGBB_API_KEY'),
    telegramToken: props.getProperty('TELEGRAM_BOT_TOKEN'),
    telegramChatId: props.getProperty('TELEGRAM_CHAT_ID'),
    telegramAdminIds: props.getProperty('TELEGRAM_ADMIN_IDS')?.split(',').map(id => id.trim()) || [],
    emailApiUrl: props.getProperty('EMAIL_API_URL'),
    emailApiSecret: props.getProperty('EMAIL_API_SECRET'),
    paymentGatewayKey: props.getProperty('PAYMENT_GATEWAY_KEY'),
    paymentGatewaySecret: props.getProperty('PAYMENT_GATEWAY_SECRET')
  };
}

// ============================================
// WEBAPP.GS - Router doGet/doPost
// ============================================

function doGet(e) {
  const action = e.parameter.action;
  
  try {
    switch(action) {
      case 'health':
        return jsonResponse({ ok: true, message: 'API is running', timestamp: new Date().toISOString() });
      
      case 'bootstrap':
        return jsonResponse({ ok: true, data: getBootstrap() });
      
      case 'publicDonations':
        const page = parseInt(e.parameter.page) || 1;
        const limit = parseInt(e.parameter.limit) || 50;
        const programId = e.parameter.programId || '';
        return jsonResponse({ ok: true, data: getPublicDonations(page, limit, programId) });
      
      default:
        return jsonResponse({ ok: false, error: { message: 'Invalid action' } }, 400);
    }
  } catch (error) {
    return jsonResponse({ ok: false, error: { message: error.toString() } }, 500);
  }
}

function doPost(e) {
  const action = e.parameter.action;
  
  try {
    let payload = {};
    let adminToken = '';
    
    if (e.postData) {
      const body = JSON.parse(e.postData.contents);
      payload = body.payload || {};
      adminToken = body.adminToken || '';
    }
    
    switch(action) {
      // Public actions
      case 'createDonation':
        return jsonResponse({ ok: true, data: createDonation(payload) });
      
      case 'submitTransferProof':
        return jsonResponse({ ok: true, data: submitTransferProof(payload) });
      
      case 'aamiin':
        return jsonResponse({ ok: true, data: addAamiin(payload) });
      
      case 'donationStatus':
        return jsonResponse({ ok: true, data: getDonationStatus(payload.id) });
      
      // Admin actions (require token)
      case 'adminApprove':
        verifyAdminToken(adminToken);
        return jsonResponse({ ok: true, data: adminApproveDonation(payload) });
      
      case 'adminReject':
        verifyAdminToken(adminToken);
        return jsonResponse({ ok: true, data: adminRejectDonation(payload) });
      
      case 'adminUploadImage':
        verifyAdminToken(adminToken);
        return jsonResponse({ ok: true, data: uploadImage(payload) });
      
      // Telegram webhook
      case 'telegram':
        return handleTelegramWebhook(payload);
      
      default:
        return jsonResponse({ ok: false, error: { message: 'Invalid action' } }, 400);
    }
  } catch (error) {
    return jsonResponse({ ok: false, error: { message: error.toString() } }, 500);
  }
}

function jsonResponse(data, code) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

// ============================================
// FIREBASE ADMIN.GS - Firebase Operations
// ============================================

function firebaseGet(path) {
  const config = getConfig();
  const url = `${config.firebaseUrl}/${path}.json`;
  const response = UrlFetchApp.fetch(url, { muteHttpExceptions: true });
  return JSON.parse(response.getContentText());
}

function firebaseSet(path, data) {
  const config = getConfig();
  const url = `${config.firebaseUrl}/${path}.json`;
  UrlFetchApp.fetch(url, {
    method: 'put',
    contentType: 'application/json',
    payload: JSON.stringify(data),
    muteHttpExceptions: true
  });
}

function firebaseUpdate(path, data) {
  const config = getConfig();
  const url = `${config.firebaseUrl}/${path}.json`;
  UrlFetchApp.fetch(url, {
    method: 'patch',
    contentType: 'application/json',
    payload: JSON.stringify(data),
    muteHttpExceptions: true
  });
}

function firebasePush(path, data) {
  const config = getConfig();
  const url = `${config.firebaseUrl}/${path}.json`;
  const response = UrlFetchApp.fetch(url, {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify(data),
    muteHttpExceptions: true
  });
  return JSON.parse(response.getContentText());
}

function getBootstrap() {
  const settings = firebaseGet('settings') || {};
  const programsObj = firebaseGet('programs') || {};
  const banksObj = firebaseGet('banks') || {};
  const packagesObj = firebaseGet('packages') || {};
  const galleryObj = firebaseGet('gallery') || {};
  const updatesObj = firebaseGet('updates') || {};
  
  const programs = Object.keys(programsObj).map(id => ({ id, ...programsObj[id] }));
  const banks = Object.keys(banksObj).map(id => ({ id, ...banksObj[id] }));
  const packages = Object.keys(packagesObj).map(id => ({ id, ...packagesObj[id] }));
  const gallery = Object.keys(galleryObj).map(id => ({ id, ...galleryObj[id] }));
  const updates = Object.keys(updatesObj).map(id => ({ id, ...updatesObj[id] }));
  
  const donationsObj = firebaseGet('donations') || {};
  const donations = Object.keys(donationsObj).map(id => ({ id, ...donationsObj[id] }));
  const paidDonations = donations.filter(d => d.status === 'paid');
  
  const stats = {
    totalCollected: paidDonations.reduce((sum, d) => sum + (d.amount || 0), 0),
    donorCount: new Set(paidDonations.map(d => d.anonymous ? 'anon_' + d.id : d.name)).size,
    activePrograms: programs.filter(p => p.status === 'active' || p.status === 'published').length
  };
  
  return { settings, programs, banks, packages, gallery, updates, stats };
}

function getPublicDonations(page, limit, programId) {
  const donationsObj = firebaseGet('donations') || {};
  let donations = Object.keys(donationsObj).map(id => ({ id, ...donationsObj[id] }));
  
  // Filter paid donations
  donations = donations.filter(d => d.status === 'paid');
  
  // Filter by program if specified
  if (programId) {
    donations = donations.filter(d => d.programId === programId || d.programSlug === programId);
  }
  
  // Sort by date descending
  donations.sort((a, b) => new Date(b.paidAt || b.createdAt) - new Date(a.paidAt || a.createdAt));
  
  // Paginate
  const start = (page - 1) * limit;
  const items = donations.slice(start, start + limit);
  
  return {
    items,
    hasMore: (start + limit) < donations.length
  };
}

function createDonation(payload) {
  const id = generateId();
  const invoice = generateInvoice();
  
  const donation = {
    id,
    invoice,
    idempotencyKey: payload.idempotencyKey || generateId(),
    programId: payload.programId,
    programTitle: payload.programTitle,
    packageId: payload.packageId,
    packageName: payload.packageName,
    amount: payload.amount,
    salutation: payload.salutation,
    name: payload.name,
    anonymous: payload.anonymous || false,
    phone: payload.phone,
    email: payload.email,
    prayer: payload.prayer,
    paymentMethod: payload.paymentMethod,
    bankAccountId: payload.bankAccountId,
    status: payload.paymentMethod === 'gateway' ? 'awaiting_payment' : 'awaiting_transfer',
    proofStatus: 'none',
    aamiinCount: 0,
    createdAt: new Date().toISOString()
  };
  
  firebaseSet(`donations/${id}`, donation);
  
  // Update program stats
  const programCollected = firebaseGet(`programs/${payload.programId}/collectedAmount`) || 0;
  const programDonors = firebaseGet(`programs/${payload.programId}/donorCount`) || 0;
  firebaseUpdate(`programs/${payload.programId}`, {
    collectedAmount: programCollected + payload.amount,
    donorCount: programDonors + 1
  });
  
  // Send Telegram notification
  sendTelegramDonationNotification(donation);
  
  return donation;
}

function submitTransferProof(payload) {
  const { donationId, proofUrl } = payload;
  
  firebaseUpdate(`donations/${donationId}`, {
    proofUrl,
    proofStatus: 'submitted',
    proofSubmittedAt: new Date().toISOString()
  });
  
  const donation = firebaseGet(`donations/${donationId}`);
  
  // Send Telegram notification
  sendTelegramProofNotification(donation);
  
  return { success: true };
}

function addAamiin(payload) {
  const { donationId } = payload;
  const donation = firebaseGet(`donations/${donationId}`);
  
  if (!donation) throw new Error('Donation not found');
  
  const newCount = (donation.aamiinCount || 0) + 1;
  firebaseUpdate(`donations/${donationId}`, { aamiinCount: newCount });
  
  return { aamiinCount: newCount };
}

function getDonationStatus(id) {
  const donation = firebaseGet(`donations/${id}`);
  if (!donation) throw new Error('Donation not found');
  return donation;
}

function adminApproveDonation(payload) {
  const { donationId } = payload;
  
  firebaseUpdate(`donations/${donationId}`, {
    status: 'paid',
    proofStatus: 'approved',
    paidAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  });
  
  const donation = firebaseGet(`donations/${donationId}`);
  
  // Send Telegram notification
  sendTelegramApprovalNotification(donation, 'approved');
  
  return { success: true };
}

function adminRejectDonation(payload) {
  const { donationId, reason } = payload;
  
  firebaseUpdate(`donations/${donationId}`, {
    status: 'rejected',
    proofStatus: 'rejected',
    rejectReason: reason,
    updatedAt: new Date().toISOString()
  });
  
  const donation = firebaseGet(`donations/${donationId}`);
  
  // Send Telegram notification
  sendTelegramApprovalNotification(donation, 'rejected');
  
  return { success: true };
}

// ============================================
// IMAGE.GS - ImgBB Upload
// ============================================

function uploadImage(payload) {
  const config = getConfig();
  const { base64Image, fileName } = payload;
  
  if (!config.imgbbKey) throw new Error('ImgBB API key not configured');
  
  const url = 'https://api.imgbb.com/1/upload';
  const formData = {
    key: config.imgbbKey,
    image: base64Image.replace(/^data:image\/\w+;base64,/, ''),
    name: fileName || 'upload_' + Date.now()
  };
  
  const response = UrlFetchApp.fetch(url, {
    method: 'post',
    payload: formData,
    muteHttpExceptions: true
  });
  
  const result = JSON.parse(response.getContentText());
  
  if (result.success) {
    return {
      url: result.data.url,
      deleteUrl: result.data.delete_url,
      width: result.data.width,
      height: result.data.height
    };
  } else {
    throw new Error('ImgBB upload failed: ' + result.error.message);
  }
}

// ============================================
// TELEGRAM.GS - Telegram Bot
// ============================================

function sendTelegramMessage(chatId, text, replyMarkup) {
  const config = getConfig();
  if (!config.telegramToken) return;
  
  const url = `https://api.telegram.org/bot${config.telegramToken}/sendMessage`;
  const payload = {
    chat_id: chatId,
    text: text,
    parse_mode: 'HTML',
    reply_markup: replyMarkup ? JSON.stringify(replyMarkup) : undefined
  };
  
  UrlFetchApp.fetch(url, {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  });
}

function sendTelegramDonationNotification(donation) {
  const config = getConfig();
  if (!config.telegramChatId) return;
  
  const text = `
<b>🎉 DONASI BARU</b>

<b>Invoice:</b> ${donation.invoice}
<b>Program:</b> ${donation.programTitle}
<b>Nama:</b> ${donation.anonymous ? 'Hamba Allah' : donation.name}
<b>Nominal:</b> Rp ${donation.amount.toLocaleString('id-ID')}
<b>Metode:</b> ${donation.paymentMethod}
<b>Status:</b> ${donation.status}

<a href="https://sedekahsubuhharamain.com/#/invoice/${donation.id}">Lihat Detail</a>
  `.trim();
  
  sendTelegramMessage(config.telegramChatId, text);
}

function sendTelegramProofNotification(donation) {
  const config = getConfig();
  if (!config.telegramChatId) return;
  
  const text = `
<b>📸 BUKTI TRANSFER MASUK</b>

<b>Invoice:</b> ${donation.invoice}
<b>Program:</b> ${donation.programTitle}
<b>Donatur:</b> ${donation.anonymous ? 'Hamba Allah' : donation.name}
<b>Nominal:</b> Rp ${donation.amount.toLocaleString('id-ID')}

<b>Bukti:</b> ${donation.proofUrl}
  `.trim();
  
  const replyMarkup = {
    inline_keyboard: [
      [
        { text: '✅ APPROVE', callback_data: `approve_${donation.id}` },
        { text: '❌ REJECT', callback_data: `reject_${donation.id}` }
      ],
      [
        { text: '👁️ LIHAT BUKTI', url: donation.proofUrl }
      ]
    ]
  };
  
  sendTelegramMessage(config.telegramChatId, text, replyMarkup);
}

function sendTelegramApprovalNotification(donation, action) {
  const config = getConfig();
  if (!config.telegramChatId) return;
  
  const emoji = action === 'approved' ? '✅' : '❌';
  const status = action === 'approved' ? 'DISETUJUI' : 'DITOLAK';
  
  const text = `
${emoji} <b>DONASI ${status}</b>

<b>Invoice:</b> ${donation.invoice}
<b>Program:</b> ${donation.programTitle}
<b>Donatur:</b> ${donation.anonymous ? 'Hamba Allah' : donation.name}
<b>Nominal:</b> Rp ${donation.amount.toLocaleString('id-ID')}
<b>Waktu:</b> ${new Date().toLocaleString('id-ID')}
  `.trim();
  
  sendTelegramMessage(config.telegramChatId, text);
}

function handleTelegramWebhook(payload) {
  // Handle callback queries (button clicks)
  if (payload.callback_query) {
    const callbackData = payload.callback_query.data;
    const chatId = payload.callback_query.message.chat.id;
    const messageId = payload.callback_query.message.message_id;
    const userId = payload.callback_query.from.id;
    
    // Verify admin
    const config = getConfig();
    if (!config.telegramAdminIds.includes(String(userId))) {
      sendTelegramMessage(chatId, '❌ Anda tidak memiliki izin untuk melakukan aksi ini.');
      return { ok: true };
    }
    
    // Parse callback data
    const [action, donationId] = callbackData.split('_');
    
    if (action === 'approve') {
      adminApproveDonation({ donationId });
      
      // Edit message
      const newText = payload.callback_query.message.text + '\n\n✅ <b>DISETUJUI</b> oleh admin';
      editTelegramMessage(chatId, messageId, newText);
      
      sendTelegramMessage(chatId, '✅ Donasi berhasil disetujui!');
    } else if (action === 'reject') {
      adminRejectDonation({ donationId, reason: 'Ditolak via Telegram' });
      
      const newText = payload.callback_query.message.text + '\n\n❌ <b>DITOLAK</b> oleh admin';
      editTelegramMessage(chatId, messageId, newText);
      
      sendTelegramMessage(chatId, '❌ Donasi ditolak.');
    }
  }
  
  return { ok: true };
}

function editTelegramMessage(chatId, messageId, text) {
  const config = getConfig();
  if (!config.telegramToken) return;
  
  const url = `https://api.telegram.org/bot${config.telegramToken}/editMessageText`;
  const payload = {
    chat_id: chatId,
    message_id: messageId,
    text: text,
    parse_mode: 'HTML'
  };
  
  UrlFetchApp.fetch(url, {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  });
}

// ============================================
// HELPERS
// ============================================

function generateId() {
  return 'id_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

function generateInvoice() {
  const now = new Date();
  const date = now.toISOString().slice(0, 10).replace(/-/g, '');
  const seq = Math.floor(Math.random() * 999).toString().padStart(3, '0');
  return `INV-${date}-${seq}`;
}

function verifyAdminToken(token) {
  // In production, verify Firebase ID token here
  // For now, just check if token exists
  if (!token) throw new Error('Admin token required');
}
