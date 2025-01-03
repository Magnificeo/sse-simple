function runOn(selector, callback) {
  const elem = document.querySelector(selector);

  if (elem !== null) {
    callback(elem);
  }
}

runOn('.runner-page-chat', function (root) {
  const chatBox = document.querySelector('.chat');

  let lastReceivedId = null;

  const stream = new EventSource('/chat/stream');

  stream.addEventListener('init', (e) => {
    console.log(e.data);
    const messages = JSON.parse(e.data).messages;
    messages.forEach((msg) => {
      return appendMessage(msg);
    });
  });

  stream.addEventListener('messageCreated', (e) => {
    let currentReceivedId = parseInt(e.lastEventId);
    console.log(e.data);

    if (
      lastReceivedId === null ||
      currentReceivedId === lastReceivedId + 1
    ) {
      lastReceivedId = currentReceivedId;
    } else {
      alert(
        'We show nice message, you should update page, because some messages lost',
      );
      // or - close this event source instance, remove chatbox inner html, & start new eventsource
    }

    prependMessage(JSON.parse(e.data));
  });

  function appendMessage(message) {
    let p = document.createElement('p');
    p.innerHTML = JSON.stringify(message);
    chatBox.appendChild(p);
  }

  function prependMessage(message) {
    let p = document.createElement('p');
    p.innerHTML = JSON.stringify(message);
    chatBox.prepend(p);
  }

  const form = document.querySelector('.chat-message-form');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    let formData = new FormData(form);

    try {
      let response = await fetch(`/chat`, {
        method: 'POST',
        body: JSON.stringify(Object.fromEntries(formData.entries())),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      let data = await response.json();

      if (response.status == 422) {
        alert(data);
      } else {
        form.querySelector('[name=text]').value = '';
      }
    } catch (e) {
      console.dir(e);
      // look status^ 422, 500
    }
  });
});

/* runOn('.runner-page-support', function (root) {
  const chatBox = document.querySelector('.support');
  const stream = new EventSource('/support/stream');
  let lastRecivedId = null;

  stream.addEventListener('append', (e) => {
    let currentReciedId = parseInt(e.lastEventId);

    if (
      lastRecivedId === null ||
      currentReciedId === lastRecivedId + 1
    ) {
      lastRecivedId = currentReciedId;
    } else {
      console.log('ok, wrong');
    }

    applyMessage(JSON.parse(e.data));
  });

  function applyMessage(message) {
    let p = document.createElement('p');
    p.innerHTML = JSON.stringify(message);
    chatBox.appendChild(p);
  }

  const form = document.querySelector('.support-message-form');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    let formData = new FormData(form);

    try {
      let response = await fetch(`/support`, {
        method: 'POST',
        body: JSON.stringify(Object.fromEntries(formData.entries())),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      let data = await response.json();

      if (response.status == 422) {
        alert(data);
      } else {
        form.querySelector('[name=text]').value = '';
      }
    } catch (e) {
      console.dir(e);
      // look status^ 422, 500
    }
  });
});
 */
