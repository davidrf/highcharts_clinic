class LaunchVotesController < ApplicationController
  def index
    @launch_votes = LaunchVote.all
    respond_to do |format|
      format.html
      format.json { render json: @launch_votes }
    end
  end
end
