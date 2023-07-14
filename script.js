//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
//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
let open_response;

let chat = [
  { role: "user", content: "Hi" },
  { role: "assistant", content: "Hi, how can i help you today" },
];
async function chatuseradd(feeling, question) {
  chat.push({
    role: "user",
    content:
      "my happiness from 0-10 is " + feeling + ".my input is:" + question,
  });
}

async function chatAssistantadd(res) {
  chat.push({ role: "assistant", content: res });
}

async function openAI_test() {
  let url = "https://api.openai.com/v1/chat/completions";
  let part1 = "sk";
  let part2 = "-5bpxzQt9pRMB76Vl0GXRT3B";
  let part3 = "lbkFJJcrNpEhBx1KMnMPG7tjH";

  let allParts = part1 + part2 + part3;

  let data = {
    model: "gpt-3.5-turbo",
    messages: chat,
  };
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${allParts}`,
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      const responseData = await response.json();
      const message = responseData.choices[0].message.content;

      chatAssistantadd(message);
      const speech = new SpeechSynthesisUtterance(message);
      speechSynthesis.speak(speech);
      return message;
    }
  } catch (error) {
    console.log("opps an error:" + error);
  }
}
