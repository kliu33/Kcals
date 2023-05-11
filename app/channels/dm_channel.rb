class DmChannel < ApplicationCable::Channel
    def subscribed
      @dm_channel = DirectMessageChannel.find_by(id: params[:id])
      stream_for @dm_channel
    end
end