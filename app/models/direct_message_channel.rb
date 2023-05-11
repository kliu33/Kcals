class DirectMessageChannel < ApplicationRecord
    validates :user1_id, presence: true
    validates :user2_id, presence: true, uniqueness: { scope: :user1_id }


    belongs_to :user1, class_name: 'User'
    belongs_to :user2, class_name: 'User'
    
    has_many :messages, dependent: :destroy
end 
