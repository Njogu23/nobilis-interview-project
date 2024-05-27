module Api
    module V1
      class DataController < ApplicationController
        # before_action :authenticate_user!

        def index
          service = ExternalApiService.new
          data = service.fetch_data
  
          if data
            render json: data
          else
            render json: { error: 'Failed to fetch data' }, status: :bad_gateway
          end
        end
      end
    end
  end
  