class Message < ApplicationRecord
    validates :body, presence: true
  
    belongs_to :user, class_name: :User
    belongs_to :channel
  end