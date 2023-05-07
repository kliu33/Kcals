@channels.each do |channel|
    json.channels do
      json.set! channel.id do
        json.partial! 'api/channels/channel', channel: channel
      end
    end
  
    json.users do
      json.set! channel.author.id do
        json.partial! 'api/users/user', user: channel.author
      end
    end
  end