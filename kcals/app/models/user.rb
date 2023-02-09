class User < ApplicationRecord
    has_secure_password
    validates :first_name, :last_name, presence: true
    validates :email, length: {in: 3..255 }, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }
    validates :session_token, presence: true, uniqueness: true
    validates :password, length: { in: 6..255 }, allow_nil: true
  
    before_validation :ensure_session_token
  
    def generate_unique_session_token
      while true 
        token = SecureRandom.urlsafe_base64
        return token unless User.exists?(session_token: token)
      end
    end 
  
    def ensure_session_token
      self.session_token ||= generate_unique_session_token
    end
  
    def reset_session_token!
        self.session_token = generate_unique_session_token
        self.save!
        self.session_token
    end
  
    def self.find_by_credentials(credential, password)
      user = User.find_by(email: credential)
      if user&.authenticate(password)
        return user
      else 
        nil
      end
    end
end