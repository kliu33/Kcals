class Message < ApplicationRecord
    before_validation :ensure_channel_or_direct_message_channel_present
    
    validates :body, presence: true
  
    belongs_to :user, class_name: :User
    belongs_to :channel, optional: true
    belongs_to :direct_message_channel, optional: true


    private

    def ensure_channel_or_direct_message_channel_present
      unless channel_id || direct_message_channel_id
        errors.add(:base, 'must belong to either a channel or a direct message channel')
      end
    end
  end