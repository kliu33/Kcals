json.channel do
    json.partial! 'api/channels/channel', channel: @channel
  end
  
  @channel.messages.each do |message|
    json.messages do
      json.set! message.id do
        json.partial! 'api/messages/message', message: message
      end
    end
  
    json.users do
      json.set! message.user.id do
        json.partial! 'api/users/user', user: message.user
      end
    end
  end
  