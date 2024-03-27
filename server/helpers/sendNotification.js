const sendNotification = async (token, title, body) => {
  const message = {
    to: token,
    notification: {
      title,
      body,
    },
  };

  const response = await fetch("https://fcm.googleapis.com/fcm/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: process.env.FCM_KEY,
    },
    body: JSON.stringify(message),
  });

  const data = await response.json();
  console.log(data);
};

module.exports = sendNotification;
