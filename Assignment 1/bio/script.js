(function () {
  let chat = {
    messageToSend: "",
    initMessageToDisplay: [
      {
        id: 1,
        content:
          "Hello, Mr. Duszak. I sincerely appreciate you taking the time to read my biography, a little bit about me personally, I am an international student from China, currently pursuing Computer Science for my masters program. I am on my last full year graduating in Fall of this year.",
      },
      {
        id: 2,
        content:
          "You can play around with the different questions on the chat and see the response, the question mark icon on the top right corner may give some hints.",
      },
    ],
    messageResponses: [
      {
        id: 1,
        message: "hi",
        content: "Nice to meet you! How was your days?",
      },
      {
        id: 2,
        message: "studying",
        content:
          "As I menthioned above I am Computer Science major student, prior, I got my undergrad in Math and Chemistry at the University of Utah.",
      },
      {
        id: 3,
        message: "goal",
        content:
          "My Career Aspiration is to be a software developer in helping with systems design while playing a role on the analytics side as well.",
      },
      {
        id: 4,
        message: "work",
        content:
          "I am working at Wangjiang Tech Company for Irrigation Automation System, type 'more' to see more.",
      },
      {
        id: 5,
        message: "more",
        content:
          "Recently, we have just completed the first phase of work, by using drones to collect riverbed information and build a 2D/3D integrated GIS platform, the next step is to connect each regional dam to our platform so staffs are able to control it remotely. We also focus on collecting data like using cameras for river flow speed and radars for water level, etc, once we collect enough data we will use machine learning to build our model.",
      },
      {
        id: 6,
        message: "spare",
        content:
          "One of the reason I stay in salt lake city is hiking, there are many national parks espcially some changllenging mountain trails around this place, you can even visit a hot spring during hiking.",
      },
      {
        id: 7,
        message: "family",
        content:
          "I am a only child born in a traditional chinese family, so I love asian foods and enjoy exotic cultures in U.S..",
      },
      {
        id: 8,
        message: "music",
        content:
          "I do not have specific favorite type of music, but mainly I prefer peaceful songs like country music.",
      },
      {
        id: 9,
        message: "food",
        content:
          "I have been to many countries and tried different flavors, and I have to say that any kind of food has a unique way of cooking in different regions as well as the way of eating it. If I have to choose a meal before I die, I highly recommend squid ink spaghetti!",
      },
      {
        id: 10,
        message: "live",
        content:
          "I live in Salt Lake City, this is great place to skiing, snowboarding, and hiking.",
      },
      {
        id: 11,
        message: "bye",
        content:
          "I hope you enjoyed the conversation between us, and wish you all the best!",
      },
    ],
    init: function () {
      this.cacheDOM();
      this.bindEvents();
      this.render();
      this.initMessage();
      this.initHint();
    },
    cacheDOM: function () {
      this.$chatHistory = $(".chat-history");
      this.$tooltip = $(".tooltip-mine");
      this.$inputButton = $("#input-button");
      this.$input = $("#message-to-send");
      this.$chatHistoryList = this.$chatHistory.find("ul");
      this.$hint = this.$tooltip.find("ul");
    },
    bindEvents: function () {
      this.$inputButton.on("click", this.addMessage.bind(this));
      this.$input.on("keyup", this.addMessageEnter.bind(this));
    },
    render: function () {
      this.scrollToBottom();
      if (this.messageToSend.trim() !== "") {
        let template = Handlebars.compile($("#message-template").html());
        let context = {
          messageOutput: this.messageToSend,
          time: this.getCurrentTime(),
        };

        this.$chatHistoryList.append(template(context));
        this.scrollToBottom();
        this.$input.val("");

        // responses
        const responseMessage = this.getResponse(
          this.messageToSend,
          this.messageResponses
        );
        let templateResponse = Handlebars.compile(
          $("#message-response-template").html()
        );
        let contextResponse = {
          response: responseMessage,
          time: this.getCurrentTime(),
        };
        // loading
        this.$chatHistoryList.append(
          Handlebars.compile($("#message-loading-template").html())
        );
        this.scrollToBottom();

        setTimeout(
          function () {
            $("#loading-li").remove();
            this.$chatHistoryList.append(templateResponse(contextResponse));
            this.scrollToBottom();
          }.bind(this),
          responseMessage.length * 10 > 1500
            ? 1500
            : responseMessage.length * 10
        );
      }
    },
    addMessage: function () {
      this.messageToSend = this.$input.val();
      this.render();
    },
    addMessageEnter: function (event) {
      // enter was pressed
      if (event.keyCode === 13) {
        this.addMessage();
      }
    },
    scrollToBottom: function () {
      this.$chatHistory.scrollTop(this.$chatHistory[0].scrollHeight);
    },
    getCurrentTime: function () {
      return new Date()
        .toLocaleTimeString()
        .replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3");
    },
    // findDetailsData = DetailsData.find(item => item.id === Number(res.get('id')));
    getResponse: function (message, arr) {
      const res = arr.find((item) => message.toLowerCase().match(item.message));
      // console.log(res);
      return res == null
        ? "I am sorry, please ask me another question."
        : res["content"];
    },
    initMessage: function () {
      const total = this.initMessageToDisplay.length;
      let i = this.initMessageToDisplay.length;
      while (i > 0) {
        let templateResponse = Handlebars.compile(
          $("#message-response-template").html()
        );
        let contextResponse = {
          response: this.initMessageToDisplay[total - i--]["content"],
          time: this.getCurrentTime(),
        };
        this.$chatHistoryList.append(templateResponse(contextResponse));
        this.scrollToBottom();
      }
    },
    initHint: function () {
      let templateResponse = Handlebars.compile($("#hint-template").html());
      for (const index in this.messageResponses) {
        const content = templateResponse({
          hint: this.messageResponses[index]["message"],
        });
        this.$hint.append(content);
      }
    },
  };

  chat.init();
})();
