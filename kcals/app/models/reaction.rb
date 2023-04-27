class Reaction < ApplicationRecord
    validates :emoji, presence: true

    belongs_to :user, class_name: :User
    belongs_to :message, class_name: :Message

end
