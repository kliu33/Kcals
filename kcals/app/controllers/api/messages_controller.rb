class Api::MessagesController < ApplicationController
    before_action :require_logged_in
  
    def create
      @message = Message.new(message_params)
    
      if @message.save
        RoomsChannel.broadcast_to @message.channel,
          from_template('api/messages/show', message: @message)
        render :show, locals: { message: @message }
      else
        render json: @message.errors.full_messages, status: 422
      end
    end
  
    def destroy
      @message = Message.find(params[:id])
      RoomsChannel.broadcast_to @message.channel,
        type: 'DESTROY_MESSAGE',
        id: @message.id
    
      @message.destroy
      
      render json: nil, status: :ok
    end
  
    private
  
    def message_params
      params.require(:message).permit(:body, :channel_id, :user_id, :direct_message_channel_id)
    end
  end