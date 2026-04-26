let session = {
  step: 0,
  intent: null,
  gender: null,
  category: null,
  budget: null
};

function detectIntent(msg) {
  msg = msg.toLowerCase();

  if (msg.includes("shoe") || msg.includes("chaussure") || msg.includes("sneaker"))
    return "shoes";

  if (msg.includes("shirt") || msg.includes("t-shirt"))
    return "tshirt";

  if (msg.includes("dress") || msg.includes("robe"))
    return "dress";

  if (msg.includes("jean"))
    return "jeans";

  if (msg.includes("tracksuit") || msg.includes("sport"))
    return "sportswear";

  return null;
}

// MAIN AI FUNCTION
function aiReply(userMsg, products) {

  const intent = detectIntent(userMsg);

  // STEP 1: detect intent
  if (!session.intent && intent) {
    session.intent = intent;
    session.step = 1;

    return "For who? Men, Women, Kids or Sportswear?";
  }

  // STEP 2: gender
  if (session.step === 1) {
    if (userMsg.includes("men")) session.gender = "men";
    else if (userMsg.includes("women")) session.gender = "women";
    else if (userMsg.includes("kids")) session.gender = "kids";
    else if (userMsg.includes("sport")) session.gender = "sportswear";

    session.step = 2;
    return "What is your budget? (example: 2000, 5000, 10000)";
  }

  // STEP 3: budget
  if (session.step === 2) {
    let price = parseInt(userMsg);
    session.budget = price || 999999;

    session.step = 3;

    const results = products.filter(p =>
      (!session.gender || p.gender === session.gender) &&
      (!session.intent || p.category === session.intent) &&
      p.price <= session.budget
    );

    if (results.length === 0) {
      resetSession();
      return "No products found. Try another budget or category.";
    }

    let text = "I found these products:\n\n";

    results.forEach(p => {
      text += `• ${p.name.en} - ${p.price} DZD (Stock: ${p.stock})\n`;
    });

    resetSession();
    return text;
  }

  return "Tell me: shoes, dress, jeans, or sportswear?";
}

function resetSession() {
  session = {
    step: 0,
    intent: null,
    gender: null,
    category: null,
    budget: null
  };
}