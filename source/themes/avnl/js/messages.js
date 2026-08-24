/**
 * @file
 * Customization of messages.
 */

((Drupal, once) => {
  //added for reset password issue 17082026
  Drupal.avnl = Drupal.avnl || {};

  /**
   * Adds a close button to the message.
   *
   * @param {object} message
   *   The message object.
   */
  const closeMessage = (message) => {
    const messageContainer = message.querySelector(
      '[data-drupal-selector="messages-container"]',
    );

    const closeBtnWrapper = document.createElement('div');
    closeBtnWrapper.setAttribute('class', 'messages__button');

    const closeBtn = document.createElement('button');
    closeBtn.setAttribute('type', 'button');
    closeBtn.setAttribute('class', 'messages__close');

    const closeBtnText = document.createElement('span');
    closeBtnText.setAttribute('class', 'visually-hidden');
    closeBtnText.innerText = Drupal.t('Close message');

    messageContainer.appendChild(closeBtnWrapper);
    closeBtnWrapper.appendChild(closeBtn);
    closeBtn.appendChild(closeBtnText);

    closeBtn.addEventListener('click', () => {
      message.classList.add('hidden');
    });
  };
  // added for reset password issue 17082026
  Drupal.avnl.closeMessage = closeMessage;

  /**
   * Get messages from context.
   *
   * @type {Drupal~behavior}
   *
   * @prop {Drupal~behaviorAttach} attach
   *   Attaches the close button behavior for messages.
   */
  Drupal.behaviors.messages = {
    attach(context) {
      once('messages', '[data-drupal-selector="messages"]', context).forEach(
        closeMessage,
      );
    },
  };

 // Drupal.closeMessage = closeMessage;
})(Drupal, once);
