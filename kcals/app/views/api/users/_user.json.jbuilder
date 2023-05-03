json.extract! user, :id, :email, :photo, :first_name, :last_name
json.photoUrl user.photo.attached? ? user.photo.url : nil