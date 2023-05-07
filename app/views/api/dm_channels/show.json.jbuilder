json.dm_channel do
    json.partial! 'api/dm_channels/dm_channel', dm_channel: @dm_channel
  end
  
  @dm_channel.messages.each do |message|
    json.messages do
      json.set! message.id do
        json.partial! 'api/messages/message', message: message
      end
    end
  end
  