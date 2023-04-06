json.user do
  json.extract! @user, :id, :email, :first_name, :last_name, :created_at, :updated_at

  json.direct_message_channels @user.direct_message_channels do |channel|
    json.id channel.id
    json.set! :user1 do
        json.extract! channel.user1, :id, :email, :first_name, :last_name
        end

    json.set! :user2 do
        json.extract! channel.user2, :id, :email, :first_name, :last_name
    end

    json.messages channel.messages do |message|
      json.id message.id
      json.user json.extract! message.user, :id, :email, :first_name, :last_name
      json.content message.body
      json.created_at message.created_at
    end
  end
end