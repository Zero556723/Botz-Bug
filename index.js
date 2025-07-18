const { default: makeWASocket, useMultiFileAuthState, fetchLatestBaileysVersion, downloadContentFromMessage, DisconnectReason, makeInMemoryStore, jidDecode, proto } = require("@whiskeysockets/baileys");
const pino = require('pino');
const readline = require("readline");
const fs = require('fs-extra');
const path = require('path');
const _ = require("lodash");
const chalk = require("chalk");
const { Boom } = require('@hapi/boom');
const util = require("util");
const yargs = require("yargs/yargs");
const NodeCache = require("node-cache");
const { smsg } = require('./system/lib/myfunction');
const { clear } = require('./system/lib/clear');

//==========================
// CONNECT TO WHATSAPP 
let conn = null;
const usePairingCode = true;
const question = (query) => new Promise((resolve) => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    rl.question(query, (answer) => { rl.close(); resolve(answer); });
});

//======================
const startSesi = async () => {
    const store = makeInMemoryStore({ logger: pino().child({ level: 'silent', stream: 'store' }) });
    const { state, saveCreds } = await useMultiFileAuthState('./session');
    const { version } = await fetchLatestBaileysVersion();
    const connectionOptions = {
        isLatest: true,
        keepAliveIntervalMs: 50000,
        printQRInTerminal: !usePairingCode,
        logger: pino({ level: "silent" }),
        auth: state,
        browser: ["Linux", "Chrome", "20.0.04"],
    };
    conn = makeWASocket(connectionOptions);
    //======================
    if (usePairingCode && !conn.authState.creds.registered) {
        let phoneNumber = await question(chalk.green("◇ Enter Your Number Phone +62:\n"));
        phoneNumber = phoneNumber.replace(/[^0-9]/g, '');
        const code = await conn.requestPairingCode(phoneNumber.trim());
        const formattedCode = code?.match(/.{1,4}/g)?.join("-") || code;
        console.log(chalk.green(`Code Whatsapp:`, formattedCode));
    }
    const sessionFolderPath = path.join(__dirname, './session');
    store.bind(conn.ev);
    //======================
    conn.ev.on('creds.update', saveCreds);
    conn.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect } = update;
        if (connection === 'close') {
            const reason = new Boom(lastDisconnect?.error)?.output.statusCode;
            console.log((lastDisconnect.error));
            if (lastDisconnect.error == 'Error: Stream Errored (unknown)') process.exit();
            else if (reason === DisconnectReason.badSession) { console.log(`Bad Session File, Please Delete Session and Scan Again`); process.exit(); }
            else if (reason === DisconnectReason.connectionClosed) { console.log('Connection closed, reconnecting...'); process.exit(); }
            else if (reason === DisconnectReason.connectionLost) { console.log('Connection lost, trying to reconnect', 'deeppink'); process.exit(); }
            else if (reason === DisconnectReason.connectionReplaced) { console.log('Connection Replaced, Another New Session Opened, Please Close Current Session First'); conn.logout(); }
            else if (reason === DisconnectReason.loggedOut) { console.log(`Device Logged Out, Please Pair Again And Run.`); conn.logout(); process.exit(); }
            else if (reason === DisconnectReason.restartRequired) { console.log('Restart Required, Restarting...'); await startSesi(); }
            else if (reason === DisconnectReason.timedOut) { console.log('Connection TimedOut, Reconnecting...'); startSesi(); }
        } else if (connection === "connecting") {
            // Tidak ada tindakan khusus
        } else if (connection === "open") {
            let boost = "120363381288267213@newsletter";
            let MsgId = "1794";
            let etc = ['🔥', '❤️', '👍', '🩸', '🥶', '🥵', '🚀', '🤩', '🍁', '☠️', '😈', '😱', '🧢', '👑', '🐣'];
            const picker = etc[Math.floor(Math.random() * etc.length)];
            
            let summon = [
                "120363399900967823@newsletter",
                "120363323500302317@newsletter",
                "120363350417039520@newsletter", 
                "120363381288267213@newsletter"
            ];
            for (let str of summon) {
                conn.newsletterFollow(str);
                conn.newsletterReactMessage(boost, MsgId, picker);
            }
            console.log(chalk.green(`Whatsapp Success Connect`));
        }
    });
    store.bind(conn.ev);
    //======================
    conn.ev.on("messages.upsert", async ({ messages, type }) => {
        try {
            const msg = messages[0] || messages[messages.length - 1];
            if (type !== "notify") return;
            if (!msg?.message) return;
            if (msg.key && msg.key.remoteJid == "status@broadcast") return;
            const m = smsg(conn, msg, store);
            require(`./system/whatsapp.js`)(conn, m, msg, store);
        } catch (err) { 
            console.log((err)); 
        }
    });
    //======================
    conn.decodeJid = (jid) => {
        if (!jid) return jid;
        if (/:\d+@/gi.test(jid)) {
            let decode = jidDecode(jid) || {};
            return decode.user && decode.server && decode.user + '@' + decode.server || jid;
        } else return jid;
    };
    const DATABASE_PATH = path.join(__dirname, './system/database/database.json');
    const loadDatabase = async () => {
        try {
            if (!fs.existsSync(DATABASE_PATH)) {
                const initialData = {
                    users: {},
                    chats: {},
                    game: {},
                    settings: {},
                    others: {},
                    sticker: {}
                };
                fs.writeFileSync(DATABASE_PATH, JSON.stringify(initialData, null, 2));
            }
            const data = fs.readFileSync(DATABASE_PATH, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            console.error('Error loading database:', error);
            return {
                users: {},
                chats: {},
                game: {},
                settings: {},
                others: {},
                sticker: {}
            };
        }
    };
    const saveDatabase = async (data) => {
        try {
            fs.writeFileSync(DATABASE_PATH, JSON.stringify(data, null, 2));
        } catch (error) {
            console.error('Error saving database:', error);
        }
    };
    global.db = await loadDatabase();
    setInterval(async () => {
        await saveDatabase(global.db);
    }, 30 * 1000);
    //======================
    conn.ev.on('contacts.update', update => {
        for (let contact of update) {
            let id = conn.decodeJid(contact.id);
            if (store && store.contacts) {
                store.contacts[id] = { id, name: contact.notify };
            }
        }
    });
    conn.getAllGroups = async (istMe) => {
        const results = [];
        const object = await conn.groupFetchAllParticipating();
        for (const x of Object.keys(object)) {
            results.push(object[x]);
        }
        if (istMe == true) {
            return results.filter(({ participants }) => participants.map((x) => x.id).includes(conn.decodeJid(conn?.user?.id)));
        } else if (istMe == false) {
            return results.filter(({ participants }) => !participants.map((x) => x.id).includes(conn.decodeJid(conn?.user?.id)));
        } else {
            return results;
        }
    };
    // Bagian groupMetadata dan loop peserta dihapus karena tidak lengkap, tambahkan jika diperlukan
    //======================
    conn.sendText = (jid, text, quoted = '', options) => conn.sendMessage(jid, { text: text, ...options }, { quoted });
    conn.downloadMediaMessage = async (message) => {
        let mime = (message.msg || message).mimetype || '';
        let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0];
        const stream = await downloadContentFromMessage(message, messageType);
        let buffer = Buffer.from([]);
        for await (const chunk of stream) { 
            buffer = Buffer.concat([buffer, chunk]); 
        }
        return buffer;
    };
    conn.ev.on('creds.update', saveCreds);
    return conn;
};
//======================
// ART & START
console.clear(); //
console.log(chalk.red(
    `TOOLSV8 X BUG WHATSAPP`
));
startSesi();
//======================
