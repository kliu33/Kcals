json.user do
    json.extract! @user, :id, :email, :first_name, :last_name, :direct_message_channels, :created_at, :updated_at
end