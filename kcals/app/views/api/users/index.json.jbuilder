@users.each do |user|
    json.users do
      json.set! user.id do
        user.partial! 'api/users/user', user: user
      end
    end
  end