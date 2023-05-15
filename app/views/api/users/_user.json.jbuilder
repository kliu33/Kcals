json.extract! user, :id, :email, :photo, :status, :first_name, :last_name
json.photoUrl user.photo.attached? ? user.photo.url : nil