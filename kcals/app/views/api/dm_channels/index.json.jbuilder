@dm_channels.each do |dm_channel|
    json.dm_channels do
      json.set! dm_channel.id do
        json.partial! 'api/dm_channels/dm_channel', dm_channel: dm_channel
      end
    end
  end