class DirectMessageChannel < ApplicationRecord
    validates :user1_id, uniqueness: { scope: :user2_id }
    
    has_many :messages, dependent: :destroy
end 
