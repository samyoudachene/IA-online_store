const chatBubble = document.getElementById("chatBubble");
const chatModal = document.getElementById("chatModal");
const closeChat = document.getElementById("closeChat");
const openChatBtn = document.getElementById("openChatBtn");
const sendBtn = document.getElementById("sendBtn");
const chatInput = document.getElementById("chatInput");
const chatMessages = document.getElementById("chatMessages");
const languageSwitcher = document.getElementById("languageSwitcher");

let productsCache = [];
let currentLanguage = localStorage.getItem("lang") || "en";

fetch("./data/products.json")
  .then(res => res.json())
  .then(data => productsCache = data);

function openChat() {
  chatModal.style.display = "flex";
}

function closeChatModal() {
  chatModal.style.display = "none";
}

chatBubble.onclick = openChat;
closeChat.onclick = closeChatModal;
openChatBtn.onclick = openChat;

function addMessage(text, sender = "bot") {
  const div = document.createElement("div");
  div.className = sender === "bot" ? "bot-message" : "user-message";
  div.textContent = text;
  chatMessages.appendChild(div);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function sendMessage() {
  const text = chatInput.value.trim();
  if (!text) return;

  addMessage(text, "user");
  chatInput.value = "";

  setTimeout(() => {
    const reply = aiReply(text, productsCache);
    addMessage(reply, "bot");
  }, 300);
}

sendBtn.onclick = sendMessage;

chatInput.addEventListener("keypress", e => {
  if (e.key === "Enter") sendMessage();
});

const translations = {
  en: {
    home: "Home",
    products: "Products",
    about: "About",
    contact: "Contact",
    heroTitle: "Minimal Fashion,\nSmart Shopping.",
    heroText: "Discover fashion with intelligent shopping assistance.",
    shopNow: "Shop Now"
  },
  fr: {
    home: "Accueil",
    products: "Produits",
    about: "À propos",
    contact: "Contact",
    heroTitle: "Mode Minimaliste,\nShopping Intelligent.",
    heroText: "Découvrez la mode avec assistance intelligente.",
    shopNow: "Acheter"
  },
  ar: {
    home: "الرئيسية",
    products: "المنتجات",
    about: "حول",
    contact: "اتصل",
    heroTitle: "موضة بسيطة،\nتسوق ذكي",
    heroText: "اكتشف الموضة بمساعدة ذكية.",
    shopNow: "تسوق"
  },
  kab: {
    home: "Agejdan",
    products: "Ifarisen",
    about: "Ɣef",
    contact: "Nermes",
    heroTitle: "Anagraw Afessas,\nAseɣzef Uzzig",
    heroText: "Snirem fashion s tallalt tuzzigt.",
    shopNow: "Aɣ"
  }
};

function applyLanguage(lang) {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.dataset.i18n;
    if (translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });
}

languageSwitcher.value = currentLanguage;
applyLanguage(currentLanguage);

languageSwitcher.addEventListener("change", e => {
  currentLanguage = e.target.value;
  localStorage.setItem("lang", currentLanguage);
  applyLanguage(currentLanguage);
});