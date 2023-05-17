json.extract! dm_channel, :id, :user1_id, :user2_id, :created_at, :updated_at
json.messages dm_channel.messages do |message|
  json.extract! message, :id, :user_id, :body, :reactions, :editted, :direct_message_channel_id, :created_at, :updated_at
end