require 'json'
module Api
  module V1
    class GameController < ApplicationController

    def index
      begin
        render json: helpers::initialize_board
      rescue
        render json:{message: 'something went wrong while initializing the board' }, status: :internal_server_error
      end
    end

    def new
      render json:helpers::initialize_game
    end

    skip_before_action :verify_authenticity_token
    def create
      @request = JSON.parse(request.raw_post)
      @result = helpers::submit_word(@request['board'],@request['word'])

      if @result[:status] == 'SUCCESS'
        render json: {
            word:@request['word'],
            score:@request['word'].length
        }
      else
        render json:{message: @result[:message] }, status: :bad_request
      end
    end


  end
  end
end
