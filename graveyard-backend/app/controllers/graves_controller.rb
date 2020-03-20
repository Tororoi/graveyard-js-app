class GravesController < ApplicationController

    def index
        graves = Grave.all
        render json: graves
    end

    def show
      grave = Grave.find(params[:id])
      if grave
        render json: grave
      else
        render json: { error: "Not found!" }, status: 404
      end
    end

    def create
        grave = Grave.create(create_grave_params)
        if grave.valid?
          render json: grave
        else
          render json: { errors: grave.errors.full_messages }, status: 403
        end
    end

    def destroy
      grave = Grave.find(params[:id])
      if grave
        grave.destroy
        render json: grave, status: 200
      else
        render json: { error: "Not found!" }, status: 404
      end
    end

    private

    def create_grave_params
      params.permit(:name, :epitaph, :lifespan)
    end
end
