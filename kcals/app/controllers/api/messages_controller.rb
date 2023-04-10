class Api::MessagesController < ApplicationController
    before_action :require_logged_in
  
    def create
      @message = Message.new(message_params)
      if @message.save
        if @message.channel_id
          RoomsChannel.broadcast_to @message.channel,
            type: 'RECEIVE_MESSAGE',
            payload: from_template('api/messages/show', message: @message)
          render :show, locals: { message: @message }
        end
        if @message.direct_message_channel_id
          DmChannel.broadcast_to @message.direct_message_channel,
            type: 'RECEIVE_DM_MESSAGE',
            payload: from_template('api/messages/show', message: @message)
          render :show, locals: { message: @message }
        end
      else
        render json: @message.errors.full_messages, status: 422
      end
    end
  
    def destroy
      @message = Message.find(params[:id])
      if @message.channel_id 
        RoomsChannel.broadcast_to @message.channel,
          type: 'DESTROY_MESSAGE',
          id: @message.id
      elsif
        DmChannel.broadcast_to @message.direct_message_channel,
          type: 'DESTROY_MESSAGE',
          id: @message.id
      end
      @message.destroy
      
      render json: nil, status: :ok
    end
  
    private
  
    def message_params
      params.require(:message).permit(:body, :channel_id, :user_id, :direct_message_channel_id)
    end
  end