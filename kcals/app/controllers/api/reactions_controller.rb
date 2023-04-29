class Api::ReactionsController < ApplicationController
    def create
        @reaction = Reaction.new(reaction_params)
        if @reaction.save
            if @reaction.message.channel_id 
                RoomsChannel.broadcast_to @reaction.message.channel,
                  type: 'RECEIVE_REACTION',
                  id: @reaction
            elsif
              DmChannel.broadcast_to @reaction.message.direct_message_channel,
              type: 'RECEIVE_REACTION',
                id: @reaction
            end
          render json: { reaction: @reaction }, status: :created
        else
          render json: @reaction.errors, status: :unprocessable_entity
        end
      end

    def destroy
        @reaction = Reaction.find(params[:id])
        if @reaction.message.channel_id 
            RoomsChannel.broadcast_to @reaction.message.channel,
              type: 'REMOVE_REACTION',
              id: @reaction
        elsif
          DmChannel.broadcast_to @reaction.message.direct_message_channel,
          type: 'REMOVE_REACTION',
            id: @reaction
        end
        @reaction.destroy
        render json: nil, status: :ok
    end

    private

    def reaction_params
        params.require(:reaction).permit(:emoji, :message_id, :user_id)
    end
end