json.user do
  json.extract! @user, :id, :email, :first_name, :last_name, :dark_mode, :created_at, :updated_at

  json.set! :direct_message_channels do
    @user.direct_message_channels.each do |channel|
      json.set! channel.id do
        json.id channel.id
        json.set! :user1 do
          json.extract! channel.user1, :id, :email, :first_name, :last_name
        end
        json.set! :user2 do
          json.extract! channel.user2, :id, :email, :first_name, :last_name
        end
        json.messages channel.messages do |message|
          json.id message.id
          json.userId message.user.id
          json.reactions message.reactions
          json.body message.body
          json.created_at message.created_at
        end
      end
    end
  end
end