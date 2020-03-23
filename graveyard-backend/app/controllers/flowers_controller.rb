class FlowersController < ApplicationController

    def index
        flowers = Flower.all
        render json: flowers
    end

    def show
      flower = Flower.find(params[:id])
      if flower
        render json: flower
      else
        render json: { error: "Not found!" }, status: 404
      end
    end

    def create
        flower = Flower.create(create_flower_params)
        if flower.valid?
          render json: flower
        else
          render json: { errors: flower.errors.full_messages }, status: 403
        end
    end

    def destroy
      flower = Flower.find(params[:id])
      if flower
        flower.destroy
        render json: flower, status: 200
      else
        render json: { error: "Not found!" }, status: 404
      end
    end

    private

    def create_flower_params
      params.permit(:name, :speed, :flowers_needed, :grave_id)
    end
end
