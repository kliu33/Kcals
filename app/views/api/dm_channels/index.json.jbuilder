json.array! @dm_channels do |dm_channel|
  json.set! dm_channel.id do
    json.partial! 'api/dm_channels/dm_channel', dm_channel: dm_channel
  end
end