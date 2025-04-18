console.log("Body:", JSON.stringify(req.body, null, 2));
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.post('/webhook', (req, res) => {
  const intent = req.body.queryResult.intent.displayName;

  if (intent === 'show_flex_room') {
    const flexMessage = {
      "type": "flex",
      "altText": "รายละเอียดโครงการศุภาลัย ไอคอน สาทร",
      "contents": {
        "type": "bubble",
        "hero": {
          "type": "image",
          "url": "https://storage.googleapis.com/chatgpt-temp-files-public/location2.jpg",
          "size": "full",
          "aspectRatio": "20:13",
          "aspectMode": "cover"
        },
        "body": {
          "type": "box",
          "layout": "vertical",
          "spacing": "md",
          "contents": [
            {
              "type": "text",
              "text": "ศุภาลัย ไอคอน สาทร",
              "weight": "bold",
              "size": "xl",
              "wrap": true
            },
            {
              "type": "text",
              "text": "คอนโดหรู ใจกลางสาทร เริ่ม 8.9 ล้านบาท",
              "size": "sm",
              "color": "#666666",
              "wrap": true
            }
          ]
        },
        "footer": {
          "type": "box",
          "layout": "vertical",
          "spacing": "sm",
          "contents": [
            {
              "type": "button",
              "style": "link",
              "height": "sm",
              "action": {
                "type": "uri",
                "label": "📍 ดูแผนที่",
                "uri": "https://maps.google.com?q=สาทร+ไอคอน+ศุภาลัย"
              }
            },
            {
              "type": "button",
              "style": "primary",
              "color": "#00B900",
              "action": {
                "type": "uri",
                "label": "💬 แอดไลน์",
                "uri": "https://line.me/ti/p/~@114svzdg"
              }
            }
          ]
        }
      }
    };

    return res.json({
      fulfillmentMessages: [
        {
          platform: 'LINE',
          payload: {
            line: flexMessage
          }
        }
      ]
    });
  }

  res.json({ fulfillmentText: 'ยินดีให้ข้อมูลค่ะ' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Webhook server listening on port ${PORT}`);
});
