class DirectMessageChannel < ApplicationRecord
    validates :user1_id, uniqueness: { scope: :user2_id }

    belongs_to :user1, class_name: 'User'
    belongs_to :user2, class_name: 'User'
    
    has_many :messages, dependent: :destroy
end 
