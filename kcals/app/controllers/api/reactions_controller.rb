class Api::ReactionsController < ApplicationController
    def create
        @reaction = Reaction.new(reaction_params)
        if @reaction.save
            render :show, locals: { reaction: @reaction }
        else 
            render json: @channel.errors.full_messages, status: 422
        end
    end

    def destroy
        @reaction = Reaction.find(params[:id])
        @reaction.destroy
        render json: nil, status: :ok
    end

    private

    def reaction_params
        params.require(:reaction).permit(:emoji, :message_id, :user_id)
    end
end