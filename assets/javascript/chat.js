$(function () {
  let socket = io();
  let name = '';
  let nameInput = $('#name-input');
  let chatInput = $('#chat-input');

  // pseudo
  nameInput.keydown(function(event) {
      if (event.which == 13) {
          event.preventDefault();

          // pas vide
          if (nameInput.val() !== '') {
              name = nameInput.val();
              nameInput.val('');
              $('.enter-name').hide();
              socket.emit('new:member', name);
          }
      }
  });

  // Choix du pseudo quand tu fais entrer
  $('.submit-name').on('click', function(event) {
      event.preventDefault();

      // pseudo pas vide
      if (nameInput.val() !== '') {
          name = nameInput.val();
          nameInput.val('');
          $('.enter-name').hide();
          socket.emit('new:member', name);
      }
  });


  // Si pseudo on peux écrire dans le tchat
  chatInput.keydown(function(event) {
      if (event.which == 13) {
          event.preventDefault();
          if (chatInput.val() !== '' && name !== '') {
              socket.emit('new:message', {name: name, msg: chatInput.val()});
              chatInput.val('');
          }
      }
  });

  //Envoi du message
  $('.submit-chat-message').on('click', function(event) {
      event.preventDefault();

      // message pas vide
      if (chatInput.val() !== '' && name !== '') {
          socket.emit('new:message', {name: name, msg: chatInput.val()});
          chatInput.val('');
      }
  });

  // Les nouveaux messages
  socket.on('new:message', function(msgObject){
      $('#messages').append($('<div class="msg new-chat-message">').html('<span class="member-name">' + msgObject.name + '</span>: ' + msgObject.msg));
      $('.chat-window').scrollTop($('#messages').height());
  });

});