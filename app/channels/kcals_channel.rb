class KcalsChannel < ApplicationCable::Channel
    def subscribed
      stream_from "home_page"
    end
  end