class Reaction < ApplicationRecord
    validates :emoji, presence: true
    validates :user_id, uniqueness: { scope: [:emoji, :message_id] }
    validates :message_id, uniqueness: { scope: [:emoji, :user_id] }

    belongs_to :user, class_name: :User
    belongs_to :message, class_name: :Message

end
